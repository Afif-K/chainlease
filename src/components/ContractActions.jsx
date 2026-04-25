import house from "../assets/images/house.jpg";

function ContractActions({
  account,
  connectWallet,
  rent,
  isSigned,
  signLease,
  payRent,
  loading
}) {
  return (
    <div
      className="relative rounded-[32px] overflow-hidden shadow-2xl mb-12 border border-white/20"
      style={{
        backgroundImage: `url(${house})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "800px"
      }}
    >
      {/* Luxury Dark Brown Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2d1f16]/75 via-[#3b2a1f]/65 to-[#1f140d]/80"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[800px] px-8">

        <div className="w-full max-w-4xl text-center">

          {/* Top Tag */}
          <p className="text-[#f5e6d3] text-lg tracking-[4px] uppercase font-light mb-4">
            Premium Blockchain Rental Platform
          </p>

          {/* Main Heading */}
          <h1
            className="text-white font-bold leading-tight mb-6"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "64px"
            }}
          >
            Smart Lease <br />
            Management
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#f3e9df] text-xl max-w-3xl mx-auto leading-relaxed mb-10"
            style={{
              fontFamily: "Poppins, sans-serif"
            }}
          >
            Secure lease agreements, crypto rent payments,
            and decentralized document storage with trust,
            elegance, and complete transparency.
          </p>

          {/* Wallet Button */}
          <button
            onClick={connectWallet}
            className="bg-[#8B5E3C] hover:bg-[#6f472b] cursor-pointer text-white px-10 py-4 rounded-2xl text-lg font-semibold shadow-xl transition duration-300"
            style={{
              fontFamily: "Poppins, sans-serif"
            }}
          >
            {account ? "Wallet Connected" : "Connect Wallet"}
          </button>

          {/* Wallet Address */}
          {account && (
            <p className="text-sm text-[#f3e9df] mt-5 break-all max-w-2xl mx-auto">
              {account}
            </p>
          )}

          {/* Rent */}
          {rent && (
            <p className="text-xl text-white font-medium mt-8">
              Monthly Rent :
              <span className="text-[#e8c9a3] ml-2 font-semibold">
                {rent} BNB
              </span>
            </p>
          )}

          {/* Lease Status */}
          <p className="text-xl text-white mt-5">
            Lease Status :
            {isSigned ? (
              <span className="text-green-300 font-semibold ml-2">
                Signed 
              </span>
            ) : (
              <span className="text-[#ffb4a2] font-semibold ml-2">
                Not Signed 
              </span>
            )}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center flex-wrap gap-5 mt-10">

            <button
              onClick={signLease}
              disabled={loading || isSigned}
              className="bg-white/90 hover:bg-white cursor-pointer text-[#4b2e1f] px-8 py-4 rounded-2xl font-semibold shadow-lg transition disabled:opacity-50"
            >
              Sign Lease
            </button>

            <button
              onClick={payRent}
              disabled={loading || !isSigned}
              className="bg-[#a67c52] hover:bg-[#8b6845] cursor-pointer text-white px-8 py-4 rounded-2xl font-semibold shadow-lg transition disabled:opacity-50"
            >
              Pay Rent
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ContractActions;