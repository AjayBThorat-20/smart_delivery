"use client";

import React, { useState } from "react";

interface Order {
    id?: string;
    ordernumber?: string,
    customer: {
      name: string;
      phone: string;
      address: string;
    };
    area: string;
    status: string;
    scheduledFor: string;
    assignedTo: string | null;
    totalAmount: number;
    items: {
      name: string;
      quantity: number;
      price: number;
    }[];
  }
  
interface UpdateOrderModalProps {
  onClose: () => void;
  order: Order | null;
  onUpdateOrder: (updatedOrder: Order) => void;
}

const UpdateOrderModal: React.FC<UpdateOrderModalProps> = ({
  onClose,
  order,
  onUpdateOrder,
}) => {
  const [status, setStatus] = useState(order?.status || "PENDING");

  if (!order) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedOrder = { ...order, status };
    await onUpdateOrder(updatedOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="PENDING">Pending</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="PICKED">Picked</option>
              <option value="DELIVERED">Delivered</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrderModal;