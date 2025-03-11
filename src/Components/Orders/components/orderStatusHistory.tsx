import React, { useEffect, useState } from "react";

interface StatusHistory {
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderStatusHistory = ({ orderId }: { orderId: string }) => {
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusHistory = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status-history`);
        if (!res.ok) throw new Error("Failed to fetch status history.");
        const data = await res.json();
        setStatusHistory(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatusHistory();
  }, [orderId]);

  if (loading) return <p>Loading status history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Status History</h3>
      <ul className="mt-2">
        {statusHistory.map((history, index) => (
          <li key={index} className="mb-2">
            <span className="font-medium">{history.status}</span> -{" "}
            <span className="text-gray-500">
              {new Date(history.updatedAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderStatusHistory;