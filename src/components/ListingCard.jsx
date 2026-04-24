import { Link } from "react-router-dom";

function ListingCard({ listing }) {
  return (
    <Link to={`/listing/${listing.id}`}>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border">

        {/* Property Image */}
        <div className="h-56 w-full overflow-hidden">
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
        <div className="p-5">

          <h3 className="text-xl font-bold mb-2 text-gray-800">
            {listing.title}
          </h3>

          <p className="text-lg font-semibold text-blue-600 mb-2">
            {listing.rent} BNB / month
          </p>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {listing.description}
          </p>

          <div className="flex justify-between items-center">

            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                listing.leaseStatus === "Signed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {listing.leaseStatus === "Signed"
                ? "Lease Signed"
                : "Available"}
            </span>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </button>

          </div>
        </div>

      </div>
    </Link>
  );
}

export default ListingCard;