import { Link } from "react-router-dom";
import house from "../assets/images/house1.jpg";

function Home() {
  return (
    <div className="space-y-16">

      {/* HERO SECTION */}
      <section className="rounded-[32px] shadow-2xl overflow-hidden border border-white/20">
        <div className="grid md:grid-cols-2 items-center min-h-[700px]">

          {/* Left Content */}
          <div className="p-10 md:p-14 bg-[#f8f3ed] h-full flex flex-col justify-center">

            <p
              className="text-[#8B5E3C] font-semibold mb-4 tracking-[3px] uppercase"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Premium Blockchain Rental Platform
            </p>

            <h1
              className="text-[#2d1f16] leading-tight mb-6"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "58px",
                fontWeight: "700"
              }}
            >
              Smart Rental
              <span className="text-[#8B5E3C]"> Agreements</span>
              <br />
              on Blockchain
            </h1>

            <p
              className="text-[#5c4a3d] text-lg mb-8 leading-relaxed"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Secure lease agreements using blockchain,
              IPFS-powered document storage, and crypto
              rent payments with full transparency for
              landlords and tenants.
            </p>

            <div className="flex flex-wrap gap-4">

              <Link
                to="/listings"
                className="bg-[#8B5E3C] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#6f472b] transition shadow-lg"
                style={{
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                Browse Properties
              </Link>

              <Link
                to="/create"
                className="bg-white text-[#4b2e1f] px-8 py-4 rounded-2xl font-semibold hover:bg-[#f1e8de] transition shadow-lg border border-[#d8c2aa]"
                style={{
                  fontFamily: "Poppins, sans-serif"
                }}
              >
                List Property
              </Link>

            </div>
          </div>

          {/* Right Image */}
          <div className="h-full">
            <img
              src={house}
              alt="Luxury Property"
              className="w-full h-full object-cover min-h-[700px]"
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section>

        <h2
          className="mb-8 text-center"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "42px",
            fontWeight: "700",
            color: "#2d1f16"
          }}
        >
          Why Choose ChainLease?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-md border border-[#eadbc8]">
            <h3
              className="mb-4"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "26px",
                fontWeight: "700",
                color: "#4b2e1f"
              }}
            >
              Smart Contracts
            </h3>

            <p
              className="text-[#5c4a3d]"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Lease agreements deployed securely on-chain
              for trust, automation, and transparency.
            </p>
          </div>

          <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-md border border-[#eadbc8]">
            <h3
              className="mb-4"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "26px",
                fontWeight: "700",
                color: "#4b2e1f"
              }}
            >
              IPFS Storage
            </h3>

            <p
              className="text-[#5c4a3d]"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Permanent decentralized lease document
              storage with secure access anytime.
            </p>
          </div>

          <div className="bg-[#fffaf5] p-8 rounded-3xl shadow-md border border-[#eadbc8]">
            <h3
              className="mb-4"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "26px",
                fontWeight: "700",
                color: "#4b2e1f"
              }}
            >
              Crypto Rent Payment
            </h3>

            <p
              className="text-[#5c4a3d]"
              style={{
                fontFamily: "Poppins, sans-serif"
              }}
            >
              Pay rent directly through MetaMask with
              blockchain-backed payment verification.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#4b2e1f] text-white rounded-[32px] p-14 text-center shadow-xl">

        <h2
          className="mb-4"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "46px",
            fontWeight: "700"
          }}
        >
          Ready to Modernize Property Rentals?
        </h2>

        <p
          className="text-lg mb-8 text-[#f3e9df]"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        >
          Join the future of decentralized leasing and
          property management today.
        </p>

        <Link
          to="/create"
          className="bg-[#e8c9a3] text-[#3b2a1f] px-8 py-4 rounded-2xl font-semibold hover:bg-[#dcb890] transition shadow-lg"
          style={{
            fontFamily: "Poppins, sans-serif"
          }}
        >
          Get Started Today
        </Link>

      </section>

    </div>
  );
}

export default Home;