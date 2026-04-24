function RoleSelector() {
  const currentRole =
    localStorage.getItem("userRole") || "";

  function setRole(role) {
    localStorage.setItem("userRole", role);
    window.location.reload();
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border border-[#eadbc8]">

      <h2
        className="mb-6 text-center"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "34px",
          fontWeight: "700",
          color: "#2d1f16"
        }}
      >
        Select Your Role
      </h2>

      <p className="text-center text-gray-600 mb-8">
        Choose how you want to use ChainLease
      </p>

      <div className="flex flex-wrap justify-center gap-6">

        <button
          onClick={() => setRole("landlord")}
          className={`px-8 py-4 rounded-2xl font-semibold shadow-lg transition cursor-pointer ${
            currentRole === "landlord"
              ? "bg-[#8B5E3C] text-white"
              : "bg-[#f8f3ed] text-[#4b2e1f]"
          }`}
        >
          I am a Landlord
        </button>

        <button
          onClick={() => setRole("tenant")}
          className={`px-8 py-4 rounded-2xl font-semibold shadow-lg transition cursor-pointer ${
            currentRole === "tenant"
              ? "bg-[#4b2e1f] text-white"
              : "bg-[#f8f3ed] text-[#4b2e1f]"
          }`}
        >
          I am a Tenant
        </button>

      </div>

      {currentRole && (
        <p className="text-center mt-6 text-[#6b4f3a] font-medium">
          Current Role:{" "}
          <span className="font-bold capitalize">
            {currentRole}
          </span>
        </p>
      )}

    </div>
  );
}

export default RoleSelector;