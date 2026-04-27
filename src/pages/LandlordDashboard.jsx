function LandlordDashboard() {
  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  function openLease(ipfsHash) {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    window.open(url, "_blank");
  }

  function deleteListing(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmDelete) return;

    const updatedListings = listings.filter(
      (listing) => listing.id !== id
    );

    localStorage.setItem(
      "listings",
      JSON.stringify(updatedListings)
    );

    alert("Listing deleted successfully!");
    window.location.reload();
  }

  function editListing(id) {
  window.location.href = `/create?id=${id}`;
}

  if (listings.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-10">
        <h2
          className="mb-8 text-center"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "48px",
            fontWeight: "700",
            color: "#2d1f16"
          }}
        >
          Landlord Dashboard
        </h2>

        <div className="bg-[#fffdf9] rounded-[32px] p-12 shadow-lg text-center border border-[#eadbc8]">
          <h3 className="text-3xl font-semibold text-[#4b2e1f] mb-4">
            No Properties Found
          </h3>

          <p className="text-gray-500 text-lg">
            Create your first premium property listing
            to start managing leases.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2
        className="mb-10"
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "48px",
          fontWeight: "700",
          color: "#2d1f16"
        }}
      >
        Landlord Dashboard
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-[#fffdf9] p-8 rounded-[32px] shadow-lg border border-[#eadbc8]"
          >
            <h3
              className="mb-5"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "34px",
                fontWeight: "700",
                color: "#2d1f16"
              }}
            >
              {listing.title}
            </h3>

            <div className="space-y-3 mb-5">
              <p className="text-lg text-[#4b2e1f]">
                <strong>Rent:</strong> {listing.rent} BNB
              </p>

              <p className="text-lg text-[#4b2e1f]">
                <strong>Lease Status:</strong>{" "}
                {listing.leaseStatus === "Signed"
                  ? "Signed ✅"
                  : "Unsigned ❌"}
              </p>

              <p className="text-lg text-[#4b2e1f]">
                <strong>Payment Status:</strong>{" "}
                {listing.paymentStatus === "Paid"
                  ? "Paid ✅"
                  : "Pending ⏳"}
              </p>
            </div>

            <p className="text-sm text-gray-500 break-all mb-3">
              <strong>Contract:</strong> {listing.contractAddress}
            </p>

            <p className="text-sm text-gray-500 mb-6">
              <strong>Created:</strong> {listing.createdAt}
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openLease(listing.ipfsHash)}
                className="bg-[#4b2e1f] hover:bg-[#2d1f16] text-white px-6 py-3 rounded-2xl transition cursor-pointer shadow-md"
              >
                View Lease PDF
              </button>

              {listing.paymentStatus !== "Paid" ? (
                <>
                  <button
                    onClick={() => editListing(listing.id)}
                    className="bg-[#8B5E3C] hover:bg-[#6f472b] text-white px-6 py-3 rounded-2xl transition cursor-pointer shadow-md"
                  >
                    Edit Listing
                  </button>

                  <button
                    onClick={() => deleteListing(listing.id)}
                    className="bg-[#d9b382] hover:bg-[#c89a63] text-[#2d1f16] px-6 py-3 rounded-2xl transition cursor-pointer shadow-md font-semibold"
                  >
                    Delete Listing
                  </button>
                </>
              ) : (
                <div className="bg-[#f8f3ed] px-5 py-3 rounded-2xl border border-[#eadbc8]">
                  <p className="text-[#6b4f3a] font-medium">
                    Payment Completed — Editing Locked 🔒
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandlordDashboard;