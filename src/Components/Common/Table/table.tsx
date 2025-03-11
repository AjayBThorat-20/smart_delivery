// // // "use client"

// // // import React, { useState, useEffect } from "react";
// // // import ConfirmationModal from "../Modal/confirmationModal";

// // // interface TableProps {
// // //   headers: string[];
// // //   data: any[];
// // //   loading: boolean;
// // //   onRowClick?: (row: any) => void;
// // //   onDelete?: (row: any) => void;
// // //   className?: string;
// // // }

// // // const Table: React.FC<TableProps> = ({ headers, data, loading, onRowClick, onDelete, className }) => {
// // //   const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
// // //   const [rowToDelete, setRowToDelete] = useState<any | null>(null);

// // //   const handleDropdownToggle = (rowIndex: number) => {
// // //     setOpenDropdowns((prevState) => ({
// // //       ...prevState,
// // //       [rowIndex]: !prevState[rowIndex],
// // //     }));
// // //   };

// // //   const handleDeleteClick = (row: any) => {
// // //     setRowToDelete(row);
// // //   };

// // //   const handleConfirmDelete = () => {
// // //     if (onDelete && rowToDelete) {
// // //       onDelete(rowToDelete);
// // //     }
// // //     setRowToDelete(null);
// // //   };

// // //   // Close dropdown when clicking outside
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       const dropdowns = document.querySelectorAll(".dropdown-container");
// // //       let isOutside = true;

// // //       dropdowns.forEach((dropdown) => {
// // //         if (dropdown.contains(event.target as Node)) {
// // //           isOutside = false;
// // //         }
// // //       });

// // //       if (isOutside) {
// // //         setOpenDropdowns({}); // Close all dropdowns
// // //       }
// // //     };

// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => {
// // //       document.removeEventListener("mousedown", handleClickOutside);
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
// // //       {loading ? (
// // //         <div className="flex justify-center items-center">
// // //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
// // //         </div>
// // //       ) : data.length === 0 ? (
// // //         <p className="text-center text-gray-500">No data available.</p>
// // //       ) : (
// // //         <div className="overflow-x-auto h-[80vh]">
// // //           <table className="min-w-full divide-y divide-gray-200">
// // //             <thead>
// // //               <tr>
// // //                 {headers.map((header, index) => (
// // //                   <th
// // //                     key={index}
// // //                     className="px-6 py-3 bg-gray-50 text-center text-xs font-bold text-black uppercase tracking-wider"
// // //                   >
// // //                     {header}
// // //                   </th>
// // //                 ))}
// // //                 {(onRowClick || onDelete) && <th className="px-6 py-3 text-xs bg-gray-50">ACTION</th>}
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {data.map((row, rowIndex) => (
// // //                 <React.Fragment key={rowIndex}>
// // //                   <tr>
// // //                     <td colSpan={2} className="p-0">
// // //                       <hr className="border-t border-slate-200" />
// // //                     </td>
// // //                   </tr>
// // //                   <tr>
// // //                     {headers.map((header, index) => {
// // //                       const key = Object.keys(row).find(
// // //                         (k) => k.toLowerCase().replace(/ /g, "") === header.toLowerCase().replace(/ /g, "")
// // //                       );
// // //                       const cellValue = key ? row[key] : "N/A";
// // //                       return (
// // //                         <td key={index} className="px-6 py-4 whitespace-nowrap">
// // //                           {typeof cellValue === "object" ? JSON.stringify(cellValue) : cellValue}
// // //                         </td>
// // //                       );
// // //                     })}
// // //                     {(onRowClick || onDelete) && (
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <div className="relative">
// // //                           <button
// // //                             onClick={() => handleDropdownToggle(rowIndex)}
// // //                             className="text-blue-500 hover:text-blue-700"
// // //                             aria-label={`Actions for ${row.Name || row.id}`}
// // //                           >
// // //                             More
// // //                           </button>
// // //                           {openDropdowns[rowIndex] && (
// // //                             <div className="dropdown-container absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
// // //                               <div className="py-1">
// // //                                 {onRowClick && (
// // //                                   <button
// // //                                     onClick={(e) => {
// // //                                       e.stopPropagation();
// // //                                       console.log("Update button clicked:", row); // Debug log
// // //                                       onRowClick(row);
// // //                                       setOpenDropdowns({}); // Close dropdown after click
// // //                                     }}
// // //                                     className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// // //                                   >
// // //                                     Update
// // //                                   </button>
// // //                                 )}
// // //                                 {onDelete && (
// // //                                   <button
// // //                                     onClick={(e) => {
// // //                                       e.stopPropagation();
// // //                                       console.log("Delete button clicked:", row); // Debug log
// // //                                       handleDeleteClick(row);
// // //                                       setOpenDropdowns({}); // Close dropdown after click
// // //                                     }}
// // //                                     className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
// // //                                   >
// // //                                     Delete
// // //                                   </button>
// // //                                 )}
// // //                               </div>
// // //                             </div>
// // //                           )}
// // //                         </div>
// // //                       </td>
// // //                     )}
// // //                   </tr>
// // //                 </React.Fragment>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}

// // //       {/* Confirmation Modal */}
// // //       {rowToDelete && (
// // //         <ConfirmationModal
// // //           isOpen={!!rowToDelete}
// // //           onClose={() => setRowToDelete(null)}
// // //           onConfirm={handleConfirmDelete}
// // //           title="Confirm Deletion"
// // //           message="Are you sure you want to delete this partner?"
// // //           confirmText="Delete"
// // //           cancelText="Cancel"
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Table;









// // "use client";

// // import React, { useState, useEffect } from "react";
// // import ConfirmationModal from "../Modal/confirmationModal";

// // interface TableProps {
// //   headers: string[];
// //   data: any[];
// //   loading: boolean;
// //   onRowClick?: (row: any) => void;
// //   onDelete?: (row: any) => void;
// //   className?: string;
// // }

// // // Helper function to safely stringify objects
// // const safeStringify = (obj: any): string => {
// //   try {
// //     return JSON.stringify(obj, (key, value) => {
// //       if (typeof value === "object" && value !== null) {
// //         if (key === "Provider" || key === "Consumer") {
// //           return "[Circular]"; // Handle circular references
// //         }
// //       }
// //       return value;
// //     });
// //   } catch (error) {
// //     console.error("Failed to stringify object:", error);
// //     return "[Object]"; // Fallback for objects that cannot be stringified
// //   }
// // };

// // const Table: React.FC<TableProps> = ({ headers, data, loading, onRowClick, onDelete, className }) => {
// //   const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
// //   const [rowToDelete, setRowToDelete] = useState<any | null>(null);

// //   const handleDropdownToggle = (rowIndex: number) => {
// //     setOpenDropdowns((prevState) => ({
// //       ...prevState,
// //       [rowIndex]: !prevState[rowIndex],
// //     }));
// //   };

// //   const handleDeleteClick = (row: any) => {
// //     setRowToDelete(row);
// //   };

// //   const handleConfirmDelete = () => {
// //     if (onDelete && rowToDelete) {
// //       onDelete(rowToDelete);
// //     }
// //     setRowToDelete(null);
// //   };

// //   // Close dropdown when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       const dropdowns = document.querySelectorAll(".dropdown-container");
// //       let isOutside = true;

// //       dropdowns.forEach((dropdown) => {
// //         if (dropdown.contains(event.target as Node)) {
// //           isOutside = false;
// //         }
// //       });

// //       if (isOutside) {
// //         setOpenDropdowns({}); // Close all dropdowns
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, []);

// //   return (
// //     <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
// //       {loading ? (
// //         <div className="flex justify-center items-center">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
// //         </div>
// //       ) : data.length === 0 ? (
// //         <p className="text-center text-gray-500">No data available.</p>
// //       ) : (
// //         <div className="overflow-x-auto h-[80vh]">
// //           <table className="min-w-full divide-y divide-gray-200">
// //             <thead>
// //               <tr>
// //                 {headers.map((header, index) => (
// //                   <th
// //                     key={index}
// //                     className="px-6 py-3 bg-gray-50 text-center text-xs font-bold text-black uppercase tracking-wider"
// //                   >
// //                     {header}
// //                   </th>
// //                 ))}
// //                 {(onRowClick || onDelete) && <th className="px-6 py-3 text-xs bg-gray-50">ACTION</th>}
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {data.map((row, rowIndex) => (
// //                 <React.Fragment key={rowIndex}>
// //                   <tr>
// //                     <td colSpan={2} className="p-0">
// //                       <hr className="border-t border-slate-200" />
// //                     </td>
// //                   </tr>
// //                   <tr>
// //                     {headers.map((header, index) => {
// //                       const key = Object.keys(row).find(
// //                         (k) => k.toLowerCase().replace(/ /g, "") === header.toLowerCase().replace(/ /g, "")
// //                       );
// //                       const cellValue = key ? row[key] : "N/A";
// //                       return (
// //                         <td key={index} className="px-6 py-4 whitespace-nowrap">
// //                           {typeof cellValue === "object" ? safeStringify(cellValue) : cellValue}
// //                         </td>
// //                       );
// //                     })}
// //                     {(onRowClick || onDelete) && (
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="relative">
// //                           <button
// //                             onClick={() => handleDropdownToggle(rowIndex)}
// //                             className="text-blue-500 hover:text-blue-700"
// //                             aria-label={`Actions for ${row.Name || row.id}`}
// //                           >
// //                             More
// //                           </button>
// //                           {openDropdowns[rowIndex] && (
// //                             <div className="dropdown-container absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
// //                               <div className="py-1">
// //                                 {onRowClick && (
// //                                   <button
// //                                     onClick={(e) => {
// //                                       e.stopPropagation();
// //                                       console.log("Update button clicked:", row); // Debug log
// //                                       onRowClick(row);
// //                                       setOpenDropdowns({}); // Close dropdown after click
// //                                     }}
// //                                     className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //                                   >
// //                                     Update
// //                                   </button>
// //                                 )}
// //                                 {onDelete && (
// //                                   <button
// //                                     onClick={(e) => {
// //                                       e.stopPropagation();
// //                                       console.log("Delete button clicked:", row); // Debug log
// //                                       handleDeleteClick(row);
// //                                       setOpenDropdowns({}); // Close dropdown after click
// //                                     }}
// //                                     className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
// //                                   >
// //                                     Delete
// //                                   </button>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </td>
// //                     )}
// //                   </tr>
// //                 </React.Fragment>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Confirmation Modal */}
// //       {rowToDelete && (
// //         <ConfirmationModal
// //           isOpen={!!rowToDelete}
// //           onClose={() => setRowToDelete(null)}
// //           onConfirm={handleConfirmDelete}
// //           title="Confirm Deletion"
// //           message="Are you sure you want to delete this partner?"
// //           confirmText="Delete"
// //           cancelText="Cancel"
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Table;

















// "use client";

// import React, { useState, useEffect } from "react";
// import ConfirmationModal from "../Modal/confirmationModal";

// interface TableProps {
//   headers: string[];
//   data: any[];
//   loading: boolean;
//   onRowClick?: (row: any) => void;
//   onDelete?: (row: any) => void;
//   onView?: (row: any) => void; // Add onView prop for handling view action
//   className?: string;
// }

// // Helper function to safely stringify objects
// const safeStringify = (obj: any): string => {
//   try {
//     return JSON.stringify(obj, (key, value) => {
//       if (typeof value === "object" && value !== null) {
//         if (key === "Provider" || key === "Consumer") {
//           return "[Circular]"; // Handle circular references
//         }
//       }
//       return value;
//     });
//   } catch (error) {
//     console.error("Failed to stringify object:", error);
//     return "[Object]"; // Fallback for objects that cannot be stringified
//   }
// };

// const Table: React.FC<TableProps> = ({
//   headers,
//   data,
//   loading,
//   onRowClick,
//   onDelete,
//   onView, // Add onView prop
//   className,
// }) => {
//   const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
//   const [rowToDelete, setRowToDelete] = useState<any | null>(null);

//   const handleDropdownToggle = (rowIndex: number) => {
//     setOpenDropdowns((prevState) => ({
//       ...prevState,
//       [rowIndex]: !prevState[rowIndex],
//     }));
//   };

//   const handleDeleteClick = (row: any) => {
//     setRowToDelete(row);
//   };

//   const handleConfirmDelete = () => {
//     if (onDelete && rowToDelete) {
//       onDelete(rowToDelete);
//     }
//     setRowToDelete(null);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const dropdowns = document.querySelectorAll(".dropdown-container");
//       let isOutside = true;

//       dropdowns.forEach((dropdown) => {
//         if (dropdown.contains(event.target as Node)) {
//           isOutside = false;
//         }
//       });

//       if (isOutside) {
//         setOpenDropdowns({}); // Close all dropdowns
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//         </div>
//       ) : data.length === 0 ? (
//         <p className="text-center text-gray-500">No data available.</p>
//       ) : (
//         <div className="overflow-x-auto h-[80vh]">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 {headers.map((header, index) => (
//                   <th
//                     key={index}
//                     className="px-6 py-3 bg-gray-50 text-center text-xs font-bold text-black uppercase tracking-wider"
//                   >
//                     {header}
//                   </th>
//                 ))}
//                 {(onRowClick || onDelete || onView) && <th className="px-6 py-3 text-xs bg-gray-50">ACTION</th>}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((row, rowIndex) => (
//                 <React.Fragment key={rowIndex}>
//                   <tr>
//                     <td colSpan={headers.length + 1} className="p-0">
//                       <hr className="border-t border-slate-200" />
//                     </td>
//                   </tr>
//                   <tr>
//                     {headers.map((header, index) => {
//                       const key = Object.keys(row).find(
//                         (k) => k.toLowerCase().replace(/ /g, "") === header.toLowerCase().replace(/ /g, "")
//                       );
//                       const cellValue = key ? row[key] : "N/A";
//                       return (
//                         <td key={index} className="px-6 py-4 whitespace-nowrap">
//                           {typeof cellValue === "object" ? safeStringify(cellValue) : cellValue}
//                         </td>
//                       );
//                     })}
//                     {(onRowClick || onDelete || onView) && (
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="relative">
//                           <button
//                             onClick={() => handleDropdownToggle(rowIndex)}
//                             className="text-blue-500 hover:text-blue-700"
//                             aria-label={`Actions for ${row.Name || row.id}`}
//                           >
//                             More
//                           </button>
//                           {openDropdowns[rowIndex] && (
//                             <div className="dropdown-container absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
//                               <div className="py-1">
//                                 {/* Add View Button */}
//                                 {onView && (
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       console.log("View button clicked:", row); // Debug log
//                                       onView(row);
//                                       setOpenDropdowns({}); // Close dropdown after click
//                                     }}
//                                     className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                   >
//                                     View
//                                   </button>
//                                 )}
//                                 {onRowClick && (
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       console.log("Update button clicked:", row); // Debug log
//                                       onRowClick(row);
//                                       setOpenDropdowns({}); // Close dropdown after click
//                                     }}
//                                     className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                   >
//                                     Update
//                                   </button>
//                                 )}
//                                 {onDelete && (
//                                   <button
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       console.log("Delete button clicked:", row); // Debug log
//                                       handleDeleteClick(row);
//                                       setOpenDropdowns({}); // Close dropdown after click
//                                     }}
//                                     className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
//                                   >
//                                     Delete
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     )}
//                   </tr>
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {rowToDelete && (
//         <ConfirmationModal
//           isOpen={!!rowToDelete}
//           onClose={() => setRowToDelete(null)}
//           onConfirm={handleConfirmDelete}
//           title="Confirm Deletion"
//           message="Are you sure you want to delete this partner?"
//           confirmText="Delete"
//           cancelText="Cancel"
//         />
//       )}
//     </div>
//   );
// };

// export default Table;





"use client";

import React, { useState, useEffect } from "react";
import ConfirmationModal from "../Modal/confirmationModal";

interface TableProps {
  headers: string[];
  data: any[];
  loading: boolean;
  onRowClick?: (row: any) => void;
  onDelete?: (row: any) => void;
  onView?: (row: any) => void; // Add onView prop for handling view action
  className?: string;
}

// Helper function to safely stringify objects
const safeStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (key === "Provider" || key === "Consumer") {
          return "[Circular]"; // Handle circular references
        }
      }
      return value;
    });
  } catch (error) {
    console.error("Failed to stringify object:", error);
    return "[Object]"; // Fallback for objects that cannot be stringified
  }
};

