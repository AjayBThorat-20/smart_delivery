import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

interface Area {
  id: string;
  name: string;
}

interface AreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AreaModal: React.FC<AreaModalProps> = ({ isOpen, onClose }) => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [editedAreas, setEditedAreas] = useState<{ [id: string]: string }>({});
  const [newAreaName, setNewAreaName] = useState<string>("");
  const [showAddArea, setShowAddArea] = useState<boolean>(false);
  const [editingAreaId, setEditingAreaId] = useState<string | null>(null); // Track which area is being edited

  useEffect(() => {
    if (isOpen) fetchAreas();
  }, [isOpen]);

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

  const handleEdit = (id: string, name: string) => {
    setEditedAreas((prev) => ({ ...prev, [id]: name }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this area?")) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/areas/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete area");
      fetchAreas();
    } catch (error) {
      console.error("Error deleting area:", error);
    }
  };

  const handleSaveAll = async () => {
    try {
      // Add new area (if entered)
      if (newAreaName.trim()) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/areas`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newAreaName }),
          }
        );
        if (!res.ok) throw new Error("Failed to add area");
        setNewAreaName("");
        setShowAddArea(false);
      }

      // Update modified areas
      for (const [id, name] of Object.entries(editedAreas)) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/areas/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
          }
        );
        if (!res.ok) throw new Error(`Failed to update area ${id}`);
      }

      // Refresh data
      setEditedAreas({});
      setEditingAreaId(null); // Reset editing state
      fetchAreas();
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative border-2 border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Areas</h2>
          <div className="flex items-center gap-4">
            <FaPlus
              className="text-green-500 cursor-pointer text-xl hover:text-green-600"
              onClick={() => setShowAddArea(!showAddArea)}
            />
            <IoClose
              className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
              onClick={onClose}
            />
          </div>
        </div>

        <table className="w-full border-1 border-slate-200 rounded-3xl">
          <thead>
            <tr>
              <th className="text-center p-3 text-gray-700 font-bold">
                Area Name
              </th>
              <th className="text-center p-3 text-gray-700 font-bold">
                Actions
              </th>
            </tr>
            {/* Add a horizontal divider below the header */}
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="p-0">
                <hr className="border-t border-slate-200" />
              </td>
            </tr>
            {showAddArea && (
              <>
                <tr>
                  <td className="p-3">
                    <input
                      type="text"
                      value={newAreaName}
                      onChange={(e) => setNewAreaName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter new area name"
                    />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => {
                        setNewAreaName(""); // Clear the input
                        setShowAddArea(false); // Hide the "Add Area" row
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="p-0">
                    <hr className="border-t border-slate-200" />
                  </td>
                </tr>
              </>
            )}
            {areas.map((area, index) => (
              <React.Fragment key={area.id}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <input
                      type="text"
                      value={editedAreas[area.id] ?? area.name}
                      onChange={(e) => handleEdit(area.id, e.target.value)}
                      className={`w-full px-3 py-2 border ${
                        editingAreaId === area.id
                          ? "border-blue-500 focus:ring-2 focus:ring-blue-500"
                          : "border-transparent"
                      } rounded-lg focus:outline-none`}
                      readOnly={editingAreaId !== area.id} // Make input read-only unless editing
                    />
                  </td>
                  <td className="flex flex-row items-center justify-center gap-4 p-4">
                    {editingAreaId === area.id ? (
                      <button
                      onClick={() => {
                        setEditingAreaId(null); // Cancel editing
                        setEditedAreas((prev) => {
                          const updatedEditedAreas = { ...prev };
                          delete updatedEditedAreas[area.id]; // Remove the edited value for this area
                          return updatedEditedAreas;
                        });
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    ) : (
                      <>
                        <FaRegEdit
                          onClick={() => {
                            setEditingAreaId(area.id); // Enable editing for this area
                            handleEdit(area.id, area.name); // Initialize the input value
                          }}
                          className="text-blue-500 cursor-pointer text-2xl hover:text-blue-600" // Increased size to text-2xl
                        />
                        <MdDelete
                          onClick={() => handleDelete(area.id)}
                          className="text-red-500 cursor-pointer text-2xl hover:text-red-600" // Increased size to text-2xl
                        />
                      </>
                    )}
                  </td>
                </tr>
                {/* Add a horizontal divider after each row except the last one */}
                {index < areas.length - 1 && (
                  <tr>
                    <td colSpan={2} className="p-0">
                      <hr className="border-t border-slate-200" />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSaveAll}
          className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AreaModal;