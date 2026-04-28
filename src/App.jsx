import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import ListingDetails from "./pages/ListingDetails";
import MyLeases from "./pages/MyLeases";
import PayRent from "./pages/PayRent";
import LandlordDashboard from "./pages/LandlordDashboard";
import PaymentHistory from "./pages/PaymentHistory";

import ContractActions from "./components/ContractActions";
import RoleSelector from "./components/RoleSelector";

// Blockchain
import {
  connectWallet,
  signLease,
  payRent
} from "./blockchain/contract";

function App() {
  const location = useLocation();

  const userRole =
    localStorage.getItem("userRole") || "";

  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [rent, setRent] = useState("");

  const [listings, setListings] = useState(() => {
    const savedListings = localStorage.getItem("listings");
    return savedListings ? JSON.parse(savedListings) : [];
  });

  function addListing(newListing) {
    setListings([...listings, newListing]);
  }

  useEffect(() => {
    localStorage.setItem("listings", JSON.stringify(listings));
  }, [listings]);

  async function handleConnect() {
    try {
      const data = await connectWallet();

      setAccount(data.address);
      setContract(data.contract);
      setIsSigned(data.isSigned);
      setRent(data.rent);

    } catch (err) {
      alert(err.message);
    }
  }

  function handleDisconnect() {
    setAccount("");
    setContract(null);
    setIsSigned(false);
    setRent("");
  }

  async function handleSign() {
    try {
      if (!contract) return alert("Connect wallet first");

      setLoading(true);

      await signLease(await contract.getAddress());

      setIsSigned(true);
      alert("Lease Signed!");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePay() {
    try {
      if (!contract) return alert("Connect wallet first");

      setLoading(true);

      await payRent(await contract.getAddress());

      const oldPayments = JSON.parse(
        localStorage.getItem("paymentHistory") || "[]"
      );

      const newPayment = {
        property: "Luxury Apartment",
        amount: `${rent} BNB`,
        date: new Date().toLocaleDateString(),
        txHash: "TX-" + Date.now(),
        status: "Success"
      };

      localStorage.setItem(
        "paymentHistory",
        JSON.stringify([...oldPayments, newPayment])
      );

      const updatedListings = listings.map((listing) => ({
        ...listing,
        paymentStatus: "Paid"
      }));

      setListings(updatedListings);

      localStorage.setItem(
        "listings",
        JSON.stringify(updatedListings)
      );

      alert("Rent Paid Successfully!");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-6 pb-10">

        {location.pathname === "/" && (
          <RoleSelector />
        )}

        {location.pathname === "/" && (
          <ContractActions
            account={account}
            connectWallet={handleConnect}
            disconnectWallet={handleDisconnect}
            rent={rent}
            isSigned={isSigned}
            signLease={handleSign}
            payRent={handlePay}
            loading={loading}
          />
        )}

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/listings"
            element={<Listings listings={listings} />}
          />

          <Route
            path="/create"
            element={
              userRole === "landlord"
                ? (
                  <CreateListing
                    addListing={addListing}
                  />
                )
                : (
                  <Home />
                )
            }
          />

          <Route
            path="/listing/:id"
            element={
              <ListingDetails
                listings={listings}
                signLease={handleSign}
                payRent={handlePay}
                isSigned={isSigned}
                loading={loading}
              />
            }
          />

          <Route
            path="/my-leases"
            element={<MyLeases />}
          />

          <Route
            path="/pay"
            element={
              userRole === "tenant"
                ? <PayRent />
                : <Home />
            }
          />

          <Route
            path="/payment-history"
            element={<PaymentHistory />}
          />

          <Route
            path="/landlord"
            element={<LandlordDashboard />}
          />

        </Routes>

      </div>
    </div>
  );
}

export default App;