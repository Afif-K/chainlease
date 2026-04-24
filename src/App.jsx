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

// Blockchain
import {
  connectWallet,
  signLease,
  payRent
} from "./blockchain/contract";

function App() {
  const location = useLocation();

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

  // Connect Wallet
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

  // Sign Lease
  async function handleSign() {
    try {
      if (!contract) return alert("Connect wallet first");

      setLoading(true);

      await signLease(contract.target);

      setIsSigned(true);
      alert("Lease Signed!");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Pay Rent + Save Payment History
  async function handlePay() {
    try {
      if (!contract) return alert("Connect wallet first");

      setLoading(true);

      await payRent(contract.target);

      // Save payment history
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

      // Optional: update listing payment status
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

      {/* Premium Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-6 pb-10">

        {/* Show ContractActions only on Home Page */}
        {location.pathname === "/" && (
          <ContractActions
            account={account}
            connectWallet={handleConnect}
            rent={rent}
            isSigned={isSigned}
            signLease={handleSign}
            payRent={handlePay}
            loading={loading}
          />
        )}

        {/* Routes */}
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Listings */}
          <Route
            path="/listings"
            element={<Listings listings={listings} />}
          />

          {/* Create Listing */}
          <Route
            path="/create"
            element={
              <CreateListing
                addListing={addListing}
              />
            }
          />

          {/* Listing Details */}
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

          {/* My Leases */}
          <Route
            path="/my-leases"
            element={<MyLeases />}
          />

          {/* Pay Rent */}
          <Route
            path="/pay"
            element={<PayRent />}
          />

          {/* Payment History */}
          <Route
            path="/payment-history"
            element={<PaymentHistory />}
          />

          {/* Dashboard */}
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