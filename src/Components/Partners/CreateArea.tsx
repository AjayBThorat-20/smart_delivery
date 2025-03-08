// // "use client";

// // import React, { useState } from "react";

// // interface CreateAreaProps {
// //   onClose: () => void;
// //   onCreateArea: (name: string) => void;
// // }

// // const CreateArea: React.FC<CreateAreaProps> = ({ onClose, onCreateArea }) => {
// //   const [areaName, setAreaName] = useState("");

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!areaName.trim()) return;

// //     onCreateArea(areaName);
// //     setAreaName("");
// //     onClose(); // Close modal after creation
// //   };

// //   return (
// //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
// //         <h2 className="text-xl font-bold mb-4">Create New Area</h2>
// //         <form onSubmit={handleSubmit}>
// //           <label className="block mb-2 font-medium">Area Name:</label>
// //           <input
// //             type="text"
// //             value={areaName}
// //             onChange={(e) => setAreaName(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded mb-4"
// //             placeholder="Enter area name"
// //             required
// //           />
// //           <div className="flex justify-end space-x-3">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// //             >
// //               Create
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreateArea;















// "use client";

// import React, { useState } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";

// interface CreateAreaProps {
//   onClose: () => void;
//   onCreateArea: (name: string) => void;
// }

// const CreateArea: React.FC<CreateAreaProps> = ({ onClose, onCreateArea }) => {
//   const [areaName, setAreaName] = useState("");
//   const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [updatedName, setUpdatedName] = useState<string>("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!areaName.trim()) return;

//     const newArea = { id: Date.now().toString(), name: areaName };
//     setAreas([...areas, newArea]);
//     setAreaName("");
//   };

//   const handleEdit = (id: string, name: string) => {
//     setEditingId(id);
//     setUpdatedName(name);
//   };

//   const handleSave = (id: string) => {
//     setAreas(areas.map((area) => (area.id === id ? { ...area, name: updatedName } : area)));
//     setEditingId(null);
//   };

//   const handleDelete = (id: string) => {
//     setAreas(areas.filter((area) => area.id !== id));
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-bold mb-4">Manage Areas</h2>
//         <form onSubmit={handleSubmit} className="mb-4">
//           <label className="block mb-2 font-medium">Area Name:</label>
//           <input
//             type="text"
//             value={areaName}
//             onChange={(e) => setAreaName(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded mb-4"
//             placeholder="Enter area name"
//             required
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-black  px-4 py-2 rounded hover:bg-blue-600 w-full"
//           >
//             Add Area
//           </button>
//         </form>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Area Name</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {areas.map((area) => (
//               <tr key={area.id} className="border">
//                 <td className="border p-2">
//                   {editingId === area.id ? (
//                     <input
//                       type="text"
//                       value={updatedName}
//                       onChange={(e) => setUpdatedName(e.target.value)}
//                       className="border p-1 w-full"
//                     />
//                   ) : (
//                     area.name
//                   )}
//                 </td>
//                 <td className="border p-2 flex gap-3">
//                   {editingId === area.id ? (
//                     <button
//                       onClick={() => handleSave(area.id)}
//                       className="bg-green-500 text-white px-3 py-1 rounded"
//                     >
//                       Save
//                     </button>
//                   ) : (
//                     <FaRegEdit
//                       onClick={() => handleEdit(area.id, area.name)}
//                       className="text-blue-500 cursor-pointer"
//                     />
//                   )}
//                   <MdDelete
//                     onClick={() => handleDelete(area.id)}
//                     className="text-red-500 cursor-pointer"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-end mt-4">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateArea;












"use client";

import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface CreateAreaProps {
  onClose: () => void;
  onCreateArea: (name: string) => void;
}

const CreateArea: React.FC<CreateAreaProps> = ({ onClose, onCreateArea }) => {
  const [areaName, setAreaName] = useState("");
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [updatedName, setUpdatedName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!areaName.trim()) return;

    const newArea = { id: Date.now().toString(), name: areaName };
    setAreas([...areas, newArea]);
    setAreaName("");
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setUpdatedName(name);
  };

  const handleSave = (id: string) => {
    setAreas(areas.map((area) => (area.id === id ? { ...area, name: updatedName } : area)));
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setAreas(areas.filter((area) => area.id !== id));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <IoClose
          className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={onClose}
        />
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Manage Areas</h2>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Area
          </button>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Area Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <tr key={area.id} className="border">
                <td className="border p-2">
                  {editingId === area.id ? (
                    <input
                      type="text"
                      value={updatedName}
                      onChange={(e) => setUpdatedName(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    area.name
                  )}
                </td>
                <td className="border p-2 flex gap-3">
                  {editingId === area.id ? (
                    <button
                      onClick={() => handleSave(area.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <FaRegEdit
                      onClick={() => handleEdit(area.id, area.name)}
                      className="text-blue-500 cursor-pointer"
                    />
                  )}
                  <MdDelete
                    onClick={() => handleDelete(area.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateArea;
