import { ethers } from "ethers";
import { ABI } from "../blockchain/contract";

function PayRent() {
  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  const unpaidListings = listings.filter(
    (listing) => listing.paymentStatus !== "Paid"
  );

  function openLease(ipfsHash) {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    window.open(url, "_blank");
  }

  async function handleSignLease(listing) {
    try {
      if (listing.leaseStatus === "Signed") {
        alert("Lease already signed");
        return;
      }

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
      alert(error.reason || error.message || "Failed to sign lease");
    }
  }

  async function handlePayNow(listing) {
    try {
      if (listing.leaseStatus !== "Signed") {
        alert("Please sign lease first");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        listing.contractAddress,
        ABI,
        signer
      );

      const rentAmount = await contract.rentAmount();

      const tx = await contract.payRent({
        value: rentAmount
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
      alert(error.reason || error.message || "Payment failed");
    }
  }

  return (
    <div className="max-w-6xl mx-auto">

      <h1
        className="mb-10"
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "52px",
          fontWeight: "700",
          color: "#2d1f16"
        }}
      >
        Pay Rent
      </h1>

      {unpaidListings.length === 0 ? (
        <div className="bg-[#fffdf9] rounded-[32px] p-12 shadow-md border border-[#eadbc8] text-center">
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "32px",
              fontWeight: "700",
              color: "#2d1f16"
            }}
          >
            No Pending Payments
          </h2>

          <p className="text-gray-500 mt-3 text-lg">
            All rent payments are completed successfully.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">

          {unpaidListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-[#fffdf9] rounded-[32px] p-8 shadow-lg border border-[#eadbc8]"
            >
              <h2
                className="mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "34px",
                  fontWeight: "700",
                  color: "#2d1f16"
                }}
              >
                {listing.title}
              </h2>

              <div className="space-y-4">

                <p className="text-lg text-[#4b2e1f]">
                  <strong>Monthly Rent:</strong>{" "}
                  {listing.rent} BNB
                </p>

                <p className="text-lg text-[#4b2e1f]">
                  <strong>Lease Status:</strong>{" "}
                  {listing.leaseStatus === "Signed"
                    ? "Signed ✅"
                    : "Unsigned ❌"}
                </p>

                <p className="text-lg text-[#4b2e1f]">
                  <strong>Payment Status:</strong>{" "}
                  Pending ⏳
                </p>

              </div>

              <div className="flex flex-wrap gap-4 mt-8">

                <button
                  onClick={() => openLease(listing.ipfsHash)}
                  className="bg-white border border-[#8B5E3C] text-[#4b2e1f] px-6 py-3 rounded-2xl hover:bg-[#f8f3ed] transition cursor-pointer font-medium shadow-sm"
                >
                  View Lease
                </button>

                {listing.leaseStatus !== "Signed" && (
                  <button
                    onClick={() => handleSignLease(listing)}
                    className="bg-[#8B5E3C] text-white px-6 py-3 rounded-2xl hover:bg-[#6f472b] transition cursor-pointer font-medium shadow-sm"
                  >
                    Sign Lease
                  </button>
                )}

                <button
                  onClick={() => handlePayNow(listing)}
                  disabled={listing.leaseStatus !== "Signed"}
                  className={`px-6 py-3 rounded-2xl font-medium transition shadow-sm ${
                    listing.leaseStatus === "Signed"
                      ? "bg-[#2d1f16] text-white hover:bg-[#1a120d] cursor-pointer"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {listing.leaseStatus === "Signed"
                    ? "Pay Now"
                    : "Sign Lease First"}
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default PayRent;