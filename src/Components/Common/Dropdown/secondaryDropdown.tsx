// // // // import React, { useRef, useState } from "react";
// // // // import { AiOutlineDown } from "react-icons/ai";

// // // // interface DropdownProps {
// // // //   label: string;
// // // //   value: string;
// // // //   options: { id: string; name: string }[];
// // // //   onSelect: (value: string ) => void;
// // // // }

// // // // // const SecondaryDropdown: React.FC<DropdownProps> = ({ label, value, options, onSelect }) => {
// // // // //   const [isOpen, setIsOpen] = useState(false);
// // // // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // // // //   const handleClickOutside = (event: MouseEvent) => {
// // // // //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // // // //       setIsOpen(false);
// // // // //     }
// // // // //   };

// // // // //   React.useEffect(() => {
// // // // //     document.addEventListener("mousedown", handleClickOutside);
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // // //   }, []);

// // // // //   return (
// // // // //     <div ref={dropdownRef} className="relative">
// // // // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// // // // //       <button
// // // // //         type="button"
// // // // //         onClick={() => setIsOpen(!isOpen)}
// // // // //         className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
// // // // //       >
// // // // //         <span>{value || `Select ${label.toLowerCase()}`}</span>
// // // // //         <AiOutlineDown className="w-4 h-4 text-gray-500" />
// // // // //       </button>
// // // // //       {isOpen && (
// // // // //         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
// // // // //           {options.map((option) => (
// // // // //             <div
// // // // //               key={option.id}
// // // // //               className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
// // // // //               onClick={() => {
// // // // //                 onSelect(option.name);
// // // // //                 console.log(option.id)
// // // // //                 setIsOpen(false);
// // // // //               }}
// // // // //             >
// // // // //               <span>{option.name}</span>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default SecondaryDropdown;







// // // // const SecondaryDropdown: React.FC<DropdownProps> = ({ label, value, options, onSelect }) => {
// // // //     const [isOpen, setIsOpen] = useState(false);
// // // //     const dropdownRef = useRef<HTMLDivElement>(null);
  
// // // //     const handleClickOutside = (event: MouseEvent) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // // //         setIsOpen(false);
// // // //       }
// // // //     };
  
// // // //     React.useEffect(() => {
// // // //       document.addEventListener("mousedown", handleClickOutside);
// // // //       return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //     }, []);
  
// // // //     return (
// // // //       <div ref={dropdownRef} className="relative">
// // // //         <label className="block text-sm font-medium text-gray-700">{label}</label>
// // // //         <button
// // // //           type="button"
// // // //           onClick={() => setIsOpen(!isOpen)}
// // // //           className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
// // // //         >
// // // //           <span>{value || `Select ${label.toLowerCase()}`}</span>
// // // //           <AiOutlineDown className="w-4 h-4 text-gray-500" />
// // // //         </button>
// // // //         {isOpen && (
// // // //           <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
// // // //             {options.map((option) => (
// // // //               <div
// // // //                 key={option.id}
// // // //                 className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
// // // //                 onClick={() => {
// // // //                   onSelect(option.id); // Send the ID instead of the name
// // // //                   setIsOpen(false);
// // // //                 }}
// // // //               >
// // // //                 <span>{option.name}</span>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     );
// // // //   };


// // // //   export default SecondaryDropdown;












// // // import React, { useState, useRef } from "react";
// // // import { AiOutlineDown } from "react-icons/ai";

// // // interface DropdownProps {
// // //   label: string;
// // //   value: string;
// // //   options: { id: string; name: string }[];
// // //   onSelect: (value: string) => void;
// // //   returnType?: "id" | "name"; // New prop to determine what to return
// // // }

// // // const SecondaryDropdown: React.FC<DropdownProps> = ({
// // //   label,
// // //   value,
// // //   options,
// // //   onSelect,
// // //   returnType = "id", // Default to "id"
// // // }) => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   const handleClickOutside = (event: MouseEvent) => {
// // //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //       setIsOpen(false);
// // //     }
// // //   };

