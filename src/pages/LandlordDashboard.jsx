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
      <div className="text-center mt-10">
        <h2 className="text-3xl font-bold mb-4">
          Landlord Dashboard
        </h2>
        <p className="text-gray-500">
          No properties found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8">
        Landlord Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white p-6 rounded-xl shadow-md border"
          >
            <h3 className="text-xl font-bold mb-3">
              {listing.title}
            </h3>

            <p className="mb-2">
              <strong>Rent:</strong>{" "}
              {listing.rent} BNB
            </p>

            <p className="mb-2">
              <strong>Lease Status:</strong>{" "}
              {listing.leaseStatus === "Signed"
                ? "Signed ✅"
                : "Unsigned ❌"}
            </p>

            <p className="mb-2">
              <strong>Payment Status:</strong>{" "}
              {listing.paymentStatus === "Paid"
                ? "Paid ✅"
                : "Pending ⏳"}
            </p>

            <p className="text-sm text-gray-500 break-all mb-3">
              <strong>Contract:</strong>{" "}
              {listing.contractAddress}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              <strong>Created:</strong>{" "}
              {listing.createdAt}
            </p>

            <button
              onClick={() => openLease(listing.ipfsHash)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg"
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