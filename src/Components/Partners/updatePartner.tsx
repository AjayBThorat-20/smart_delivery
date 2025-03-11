import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";

interface Area {
  id: string;
  name: string;
}

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  currentLoad: number;
  areas: string[]; // Ensure areas is always an array of strings
  shift: { start: string; end: string }; // Shift as an object
  metrics: { rating: number; completedOrders: number; cancelledOrders: number }; // Metrics as an object
  orders: { id: string; orderNumber: string; status: string }[];
}

interface UpdatePartnerProps {
  onClose: () => void;
  onUpdatePartner: (updatedPartner: Partner) => void;
  partner: Partner;
}

const UpdatePartner: React.FC<UpdatePartnerProps> = ({
  onClose,
  onUpdatePartner,
  partner,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Ensure partner.areas is always an array
  const initialAreas = Array.isArray(partner.areas)
    ? partner.areas
    : typeof partner.areas === "string"
    ? partner.areas.split(", ")
    : [];

  // Parse the metrics string into an object
  const parseMetrics = (metricsString: string) => {
    const metrics = {
      rating: 0,
      completedOrders: 0,
      cancelledOrders: 0,
    };

    if (typeof metricsString === "string") {
      metricsString.split(", ").forEach((part) => {
        if (part.startsWith("Rating:")) {
          metrics.rating = parseFloat(part.replace("Rating:", "").trim());
        } else if (part.startsWith("Completed:")) {
          metrics.completedOrders = parseInt(part.replace("Completed:", "").trim(), 10);
        } else if (part.startsWith("Cancelled:")) {
          metrics.cancelledOrders = parseInt(part.replace("Cancelled:", "").trim(), 10);
        }
      });
    }

    return metrics;
  };

  // Parse the shift string into an object
  const parseShift = (shiftString: string) => {
    const [start, end] = shiftString.split(" - ");
    return { start, end };
  };

  const [updatedPartner, setUpdatedPartner] = useState<Partner>({
    ...partner,
    areas: initialAreas, // Ensure areas is always an array
    metrics: typeof partner.metrics === "string" ? parseMetrics(partner.metrics) : partner.metrics, // Parse metrics string into an object
    shift: typeof partner.shift === "string" ? parseShift(partner.shift) : partner.shift, // Parse shift string into an object
  });

  // Fetch areas when the component mounts
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/areas`);
        if (!res.ok) throw new Error("Failed to fetch areas");
        const data = await res.json();
        setAreas(data);
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    };

    fetchAreas();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePartner(updatedPartner);
    onClose();
  };

  const handleAreaChange = (areaName: string) => {
    setUpdatedPartner((prev) => {
      const updatedAreas = prev.areas.includes(areaName)
        ? prev.areas.filter((area) => area !== areaName)
        : [...prev.areas, areaName];
      return { ...prev, areas: updatedAreas };
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative border-2 border-slate-200 top-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Update Partner</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="w-6 h-6" />
        </button>

        {error && <div className="text-red-600 mb-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={updatedPartner.name}
                onChange={(e) => setUpdatedPartner((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={updatedPartner.email}
                onChange={(e) => setUpdatedPartner((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                value={updatedPartner.phone}
                onChange={(e) => setUpdatedPartner((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={updatedPartner.status}
                onChange={(e) => setUpdatedPartner((prev) => ({ ...prev, status: e.target.value }))}
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
                value={updatedPartner.currentLoad}
                onChange={(e) =>
                  setUpdatedPartner((prev) => ({
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
            <div ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700">Areas</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
                >
                  <span>
                    {updatedPartner.areas.length > 0
                      ? updatedPartner.areas.join(", ")
                      : "Select areas"}
                  </span>
                  <AiOutlineDown className="w-4 h-4 text-gray-500" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {areas.map((area) => (
                      <div
                        key={area.id}
                        className="flex items-center p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          id={area.id}
                          checked={updatedPartner.areas.includes(area.name)}
                          onChange={() => handleAreaChange(area.name)}
                          className="mr-2"
                        />
                        <label htmlFor={area.id}>{area.name}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Shift Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Shift Start</label>
              <input
                type="time"
                value={updatedPartner.shift.start}
                onChange={(e) =>
                  setUpdatedPartner((prev) => ({
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
                type="time"
                value={updatedPartner.shift.end}
                onChange={(e) =>
                  setUpdatedPartner((prev) => ({
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
                value={updatedPartner.metrics.rating}
                onChange={(e) =>
                  setUpdatedPartner((prev) => ({
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
              Update Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePartner;