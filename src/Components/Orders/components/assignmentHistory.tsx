import React, { useEffect, useState } from "react";

interface Assignment {
  id: string;
  partner: {
    name: string;
    email: string;
  };
  status: string;
  timestamp: Date;
}

const AssignmentHistory = ({ orderId }: { orderId: string }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignmentHistory = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/assignment-history`);
        if (!res.ok) throw new Error("Failed to fetch assignment history.");
        const data = await res.json();
        setAssignments(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentHistory();
  }, [orderId]);

  if (loading) return <p>Loading assignment history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Assignment History</h3>
      <ul className="mt-2">
        {assignments.map((assignment) => (
          <li key={assignment.id} className="mb-2">
            <span className="font-medium">{assignment.partner.name}</span> -{" "}
            <span className="text-gray-500">
              {new Date(assignment.timestamp).toLocaleString()}
            </span>{" "}
            ({assignment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentHistory;