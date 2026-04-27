import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-[#eadbc8]">

      {/* Property Image */}
      <div className="h-64 w-full overflow-hidden bg-[#f8f3ed]">
        <img
          src={
            listing.imageUrl ||
            "https://via.placeholder.com/600x400?text=Property+Image"
          }
          alt={listing.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Details */}
      <div className="p-6">

        <h3
          className="mb-3"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "30px",
            fontWeight: "700",
            color: "#2d1f16"
          }}
        >
          {listing.title}
        </h3>

        <p
          className="mb-3"
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#8B5E3C"
          }}
        >
          {listing.rent} BNB / month
        </p>

        <p className="text-gray-600 text-base mb-5 leading-relaxed">
          {listing.description}
        </p>

        <div className="flex justify-between items-center">

          <span
            className={`text-sm font-medium px-4 py-2 rounded-full ${
              listing.leaseStatus === "Signed"
                ? "bg-green-100 text-green-700"
                : "bg-[#f8f3ed] text-[#8B5E3C]"
            }`}
          >
            {listing.leaseStatus === "Signed"
              ? "Lease Signed"
              : "Available"}
          </span>

          <Link to={`/listing/${listing.id}`}>
            <button
              className="bg-[#8B5E3C] hover:bg-[#6f472b] hover:scale-105 cursor-pointer text-white px-6 py-3 rounded-xl font-medium transition duration-300 shadow-md"
            >
              View Details
            </button>
          </Link>

        </div>
      </div>

    </div>
  );
}

export default ListingCard;