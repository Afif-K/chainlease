import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md rounded-2xl mb-8">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            ChainLease
          </h2>
          <p className="text-sm text-gray-500">
            Smart Rental on Blockchain
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap gap-6">

          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/listings"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Listings
          </Link>

          <Link
            to="/create"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Create Listing
          </Link>

          <Link
            to="/my-leases"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            My Leases
          </Link>

          <Link
            to="/pay"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Pay Rent
          </Link>

          <Link
            to="/landlord"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Landlord Dashboard
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Navbar;