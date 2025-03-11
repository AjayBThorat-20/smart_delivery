// "use client";

// import React, { useState, useEffect } from "react";
// import { AiOutlineClose } from "react-icons/ai";
// import SecondaryDropdown from "../Common/Dropdown/secondaryDropdown";
// import CustomerForm from "./customerForm";
// import OrderItem from "./orderItem";

// interface Order {
//   customer: { name: string; phone: string; address: string };
//   area: string; // area ID
//   status: string;
//   scheduledFor: string;
//   assignedTo: string | null; // partner ID
//   totalAmount: number;
//   items: { name: string; quantity: number; price: number }[];
// }

// interface CreateOrderProps {
//   onClose: () => void;
//   onCreateOrder: (newOrder: Order) => void;
//   newOrder: Order;
//   setNewOrder: React.Dispatch<React.SetStateAction<Order>>;
// }

// const CreateOrder: React.FC<CreateOrderProps> = ({
//   onClose,
//   onCreateOrder,
//   newOrder,
//   setNewOrder,
// }) => {
//   const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
//   const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch areas and partners
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const areasRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/areas`);
//         if (!areasRes.ok) throw new Error("Failed to fetch areas");
//         const areasData = await areasRes.json();
//         setAreas(areasData);

//         const partnersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/partners/get-partner`);
//         if (!partnersRes.ok) throw new Error("Failed to fetch partners");
//         const partnersData = await partnersRes.json();
//         setPartners(partnersData);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : "An error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Calculate totalAmount whenever items change
//   useEffect(() => {
//     const total = newOrder.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
//     setNewOrder((prev) => ({ ...prev, totalAmount: total }));
//   }, [newOrder.items]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Submitting new order:", newOrder);
//     onCreateOrder(newOrder);
//     onClose();
//   };

//   const handleItemChange = (index: number, field: string, value: string | number) => {
//     setNewOrder((prev) => ({
//       ...prev,
//       items: prev.items.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
//     }));
//   };

//   const addItem = () => {
//     setNewOrder((prev) => ({
//       ...prev,
//       items: [...prev.items, { name: "", quantity: 1, price: 0 }],
//     }));
//   };

//   const removeItem = (index: number) => {
//     setNewOrder((prev) => ({
//       ...prev,
//       items: prev.items.filter((_, i) => i !== index),
//     }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative border-2 border-slate-200 top-10 max-h-[90vh] overflow-y-auto">
//         <h2 className="text-xl font-bold mb-4">Create New Order</h2>
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
//           <AiOutlineClose className="w-6 h-6" />
//         </button>

//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <CustomerForm
//               customer={newOrder.customer}
//               onChange={(field, value) =>
//                 setNewOrder((prev) => ({
//                   ...prev,
//                   customer: { ...prev.customer, [field]: value },
//                 }))
//               }
//             />

//             {/* Area Dropdown */}
//             <SecondaryDropdown
//               label="Area"
//               value={newOrder.area}
//               options={areas}
//               onSelect={(value) => setNewOrder((prev) => ({ ...prev, area: value }))}
//               returnType="id" // Pass area ID
//             />

//             {/* Assigned To Dropdown */}
//             <SecondaryDropdown
//               label="Assigned To"
//               value={newOrder.assignedTo || ""}
//               options={partners}
//               onSelect={(value) => setNewOrder((prev) => ({ ...prev, assignedTo: value }))}
//               returnType="id" // Pass partner ID
//             />

//             {/* Scheduled For Input */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Scheduled For</label>
//               <input
//                 type="datetime-local"
//                 value={newOrder.scheduledFor}
//                 onChange={(e) =>
//                   setNewOrder((prev) => ({
//                     ...prev,
//                     scheduledFor: e.target.value,
//                   }))
//                 }
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//                 required
//               />
//             </div>

//             {/* Order Items */}
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700">Order Items</label>
//               {newOrder.items.map((item, index) => (
//                 <OrderItem
//                   key={index}
//                   item={item}
//                   index={index}
//                   onChange={handleItemChange}
//                   onRemove={removeItem}
//                 />
//               ))}
//               <button
//                 type="button"
//                 onClick={addItem}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//               >
//                 Add Item
//               </button>
//             </div>

//             {/* Total Amount Field */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Total Amount</label>
//               <input
//                 type="number"
//                 value={newOrder.totalAmount.toFixed(2)}
//                 readOnly
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
//               />
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6 col-span-2">
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 Create Order
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateOrder;






"use client";

import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import SecondaryDropdown from "../Common/Dropdown/secondaryDropdown";
import CustomerForm from "./customerForm";
import OrderItem from "./orderItem";

interface Order {
  customer: { name: string; phone: string; address: string };
  area: string;
  status: string;
  scheduledFor: string;
  assignedTo: string | null;
  totalAmount: number;
  items: { name: string; quantity: number; price: number }[];
}

interface CreateOrderProps {
  onClose: () => void;
  onCreateOrder: (newOrder: Order) => void;
  newOrder: Order;
  setNewOrder: React.Dispatch<React.SetStateAction<Order>>;
}

const CreateOrder: React.FC<CreateOrderProps> = ({
  onClose,
  onCreateOrder,
  newOrder,
  setNewOrder,
}) => {
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const [partners, setPartners] = useState<{ id: string; name: string; metrics?: { rating: number } }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/areas`);
        if (!areasRes.ok) throw new Error("Failed to fetch areas");
        const areasData = await areasRes.json();
        setAreas(areasData);

        const partnersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/partners/get-partner`);
        if (!partnersRes.ok) throw new Error("Failed to fetch partners");
        const partnersData = await partnersRes.json();
        setPartners(partnersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const total = newOrder.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setNewOrder((prev) => ({ ...prev, totalAmount: total }));
  }, [newOrder.items]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative border-2 border-slate-200 top-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Create New Order</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <AiOutlineClose className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomerForm
              customer={newOrder.customer}
              onChange={(field, value) =>
                setNewOrder((prev) => ({
                  ...prev,
                  customer: { ...prev.customer, [field]: value },
                }))
              }
            />

            <SecondaryDropdown
              label="Area"
              value={newOrder.area}
              options={areas}
              onSelect={(value) => setNewOrder((prev) => ({ ...prev, area: value }))}
              returnType="id"
            />

            <SecondaryDropdown
              label="Assigned To"
              value={newOrder.assignedTo || ""}
              options={partners.map((partner) => ({
                id: partner.id,
                name: `${partner.name} (Rating: ${partner.metrics?.rating?.toFixed(1) || "N/A"})`,
              }))}
              onSelect={(value) => setNewOrder((prev) => ({ ...prev, assignedTo: value }))}
              returnType="id"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">Scheduled For</label>
              <input
                type="datetime-local"
                value={newOrder.scheduledFor}
                onChange={(e) =>
                  setNewOrder((prev) => ({
                    ...prev,
                    scheduledFor: e.target.value,
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Order Items</label>
              {newOrder.items.map((item, index) => (
                <OrderItem
                  key={index}
                  item={item}
                  index={index}
                  onChange={(index, field, value) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      items: prev.items.map((item, i) =>
                        i === index ? { ...item, [field]: value } : item
                      ),
                    }))
                  }
                  onRemove={(index) =>
                    setNewOrder((prev) => ({
                      ...prev,
                      items: prev.items.filter((_, i) => i !== index),
                    }))
                  }
                />
              ))}
              <button
                type="button"
                onClick={() =>
                  setNewOrder((prev) => ({
                    ...prev,
                    items: [...prev.items, { name: "", quantity: 1, price: 0 }],
                  }))
                }
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add Item
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Total Amount</label>
              <input
                type="number"
                value={newOrder.totalAmount.toFixed(2)}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
              />
            </div>

            <div className="mt-6 col-span-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Create Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;