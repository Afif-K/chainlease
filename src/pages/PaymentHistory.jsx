function PaymentHistory() {
  const payments =
    JSON.parse(localStorage.getItem("paymentHistory")) || [];

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
        Payment History
      </h1>

      {payments.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No Payments Yet
          </h2>

          <p className="text-gray-500">
            Once rent payments are completed,
            transaction history will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#8B5E3C] text-white">
              <tr>
                <th className="text-left px-6 py-4">
                  Property
                </th>

                <th className="text-left px-6 py-4">
                  Amount
                </th>

                <th className="text-left px-6 py-4">
                  Date
                </th>

                <th className="text-left px-6 py-4">
                  Transaction Hash
                </th>

                <th className="text-left px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium">
                    {payment.property}
                  </td>

                  <td className="px-6 py-4">
                    {payment.amount}
                  </td>

                  <td className="px-6 py-4">
                    {payment.date}
                  </td>

                  <td className="px-6 py-4">
                    <span className="text-sm break-all text-gray-600">
                      {payment.txHash}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default PaymentHistory;