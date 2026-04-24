import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#f8f3ed] shadow-lg rounded-[28px] mb-8 border border-[#eadbc8]">
      <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        {/* Premium Logo */}
        <Link to="/" className="cursor-pointer">

          <h2
            className="leading-none"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "34px",
              fontWeight: "700"
            }}
          >
            <span className="text-[#8B5E3C]">
              Chain
            </span>

            <span className="text-[#d9b382]">
              Lease
            </span>
          </h2>

          <p
            className="text-sm tracking-[2px] uppercase mt-1"
            style={{
              fontFamily: "Poppins, sans-serif",
              color: "#6b4f3a"
            }}
          >
            Smart Rental on Blockchain
          </p>

        </Link>

        {/* Navigation Links */}
        <nav
          className="flex flex-wrap gap-8"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        >

          <Link
            to="/"
            className="text-[#4b2e1f] font-medium hover:text-[#8B5E3C] transition cursor-pointer"
          >
            Home
          </Link>

          <Link
            to="/listings"
            className="text-[#4b2e1f] font-medium hover:text-[#8B5E3C] transition cursor-pointer"
          >
            Listings
          </Link>

          <Link
            to="/create"
            className="text-[#4b2e1f] font-medium hover:text-[#8B5E3C] transition cursor-pointer"
          >
            Create Listing
          </Link>

          <Link
            to="/my-leases"
            className="text-[#4b2e1f] font-medium hover:text-[#8B5E3C] transition cursor-pointer"
          >
            My Leases
          </Link>

          <Link
            to="/landlord"
            className="text-[#4b2e1f] font-medium hover:text-[#8B5E3C] transition cursor-pointer"
          >
            Dashboard
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;