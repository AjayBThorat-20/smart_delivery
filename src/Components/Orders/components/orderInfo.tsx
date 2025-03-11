// "use client";

// import React, { useEffect, useState } from "react";

// interface Order {
//   id: string;
//   ordernumber: string;
//   customer: {
//     name: string;
//     phone: string;
//     address: string;
//   };
//   area: {
//     name: string;
//   };
//   status: string;
//   scheduledFor: string;
//   assignedTo: string | null;
//   totalAmount: number;
//   items: {
//     name: string;
//     quantity: number;
//     price: number;
//   }[];
//   deliveryPartner?: {
//     name: string;
//     metrics?: {
//       rating: number;
//       completedOrders: number;
//       cancelledOrders: number;
//     };
//   };
// }

// interface StatusHistory {
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface Assignment {
//   id: string;
//   partner: {
//     name: string;
//   };
//   status: string;
//   timestamp: Date;
// }

// const OrderInfo = ({ id, onClose }: { id: string; onClose: () => void }) => {
//   const [order, setOrder] = useState<Order | null>(null);
//   const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
//   const [assignmentHistory, setAssignmentHistory] = useState<Assignment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrderInfo = async () => {
//       try {
//         // Fetch order details
//         const orderRes = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${id}`
//         );
//         if (!orderRes.ok) throw new Error("Failed to fetch order details.");
//         const orderData = await orderRes.json();
//         setOrder(orderData);

//         // Fetch status history
//         const statusRes = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${id}/status-history`
//         );
//         if (!statusRes.ok) throw new Error("Failed to fetch status history.");
//         const statusData = await statusRes.json();
//         setStatusHistory(statusData);

//         // Fetch assignment history
//         const assignmentRes = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API}/assignments/${id}/assignment-history`
//         );
//         if (!assignmentRes.ok) throw new Error("Failed to fetch assignment history.");
//         const assignmentData = await assignmentRes.json();
//         setAssignmentHistory(assignmentData);
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "An error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrderInfo();
//   }, [id]);

//   if (loading) return <p>Loading order information...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!order) return <p>No order found.</p>;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Order Information</h2>
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
//           Close
//         </button>

//         {/* Order Details */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Order Details</h3>
//           <div className="mt-2 space-y-2">
//             <p><strong>Order Number:</strong> {order.ordernumber}</p>
//             <p><strong>Customer:</strong> {order.customer.name}</p>
//             <p><strong>Area:</strong> {order.area.name}</p>
//             <p><strong>Scheduled For:</strong> {new Date(order.scheduledFor).toLocaleString()}</p>
//             <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
//             <p><strong>Items:</strong></p>
//             <ul className="list-disc pl-6">
//               {order.items.map((item, index) => (
//                 <li key={index}>
//                   {item.name} - {item.quantity} x ${item.price.toFixed(2)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Status Tracking */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Status History</h3>
//           <ul className="mt-2 space-y-2">
//             {statusHistory.map((history, index) => (
//               <li key={index}>
//                 <span className="font-medium">{history.status}</span> -{" "}
//                 <span className="text-gray-500">
//                   {new Date(history.updatedAt).toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Assignment History */}
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold">Assignment History</h3>
//           <ul className="mt-2 space-y-2">
//             {assignmentHistory.map((assignment) => (
//               <li key={assignment.id}>
//                 <span className="font-medium">{assignment.partner.name}</span> -{" "}
//                 <span className="text-gray-500">
//                   {new Date(assignment.timestamp).toLocaleString()}
//                 </span>{" "}
//                 ({assignment.status})
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Performance Metrics */}
//         {order.deliveryPartner?.metrics && (
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold">Performance Metrics</h3>
//             <div className="mt-2 space-y-2">
//               <p><strong>Rating:</strong> {order.deliveryPartner.metrics.rating.toFixed(1)}</p>
//               <p><strong>Completed Orders:</strong> {order.deliveryPartner.metrics.completedOrders}</p>
//               <p><strong>Cancelled Orders:</strong> {order.deliveryPartner.metrics.cancelledOrders}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderInfo;







"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  area: {
    name: string;
  };
  status: string;
  scheduledFor: string;
  assignedTo: string | null;
  totalAmount: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  deliveryPartner?: {
    name: string;
    metrics?: {
      rating: number;
      completedOrders: number;
      cancelledOrders: number;
    };
  };
  statusHistory: {
    status: string;
    statusAt: string;
  }[];
  assignmentHistory: {
    id: string;
    partner: {
      name: string;
    };
    status: string;
    timestamp: string;
  }[];
}

const OrderInfo = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        // Fetch order details, status history, and assignment history in a single request
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch order details.");
        const data = await res.json();
        console.log("line no 240 : ", data)
        console.log("Items:", data.items);
        setOrder(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderInfo();
  }, [id]);

  if (loading) return <p>Loading order information...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!order) return <p>No order found.</p>;

 
  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative border-2 border-slate-200">
        <h2 className="text-xl font-bold mb-4">Order Information</h2>
        <button onClick={onClose} className="absolute top-4 right-4 text-black">
        <IoClose className="w-6 h-6" /> {/* Close icon */}
        </button>

        {/* Order Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Order Details</h3>
          <div className="mt-2 space-y-2">
            <p><strong>Order Number:</strong> {order.orderNumber}</p>
            <p><strong>Customer:</strong> {order.customer.name}</p>
            <p><strong>Area:</strong> {order.area.name}</p>
            <p><strong>Scheduled For:</strong> {new Date(order.scheduledFor).toLocaleString()}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-disc pl-6">
  {order.items && order.items.length > 0 ? (
    order.items.map((item) => (
      <li key={item.id}> {/* Use item.id as the key */}
        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
      </li>
    ))
  ) : (
    <li>No items found.</li>
  )}
</ul>
          </div>
        </div>

        {/* Status Tracking */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Status History</h3>
          <ul className="mt-2 space-y-2">
            {order.statusHistory.map((history, index) => (
              <li key={index}>
                <span className="font-medium">{history.status}</span> -{" "}
                <span className="text-gray-500">
                  {new Date(history.statusAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Assignment History */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Assignment History</h3>
          <ul className="mt-2 space-y-2">
            {order.assignmentHistory.map((assignment) => (
              <li key={assignment.id}>
                <span className="font-medium">{assignment.partner.name}</span> -{" "}
                <span className="text-gray-500">
                  {new Date(assignment.timestamp).toLocaleString()}
                </span>{" "}
                ({assignment.status})
              </li>
            ))}
          </ul>
        </div>

        {/* Performance Metrics */}
        {order.deliveryPartner?.metrics && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
            <div className="mt-2 space-y-2">
              <p><strong>Rating:</strong> {order.deliveryPartner.metrics.rating.toFixed(1)}</p>
              <p><strong>Completed Orders:</strong> {order.deliveryPartner.metrics.completedOrders}</p>
              <p><strong>Cancelled Orders:</strong> {order.deliveryPartner.metrics.cancelledOrders}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInfo;