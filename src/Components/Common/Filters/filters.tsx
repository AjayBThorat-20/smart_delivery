// import React, { useEffect, useState } from "react";

import { useEffect, useState } from "react";

// interface FiltersProps {
//   filters: {
//     status: string;
//     fromDate?: string;
//     toDate?: string;
//     area?: string;
//   };
//   onResetFilters: () => void;
//   onApplyFilters: (filters: {
//     status: string;
//     fromDate?: string;
//     toDate?: string;
//   }) => void;
//   filterType: "assignments" | "partners" | "orders"; // Add filterType prop
//   statusOptions: { value: string; label: string }[]; // Pass status options as props
// }

// const Filters: React.FC<FiltersProps> = ({
//   filters: initialFilters,
//   onResetFilters,
//   onApplyFilters,
//   filterType,
//   statusOptions,
// }) => {
//   // Local state to manage filter values
//   const [localFilters, setLocalFilters] = useState(initialFilters);
//   const [areas, setAreas] = useState<{ id: string; name: string }[]>([]); // State for areas

//   // Fetch areas and delivery partners on component mount
//   useEffect(() => {
//     const fetchAreas = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BACKEND_API}/areas`
//         );
//         const data = await response.json();
//         setAreas(data);
//       } catch (error) {
//         console.error("Failed to fetch areas:", error);
//       }
//     };
//     fetchAreas();
//   }, []);

//   // Handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;
//     setLocalFilters((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle reset filters
//   const handleResetFilters = () => {
//     setLocalFilters({ status: "", fromDate: "", toDate: "", area: "" }); // Reset local filters
//     onResetFilters(); // Call parent reset handler
//   };

//   // Handle apply filters
//   const handleApplyFilters = () => {
//     onApplyFilters(localFilters); // Pass local filters to parent
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {/* Render status filter */}
//         <div className="lg:col-span-1">
//           <label className="block text-sm font-medium text-gray-700">
//             Status
//           </label>
//           <select
//             name="status"
//             value={localFilters.status}
//             onChange={handleInputChange}
//             className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">All</option>
//             {statusOptions.map((option) => (
//               <option key={option.value} value={option.value}>
//                 {option.label}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Render date filters based on filterType */}
//         {filterType === "assignments" && (
//           <>
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 From Date
//               </label>
//               <input
//                 type="date"
//                 name="fromDate"
//                 value={localFilters.fromDate || ""}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 To Date
//               </label>
//               <input
//                 type="date"
//                 name="toDate"
//                 value={localFilters.toDate || ""}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               />
//             </div>
//           </>
//         )}

//         {filterType === "orders" && (
//           <>
//             <div className="lg:col-span-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Area
//               </label>
//               <select
//                 name="area"
//                 value={localFilters.area || ""}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="">All</option>
//                 {areas.map((area) => (
//                   <option key={area.id} value={area.id}>
//                     {area.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </>
//         )}

//         {/* Render reset and apply buttons */}
//         <div className="lg:col-span-1 flex items-end space-x-2">
//           <button
//             onClick={handleResetFilters}
//             className="w-fit lg:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//           >
//             Reset
//           </button>
//           <button
//             onClick={handleApplyFilters}
//             className="w-fit lg:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//           >
//             Apply
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filters;













interface FiltersProps {
  filters: {
    status: string;
    fromDate?: string;
    toDate?: string;
    area?: string;
    minRating?: number; // Add minRating to filters
  };
  onResetFilters: () => void;
  onApplyFilters: (filters: {
    status: string;
    fromDate?: string;
    toDate?: string;
    area?: string;
    minRating?: number; // Add minRating to onApplyFilters
  }) => void;
  filterType: "assignments" | "partners" | "orders";
  statusOptions: { value: string; label: string }[];
  minRatingOptions?: { value: string; label: string }[]; // Add minRatingOptions prop
}



const Filters: React.FC<FiltersProps> = ({
  filters: initialFilters,
  onResetFilters,
  onApplyFilters,
  filterType,
  statusOptions,
  minRatingOptions, // Add minRatingOptions prop
}) => {
  const [localFilters, setLocalFilters] = useState(initialFilters);
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/areas`
        );
        const data = await response.json();
        setAreas(data);
      } catch (error) {
        console.error("Failed to fetch areas:", error);
      }
    };
    fetchAreas();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setLocalFilters({ status: "", fromDate: "", toDate: "", area: "", minRating: undefined });
    onResetFilters();
  };

  const handleApplyFilters = () => {
    onApplyFilters(localFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            value={localFilters.status}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filters */}
        {filterType === "assignments" && (
          <>
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="fromDate"
                value={localFilters.fromDate || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="toDate"
                value={localFilters.toDate || ""}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}

        {/* Area Filter */}
        {filterType === "orders" && (
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <select
              name="area"
              value={localFilters.area || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Minimum Rating Filter */}
        {filterType === "orders" && minRatingOptions && (
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Min Rating
            </label>
            <select
              name="minRating"
              value={localFilters.minRating || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">All</option>
              {minRatingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset and Apply Buttons */}
        <div className="lg:col-span-1 flex items-end space-x-2">
          <button
            onClick={handleResetFilters}
            className="w-fit lg:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="w-fit lg:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;