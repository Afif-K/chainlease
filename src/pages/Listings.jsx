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
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Property Listings
      </h2>

      {/* Search + Filter */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search by property title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Max Rent (BNB)"
            value={maxRent}
            onChange={(e) => setMaxRent(e.target.value)}
            className="border rounded-lg p-3"
          />

        </div>
      </div>

      {/* Results */}
      {filteredListings.length === 0 ? (
        <div className="text-gray-500">
          No matching listings found
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