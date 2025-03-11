import React from "react";
import { IoMdCloseCircle, IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  placeholder: string;
  searchQuery: string;
  onSearchChange: (value: string) => void; // Handles input change
  onClearSearch: () => void; // Clears the search query
  onSearch: () => void; // Triggers the search
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  searchQuery,
  onSearchChange,
  onClearSearch,
  onSearch,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="flex flex-wrap items-center gap-2 relative">
        <div className="absolute left-3 text-gray-400 top-3">
          <IoMdSearch size={20} />
        </div>

        <div className="md:flex-1 relative">
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />

          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <IoMdCloseCircle size={20} />
            </button>
          )}
        </div>

        <button
          onClick={onSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;