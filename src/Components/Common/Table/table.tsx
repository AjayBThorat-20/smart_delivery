import React from "react";

interface TableProps {
  headers: string[];
  data: any[];
  loading: boolean;
  onRowClick?: (row: any) => void;
}

const Table: React.FC<TableProps> = ({ headers, data, loading, onRowClick }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
                {onRowClick && (
                  <th className="px-6 py-3 bg-gray-50"></th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((cell: any, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
                  {onRowClick && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => onRowClick(row)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        More
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;