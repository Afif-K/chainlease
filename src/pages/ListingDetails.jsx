import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { ABI } from "../blockchain/contract";

function ListingDetails({ listings }) {
  const { id } = useParams();

  const userRole =
    localStorage.getItem("userRole") || "";

  const listing = listings.find(
    (item) => item.id.toString() === id
  );

  if (!listing) {
    return (
      <div className="text-center text-red-500 text-lg">
        Listing not found
      </div>
    );
  }

  async function handleSignLease() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        listing.contractAddress,
        ABI,
        signer
      );

      const tx = await contract.signLease();
      await tx.wait();

      const savedListings = JSON.parse(
        localStorage.getItem("listings") || "[]"
      );

      const updatedListings = savedListings.map((item) =>
        item.id === listing.id
          ? { ...item, leaseStatus: "Signed" }
          : item
      );

      localStorage.setItem(
        "listings",
        JSON.stringify(updatedListings)
      );

      alert("Lease Signed Successfully!");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Failed to sign lease");
    }
  }

  async function handlePayRent() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        listing.contractAddress,
        ABI,
        signer
      );

      const rentAmount = await contract.rentAmount();

      const tx = await contract.payRent({
        value: rentAmount,
      });

      await tx.wait();

      const savedListings = JSON.parse(
        localStorage.getItem("listings") || "[]"
      );

      const updatedListings = savedListings.map((item) =>
        item.id === listing.id
          ? { ...item, paymentStatus: "Paid" }
          : item
      );

      localStorage.setItem(
        "listings",
        JSON.stringify(updatedListings)
      );

      const oldPayments = JSON.parse(
        localStorage.getItem("paymentHistory") || "[]"
      );

      const newPayment = {
        property: listing.title,
        amount: `${listing.rent} BNB`,
        date: new Date().toLocaleString(),
        txHash: tx.hash,
        status: "Success"
      };

      oldPayments.push(newPayment);

      localStorage.setItem(
        "paymentHistory",
        JSON.stringify(oldPayments)
      );

      alert("Rent Paid Successfully!");
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  }

  function openLeaseDocument() {
    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${listing.ipfsHash}`;
    window.open(ipfsURL, "_blank");
  }

  return (
    <div className="bg-[#fffdf9] p-12 rounded-[40px] shadow-xl border border-[#eadbc8] max-w-5xl mx-auto">

      <h2
        className="mb-8"
        style={{
          fontFamily: "Playfair, serif",
          fontSize: "58px",
          fontWeight: "700",
          color: "#2d1f16",
          letterSpacing: "0.5px"
        }}
      >
        {listing.title}
      </h2>

      <p
        className="mb-8"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "34px",
          fontWeight: "600",
          color: "#8B5E3C",
          lineHeight: "1.4"
        }}
      >
        Rent: {listing.rent} BNB / month
      </p>

      <p
        className="mb-10"
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: "24px",
          color: "#5f5f5f",
          lineHeight: "1.8"
        }}
      >
        {listing.description}
      </p>

      <div className="space-y-5 mb-10">

        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "28px",
            color: "#2d1f16"
          }}
        >
          <strong>Lease Status:</strong>{" "}
          <span className="font-medium text-[#6b4f3a]">
            {listing.leaseStatus === "Signed"
              ? "Signed "
              : "Unsigned "}
          </span>
        </p>

        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "28px",
            color: "#2d1f16"
          }}
        >
          <strong>Payment Status:</strong>{" "}
          <span className="font-medium text-[#6b4f3a]">
            {listing.paymentStatus === "Paid"
              ? "Paid "
              : "Pending "}
          </span>
        </p>

      </div>

      <div className="space-y-4 mb-12">

        <p
          className="break-all"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "18px",
            color: "#7a7a7a"
          }}
        >
          <strong>Contract Address:</strong>{" "}
          {listing.contractAddress}
        </p>

        <p
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "18px",
            color: "#7a7a7a"
          }}
        >
          <strong>Created:</strong>{" "}
          {listing.createdAt}
        </p>

      </div>

      <div className="flex flex-wrap gap-6">

        <button
          onClick={openLeaseDocument}
          className="bg-[#4b2e1f] hover:bg-[#2d1f16] text-white px-10 py-5 rounded-2xl text-xl font-medium transition cursor-pointer shadow-md"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        >
          View Lease Agreement
        </button>

        {userRole === "tenant" && (
          <>
            <button
              onClick={handleSignLease}
              className="bg-[#8B5E3C] hover:bg-[#6f472b] text-white px-10 py-5 rounded-2xl text-xl font-medium transition cursor-pointer shadow-md"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Sign Lease
            </button>

            <button
              onClick={handlePayRent}
              className="bg-[#d9b382] hover:bg-[#c89a63] text-[#2d1f16] px-10 py-5 rounded-2xl text-xl font-semibold transition cursor-pointer shadow-md"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Pay Rent
            </button>
          </>
        )}

      </div>

    </div>
  );
}

export default ListingDetails;