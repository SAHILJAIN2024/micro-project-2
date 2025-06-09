// export const logTransaction = async (
//   from: string,
//   to: string,
//   amount: number,
//   txHash?: string
// ) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/transactions", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ from, to, amount, txHash }),
//     });

//     if (!response.ok) {
//       console.error("❌ Failed to log transaction");
//     }
//   } catch (err) {
//     console.error("Error logging transaction:", err);
//   }
// };
export const logTransaction = async (
  from: string,
  to: string,
  amount: number,
  txHash: string
) => {
  try {
    await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, amount, txHash }),
    });
  } catch (error) {
    console.error("Logging transaction failed:", error);
  }
};