// // //   React.useEffect(() => {
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   return (
// // //     <div ref={dropdownRef} className="relative">
// // //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// // //       <button
// // //         type="button"
// // //         onClick={() => setIsOpen(!isOpen)}
// // //         className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
// // //       >
// // //         <span>{value || `Select ${label.toLowerCase()}`}</span>
// // //         <AiOutlineDown className="w-4 h-4 text-gray-500" />
// // //       </button>
// // //       {isOpen && (
// // //         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
// // //           {options.map((option) => (
// // //             <div
// // //               key={option.id}
// // //               className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
// // //               onClick={() => {
// // //                 // Always display the option.name in the dropdown button text
// // //                 onSelect(returnType === "id" ? option.id : option.name); // Pass ID or name based on returnType
// // //                 setIsOpen(false);
// // //               }}
// // //             >
// // //               <span>{option.name}</span>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default SecondaryDropdown;









// // import React, { useRef, useState } from "react";
// // import { AiOutlineDown } from "react-icons/ai";

// // interface DropdownProps {
// //   label: string;
// //   value: string;
// //   options: { id: string; name: string }[];
// //   onSelect: (value: string) => void;
// // }

// // const SecondaryDropdown: React.FC<DropdownProps> = ({ label, value, options, onSelect }) => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   const handleClickOutside = (event: MouseEvent) => {
// //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //       setIsOpen(false);
// //     }
// //   };

// //   React.useEffect(() => {
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   return (
// //     <div ref={dropdownRef} className="relative">
// //       <label className="block text-sm font-medium text-gray-700">{label}</label>
// //       <button
// //         type="button"
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
// //       >
// //         <span>{value || `Select ${label.toLowerCase()}`}</span>
// //         <AiOutlineDown className="w-4 h-4 text-gray-500" />
// //       </button>
// //       {isOpen && (
// //         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
// //           {options.map((option) => (
// //             <div
// //               key={option.id}
// //               className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
// //               onClick={() => {
// //                 onSelect(option.name); // Always pass option.name
// //                 setIsOpen(false);
// //               }}
// //             >
// //               <span>{option.name}</span>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SecondaryDropdown;










// import React, { useRef, useState } from "react";
// import { AiOutlineDown } from "react-icons/ai";

// interface DropdownProps {
//   label: string;
//   value: string;
//   options: { id: string; name: string }[];
//   onSelect: (value: string) => void;
//   returnType?: "id" | "name"; // Add returnType prop
// }

// const SecondaryDropdown: React.FC<DropdownProps> = ({
//   label,
//   value,
//   options,
//   onSelect,
//   returnType = "id", // Default to returning "id"
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//       setIsOpen(false);
//     }
//   };

//   React.useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Find the display name for the selected value
//   const displayValue = options.find((option) => option.id === value)?.name || value;

//   return (
//     <div ref={dropdownRef} className="relative">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>
//       <button
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//         className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
//       >
//         <span>{displayValue || `Select ${label.toLowerCase()}`}</span>
//         <AiOutlineDown className="w-4 h-4 text-gray-500" />
//       </button>
//       {isOpen && (
//         <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//           {options.map((option) => (
//             <div
//               key={option.id}
//               className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => {
//                 onSelect(returnType === "id" ? option.id : option.name); // Pass id or name based on returnType
//                 setIsOpen(false);
//               }}
//             >
//               <span>{option.name}</span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SecondaryDropdown;







import React, { useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";

interface DropdownProps {
  label: string;
  value: string;
  options: { id: string; name: string }[]; // Ensure options have `id` and `name`
  onSelect: (value: string) => void;
  returnType?: "id" | "name"; // Add returnType prop
}

const SecondaryDropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onSelect,
  returnType = "id", // Default to returning "id"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find the display name for the selected value
  const displayValue = options.find((option) => option.id === value)?.name || value;

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="mt-1 flex items-center justify-between w-full border border-gray-300 rounded-md shadow-sm p-2 text-left bg-white"
      >
        <span>{displayValue || `Select ${label.toLowerCase()}`}</span>
        <AiOutlineDown className="w-4 h-4 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(returnType === "id" ? option.id : option.name); // Pass id or name based on returnType
                setIsOpen(false);
              }}
            >
              <span>{option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SecondaryDropdown;