const Table: React.FC<TableProps> = ({
  headers,
  data,
  loading,
  onRowClick,
  onDelete,
  onView, // Add onView prop
  className,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
  const [rowToDelete, setRowToDelete] = useState<any | null>(null);

  const handleDropdownToggle = (rowIndex: number) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [rowIndex]: !prevState[rowIndex],
    }));
  };

  const handleDeleteClick = (row: any) => {
    setRowToDelete(row);
  };

  const handleConfirmDelete = () => {
    if (onDelete && rowToDelete) {
      onDelete(rowToDelete);
    }
    setRowToDelete(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdowns = document.querySelectorAll(".dropdown-container");
      let isOutside = true;

      dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target as Node)) {
          isOutside = false;
        }
      });

      if (isOutside) {
        setOpenDropdowns({}); // Close all dropdowns
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <div className="overflow-x-auto h-[80vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 bg-gray-50 text-center text-xs font-bold text-black uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                {(onRowClick || onDelete || onView) && <th className="px-6 py-3 text-xs bg-gray-50">ACTION</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr>
                    <td colSpan={headers.length + 1} className="p-0">
                      <hr className="border-t border-slate-200" />
                    </td>
                  </tr>
                  <tr>
                    {headers.map((header, index) => {
                      const key = Object.keys(row).find(
                        (k) => k.toLowerCase().replace(/ /g, "") === header.toLowerCase().replace(/ /g, "")
                      );
                      const cellValue = key ? row[key] : "N/A";
                      return (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          {typeof cellValue === "object" ? safeStringify(cellValue) : cellValue}
                        </td>
                      );
                    })}
                    {(onRowClick || onDelete || onView) && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="relative">
                          <button
                            onClick={() => handleDropdownToggle(rowIndex)}
                            className="text-blue-500 hover:text-blue-700"
                            aria-label={`Actions for ${row.Name || row.id}`}
                          >
                            More
                          </button>
                          {openDropdowns[rowIndex] && (
                            <div className="dropdown-container absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                              <div className="py-1">
                                {/* Add View Button */}
                                {onView && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("View button clicked:", row); // Debug log
                                      onView(row);
                                      setOpenDropdowns({}); // Close dropdown after click
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    View
                                  </button>
                                )}
                                {onRowClick && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Update button clicked:", row); // Debug log
                                      onRowClick(row);
                                      setOpenDropdowns({}); // Close dropdown after click
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Update
                                  </button>
                                )}
                                {onDelete && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log("Delete button clicked:", row); // Debug log
                                      handleDeleteClick(row);
                                      setOpenDropdowns({}); // Close dropdown after click
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {rowToDelete && (
        <ConfirmationModal
          isOpen={!!rowToDelete}
          onClose={() => setRowToDelete(null)}
          onConfirm={handleConfirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this partner?"
          confirmText="Delete"
          cancelText="Cancel"
        />
      )}
    </div>
  );
};

export default Table;