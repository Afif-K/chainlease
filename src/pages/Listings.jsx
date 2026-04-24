import { useState } from "react";
import ListingCard from "../components/ListingCard";

function Listings({ listings }) {
  const [search, setSearch] = useState("");
  const [maxRent, setMaxRent] = useState("");

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRent = maxRent
      ? Number(listing.rent) <= Number(maxRent)
      : true;

    return matchesSearch && matchesRent;
  });

  return (
    <div className="max-w-6xl mx-auto">

      <h1
        className="mb-8"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "42px",
          fontWeight: "700",
          color: "#2d1f16"
        }}
      >
        Property Listings
      </h1>

      {/* Premium Search + Filter */}
      <div className="bg-white rounded-3xl shadow-lg border border-[#eadbc8] p-6 mb-8">

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium text-[#4b2e1f]">
              Search Property
            </label>

            <input
              type="text"
              placeholder="Search by property title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-[#d8c3a5] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-[#4b2e1f]">
              Maximum Rent
            </label>

            <input
              type="number"
              placeholder="Max Rent (BNB)"
              value={maxRent}
              onChange={(e) => setMaxRent(e.target.value)}
              className="w-full border border-[#d8c3a5] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
            />
          </div>

        </div>

      </div>

      {/* Results */}
      {filteredListings.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 shadow-md text-center border border-[#eadbc8]">
          <h2 className="text-2xl font-semibold text-[#4b2e1f] mb-2">
            No Matching Listings Found
          </h2>

          <p className="text-gray-500">
            Try changing your search or rent filter.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Listings;