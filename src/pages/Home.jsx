import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-16">

      {/* HERO SECTION */}
      <section className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">

          {/* Left Content */}
          <div className="p-10 md:p-14">
            <p className="text-blue-600 font-semibold mb-3">
              Decentralized Real Estate Platform
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Smart Rental
              <span className="text-blue-600"> Agreements</span>
              <br />
              on Blockchain
            </h1>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Secure lease agreements using blockchain,
              IPFS-powered document storage, and crypto
              rent payments with full transparency for
              landlords and tenants.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/listings"
                className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Browse Properties
              </Link>

              <Link
                to="/create"
                className="bg-gray-900 text-white px-7 py-3 rounded-xl font-semibold hover:bg-black transition"
              >
                List Property
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-full">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              alt="Property"
              className="w-full h-full object-cover min-h-[500px]"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section>
        <h2 className="text-3xl font-bold mb-8">
          Why Choose ChainLease?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-3">
              Smart Contracts
            </h3>

            <p className="text-gray-600">
              Lease agreements deployed securely on-chain
              for trust, automation, and transparency.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-3">
              IPFS Storage
            </h3>

            <p className="text-gray-600">
              Permanent decentralized lease document
              storage with secure access anytime.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-3">
              Crypto Rent Payment
            </h3>

            <p className="text-gray-600">
              Pay rent directly through MetaMask with
              blockchain-backed payment verification.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-blue-600 text-white rounded-3xl p-12 text-center shadow-lg">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Modernize Property Rentals?
        </h2>

        <p className="text-lg mb-8">
          Join the future of decentralized leasing and
          property management today.
        </p>

        <Link
          to="/create"
          className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
        >
          Get Started Today
        </Link>
      </section>

    </div>
  );
}

export default Home;