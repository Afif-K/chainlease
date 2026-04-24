import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import { ABI } from "../blockchain/contract";

function ListingDetails({ listings }) {
  const { id } = useParams();

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

      // ✅ Update lease status in localStorage
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

      // ✅ Update payment status in localStorage
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

      alert("Rent Paid Successfully!");

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
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        {listing.title}
      </h2>

      <p className="text-lg mb-2">
        <strong>Rent:</strong> {listing.rent} BNB
      </p>

      <p className="text-gray-600 mb-4">
        {listing.description}
      </p>

      <p className="mb-2">
        <strong>Lease Status:</strong>{" "}
        {listing.leaseStatus === "Signed"
          ? "Signed ✅"
          : "Unsigned ❌"}
      </p>

      <p className="mb-4">
        <strong>Payment Status:</strong>{" "}
        {listing.paymentStatus === "Paid"
          ? "Paid ✅"
          : "Pending ⏳"}
      </p>

      <p className="text-sm text-gray-500 break-all mb-4">
        <strong>Contract Address:</strong> {listing.contractAddress}
      </p>

      <p className="text-sm text-gray-500 mb-6">
        <strong>Created:</strong> {listing.createdAt}
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={openLeaseDocument}
          className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
        >
          View Lease Agreement
        </button>

        <button
          onClick={handleSignLease}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Sign Lease
        </button>

        <button
          onClick={handlePayRent}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
        >
          Pay Rent
        </button>
      </div>
    </div>
  );
}

export default ListingDetails;