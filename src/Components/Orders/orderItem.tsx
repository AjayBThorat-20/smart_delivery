import React from "react";

interface OrderItemProps {
  item: { name: string; quantity: number; price: number };
  index: number;
  onChange: (index: number, field: string, value: string | number) => void;
  onRemove: (index: number) => void;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, index, onChange, onRemove }) => {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Item Name"
        value={item.name}
        onChange={(e) => onChange(index, "name", e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={item.quantity}
        onChange={(e) => onChange(index, "quantity", parseInt(e.target.value))}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        min="1"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={item.price}
        onChange={(e) => onChange(index, "price", parseFloat(e.target.value))}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        min="0"
        step="0.01"
        required
      />
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default OrderItem;