import React, { useEffect, useState } from "react";

interface Metrics {
  rating: number;
  completedOrders: number;
  cancelledOrders: number;
}

const DeliveryPartnerMetrics = ({ partnerId }: { partnerId: string }) => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`/api/partners/${partnerId}/metrics`);
        if (!res.ok) throw new Error("Failed to fetch metrics.");
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, [partnerId]);

  if (loading) return <p>Loading metrics...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!metrics) return <p>No metrics found.</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Performance Metrics</h3>
      <ul className="mt-2">
        <li>Rating: {metrics.rating.toFixed(1)}</li>
        <li>Completed Orders: {metrics.completedOrders}</li>
        <li>Cancelled Orders: {metrics.cancelledOrders}</li>
      </ul>
    </div>
  );
};

export default DeliveryPartnerMetrics;