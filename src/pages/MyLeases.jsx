function MyLeases() {
  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  if (listings.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold mb-3">
          My Leases
        </h2>
        <p className="text-gray-500">
          No active leases found
        </p>
      </div>
    );
  }

  function openLease(ipfsHash) {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    window.open(url, "_blank");
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-8">
        My Leases Dashboard
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
              <strong>Monthly Rent:</strong>{" "}
              {listing.rent} BNB
            </p>

            <p className="mb-2">
              <strong>Lease Status:</strong>{" "}
              Signed ✅
            </p>

            <p className="mb-2">
              <strong>Payment Status:</strong>{" "}
              Pending ⏳
            </p>

            <p className="text-sm text-gray-500 break-all mb-4">
              <strong>Contract:</strong>{" "}
              {listing.contractAddress}
            </p>

            <div className="flex gap-3 flex-wrap">

              <button
                onClick={() => openLease(listing.ipfsHash)}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                View Lease
              </button>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Pay Rent
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default MyLeases;