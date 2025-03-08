import React from "react";

interface FiltersProps {
  filters: {
    status: string;
    fromDate?: string;
    toDate?: string;
  };
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  onResetFilters: () => void;
  onApplyFilters: () => void;
  includeDateFilters?: boolean;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
  includeDateFilters = false,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={onFilterChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">All</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        {includeDateFilters && (
          <>
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={onFilterChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={onFilterChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </>
        )}
        <div className="lg:col-span-1 flex items-end space-x-2">
          <button
            onClick={onResetFilters}
            className="w-fit lg:w-auto px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={onApplyFilters}
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