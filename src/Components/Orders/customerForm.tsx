import React from "react";

interface CustomerFormProps {
  customer: { name: string; phone: string; address: string };
  onChange: (field: string, value: string) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onChange }) => {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Name</label>
        <input
          type="text"
          value={customer.name}
          onChange={(e) => onChange("name", e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Customer Phone</label>
        <input
          type="text"
          value={customer.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700">Customer Address</label>
        <input
          type="text"
          value={customer.address}
          onChange={(e) => onChange("address", e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          required
        />
      </div>
    </>
  );
};

export default CustomerForm;