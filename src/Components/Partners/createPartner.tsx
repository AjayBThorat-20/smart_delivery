import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  currentLoad: number;
  areas: string[];
  shift: { start: string; end: string };
  metrics: { rating: number; completedOrders: number; cancelledOrders: number };
  orders: { id: string; orderNumber: string; status: string }[];
}

interface CreatePartnerProps {
  onClose: () => void;
  onCreatePartner: () => void;
  newPartner: Partner;
  setNewPartner: React.Dispatch<React.SetStateAction<Partner>>;
}

const CreatePartner: React.FC<CreatePartnerProps> = ({
  onClose,
  onCreatePartner,
  newPartner,
  setNewPartner,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure areas is a valid array of strings
    setNewPartner((prevState) => ({
      ...prevState,
      areas: Array.isArray(prevState.areas)
        ? prevState.areas.map((area: string) => area.trim())
        : [],
    }));

    onCreatePartner(); // Trigger API call to create partner
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative border-2 border-slate-200">
        <h2 className="text-xl font-bold mb-4">Create New Partner</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newPartner.name}
                onChange={(e) => setNewPartner((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newPartner.email}
                onChange={(e) => setNewPartner((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={newPartner.phone}
                onChange={(e) => setNewPartner((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={newPartner.status}
                onChange={(e) => setNewPartner((prev) => ({ ...prev, status: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            {/* Current Load Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Load</label>
              <input
                type="number"
                value={newPartner.currentLoad}
                onChange={(e) =>
                  setNewPartner((prev) => ({
                    ...prev,
                    currentLoad: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min="0"
                max="3"
                required
              />
            </div>

            {/* Areas Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Areas</label>
              <input
                type="text"
                value={newPartner.areas.join(", ")}
                onChange={(e) =>
                  setNewPartner((prev) => ({
                    ...prev,
                    areas: e.target.value.split(",").map((area) => area.trim()),
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Shift Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Start</label>
              <input
                type="time" // Use time input type
                value={newPartner.shift.start}
                onChange={(e) =>
                  setNewPartner((prev) => ({
                    ...prev,
                    shift: { ...prev.shift, start: e.target.value },
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Shift End</label>
              <input
                type="time" // Use time input type
                value={newPartner.shift.end}
                onChange={(e) =>
                  setNewPartner((prev) => ({
                    ...prev,
                    shift: { ...prev.shift, end: e.target.value },
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Metrics Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="number"
                value={newPartner.metrics.rating}
                onChange={(e) =>
                  setNewPartner((prev) => ({
                    ...prev,
                    metrics: { ...prev.metrics, rating: parseFloat(e.target.value) || 0 },
                  }))
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                min="0"
                max="5"
                step="0.1"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePartner;