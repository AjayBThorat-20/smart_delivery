"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../Common/SearchBar/searchBar";
import Table from "../Common/Table/table";
import Pagination from "../Common/Pagination/pagination";
import Modal from "../Common/Modal/modal";
import Filters from "../Common/Filters/filters";
import MessageModal from "../Common/Modal/messageModal";

// Define the Assignment type
interface Assignment {
  id: string;
  orderId: string;
  partnerId: string;
  timestamp: string;
  status: string;
  reason?: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  status: string;
  fromDate?: string; // Make fromDate optional
  toDate?: string;   // Make toDate optional
}

const Assignments = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [filters, setFilters] = useState<Filters>({
    status: searchParams.get("status") || "",
    fromDate: searchParams.get("fromDate") || "",
    toDate: searchParams.get("toDate") || "",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [messageModalTitle, setMessageModalTitle] = useState<string>("");
  const [messageModalMessage, setMessageModalMessage] = useState<string>("");

  // Fetch assignments data
  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filters.status,
        fromDate: filters.fromDate || "", // Ensure fromDate is a string
        toDate: filters.toDate || "",     // Ensure toDate is a string
        search: searchQuery, // Pass searchQuery as a separate parameter
      }).toString();

      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/assignments/assignment-metrics-details?${query}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch assignments");

      const data = await res.json();
      setAssignments(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
      setError("Failed to fetch assignments. Please try again later.");
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
    fetchAssignments(); // Perform search
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on clear search
    fetchAssignments();
  };

  // Apply filters and refresh data
  const applyFilters = (filters: Filters) => {
    setFilters(filters);
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
    fetchAssignments();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: "",
      fromDate: "",
      toDate: "",
    });
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
    fetchAssignments();
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchAssignments();
  };

  // Open modal with assignment details
  const handleMoreClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssignment(null);
  };

  // Fetch assignments on component mount or when filters/pagination change
  useEffect(() => {
    fetchAssignments();
  }, [filters, pagination.page, pagination.limit,]);



  
    useEffect(() => {
      if (searchQuery === "") {
        fetchAssignments();
      }
    }, [searchQuery]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search Bar */}
  
<SearchBar
        placeholder="Search by Order ID or Partner ID"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
        onSearch={handleSearch}
      />

      {/* Filters */}
      {/* <Filters
        filters={filters}
        onResetFilters={resetFilters}
        onApplyFilters={applyFilters}
        includeDateFilters={true}
      /> */}


<Filters
  filters={filters}
  onResetFilters={resetFilters}
  onApplyFilters={applyFilters}
  filterType="assignments"
  statusOptions={[
    { value: "SUCCESS", label: "Success" },
    { value: "FAILED", label: "Failed" },
  ]}
/>

      {/* Table */}
      <Table
        headers={["Order ID", "Partner ID", "Timestamp", "Status", "Reason"]}
        data={assignments.map((assignment) => ({
          ...assignment,
          reason: assignment.reason || "-",
        }))}
        loading={loading}
        onRowClick={handleMoreClick}
      />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Modal for Assignment Details */}
      {isModalOpen && selectedAssignment && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Assignment Details"
        >
          <div className="space-y-4">
            <p><strong>Order ID:</strong> {selectedAssignment.orderId}</p>
            <p><strong>Partner ID:</strong> {selectedAssignment.partnerId}</p>
            <p><strong>Timestamp:</strong> {selectedAssignment.timestamp}</p>
            <p><strong>Status:</strong> {selectedAssignment.status}</p>
            <p><strong>Reason:</strong> {selectedAssignment.reason || "-"}</p>
          </div>
        </Modal>
      )}

      {/* Message Modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        title={messageModalTitle}
        message={messageModalMessage}
      />
    </div>
  );
};

export default Assignments;