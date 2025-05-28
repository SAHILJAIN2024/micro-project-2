import { useEffect, useState } from "react";

type Request = {
  _id: string;
  name: string;
  walletAddress: string;
  reason: string;
  status: string;
};

const RequestDashboard = () => {  // 🔥 change the name here to match the export
  const [requests, setRequests] = useState<Request[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error("❌ Error fetching requests:", err);
    }
  };

  const approveRequest = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}/approve`, {
        method: "PUT",
      });
      fetchRequests(); // refresh
    } catch (err) {
      console.error("❌ Error approving:", err);
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}/reject`, {
        method: "PUT",
      });
      fetchRequests(); // refresh
    } catch (err) {
      console.error("❌ Error rejecting:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Request Dashboard</h2> {/* optional: change heading */}
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        requests.map((req) => (
          <div key={req._id} style={{ border: "1px solid #ccc", margin: "1rem", padding: "1rem" }}>
            <p><strong>Name:</strong> {req.name}</p>
            <p><strong>Wallet:</strong> {req.walletAddress}</p>
            <p><strong>Reason:</strong> {req.reason}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <button onClick={() => approveRequest(req._id)}>Approve</button>
            <button onClick={() => rejectRequest(req._id)}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestDashboard;
