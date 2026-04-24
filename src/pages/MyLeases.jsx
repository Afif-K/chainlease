import { useNavigate } from "react-router-dom";
import villaImage from "../assets/images/villa.jpg";

function MyLeases() {
  const navigate = useNavigate();

  const listings = JSON.parse(
    localStorage.getItem("listings") || "[]"
  );

  function openLease(ipfsHash) {
    const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
    window.open(url, "_blank");
  }

  function goToPayRent() {
    navigate("/pay");
  }

  if (listings.length === 0) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(
            rgba(255,255,255,0.70),
            rgba(255,255,255,0.70)
          ), url(${villaImage})`
        }}
      >
        <div className="max-w-6xl mx-auto pt-10">

          <h2
            className="mb-8 text-center"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "52px",
              fontWeight: "700",
              color: "#2d1f16"
            }}
          >
            My Leases Dashboard
          </h2>

          <div className="bg-[#fffdf9] rounded-[32px] p-12 shadow-xl text-center border border-[#eadbc8]">
            <h3
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "30px",
                fontWeight: "700",
                color: "#2d1f16"
              }}
            >
              No Active Leases Found
            </h3>

            <p className="text-gray-500 mt-4 text-lg">
              Your signed lease agreements will appear here.
            </p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(
          rgba(255,255,255,0.65),
          rgba(255,255,255,0.65)
        ), url(${villaImage})`
      }}
    >
      <div className="max-w-6xl mx-auto pt-8 pb-12">

        <h2
          className="mb-10 text-center"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "52px",
            fontWeight: "700",
            color: "#2d1f16"
          }}
        >
          My Leases Dashboard
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {listings.map((listing) => (
            <div
              key={listing.id}
              className="bg-[#fffdf9] p-8 rounded-[32px] shadow-xl border border-[#eadbc8]"
            >
              <h3
                className="mb-6"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "34px",
                  fontWeight: "700",
                  color: "#2d1f16"
                }}
              >
                {listing.title}
              </h3>

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
                  {listing.paymentStatus === "Paid"
                    ? "Paid ✅"
                    : "Pending ⏳"}
                </p>

                <p className="text-sm text-gray-500 break-all">
                  <strong>Contract:</strong>{" "}
                  {listing.contractAddress}
                </p>

              </div>

              <div className="flex gap-4 flex-wrap mt-8">

                <button
                  onClick={() => openLease(listing.ipfsHash)}
                  className="bg-white border border-[#8B5E3C] text-[#4b2e1f] px-6 py-3 rounded-2xl font-medium shadow-md cursor-pointer transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#f8f3ed]"
                >
                  View Lease
                </button>

                {listing.paymentStatus !== "Paid" && (
                  <button
                    onClick={goToPayRent}
                    className="bg-[#8B5E3C] text-white px-6 py-3 rounded-2xl font-medium shadow-md cursor-pointer transition duration-300 hover:scale-105 hover:bg-[#6f472b] hover:shadow-lg"
                  >
                    Pay Rent
                  </button>
                )}

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default MyLeases;