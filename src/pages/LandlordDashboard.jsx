import { Link } from "react-router-dom";

function LandlordDashboard() {
  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  function openLease(ipfsHash) {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    window.open(url, "_blank");
  }

  if (listings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10">

        <h2
          className="mb-8 text-center"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "42px",
            fontWeight: "700",
            color: "#2d1f16"
          }}
        >
          Dashboard
        </h2>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <Link
            to="/pay"
            className="bg-[#8B5E3C] text-white p-6 rounded-3xl shadow-lg hover:bg-[#6f472b] transition"
          >
            <h3 className="text-2xl font-bold mb-2">
              Pay Rent
            </h3>
            <p>
              Complete monthly rent payments securely
              using blockchain transactions.
            </p>
          </Link>

          <Link
            to="/payment-history"
            className="bg-white border border-[#eadbc8] p-6 rounded-3xl shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-bold mb-2 text-[#4b2e1f]">
              Payment History
            </h3>
            <p className="text-gray-600">
              View all successful rent payments,
              transactions, and history records.
            </p>
          </Link>

        </div>

        <div className="bg-white rounded-3xl p-10 shadow-md text-center">
          <p className="text-gray-500 text-lg">
            No properties found
          </p>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">

      <h2
        className="mb-8"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "42px",
          fontWeight: "700",
          color: "#2d1f16"
        }}
      >
        Dashboard
      </h2>

      {/* Top Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <Link
          to="/pay"
          className="bg-[#8B5E3C] text-white p-6 rounded-3xl shadow-lg hover:bg-[#6f472b] transition"
        >
          <h3 className="text-2xl font-bold mb-2">
            Pay Rent
          </h3>

          <p>
            Complete secure blockchain rent payments.
          </p>
        </Link>

        <Link
          to="/payment-history"
          className="bg-white border border-[#eadbc8] p-6 rounded-3xl shadow-lg hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-bold mb-2 text-[#4b2e1f]">
            Payment History
          </h3>

          <p className="text-gray-600">
            View all payment records and transactions.
          </p>
        </Link>

      </div>

      {/* Listings */}
      <div className="grid md:grid-cols-2 gap-6">

        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white p-6 rounded-3xl shadow-md border border-[#eadbc8]"
          >
            <h3 className="text-2xl font-bold mb-4 text-[#2d1f16]">
              {listing.title}
            </h3>

            <p className="mb-3">
              <strong>Rent:</strong>{" "}
              {listing.rent} BNB
            </p>

            <p className="mb-3">
              <strong>Lease Status:</strong>{" "}
              {listing.leaseStatus === "Signed"
                ? "Signed ✅"
                : "Unsigned ❌"}
            </p>

            <p className="mb-3">
              <strong>Payment Status:</strong>{" "}
              {listing.paymentStatus === "Paid"
                ? "Paid ✅"
                : "Pending ⏳"}
            </p>

            <p className="text-sm text-gray-500 break-all mb-3">
              <strong>Contract:</strong>{" "}
              {listing.contractAddress}
            </p>

            <p className="text-sm text-gray-500 mb-5">
              <strong>Created:</strong>{" "}
              {listing.createdAt}
            </p>

            <button
              onClick={() => openLease(listing.ipfsHash)}
              className="bg-[#4b2e1f] hover:bg-[#2d1f16] text-white px-5 py-3 rounded-xl transition"
            >
              View Lease PDF
            </button>
          </div>
        ))}

      </div>

    </div>
  );
}

export default LandlordDashboard;