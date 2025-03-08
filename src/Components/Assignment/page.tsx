"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../Common/SearchBar/searchBar";
import Filters from "../Common/Filters/fliters";
import Table from "../Common/Table/table";
import Pagination from "../Common/Pagination/pagination";
import Modal from "../Common/Modal/modal";

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
  fromDate: string;
  toDate: string;
  orderId: string;
  partnerId: string;
}

const Assignments = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
    orderId: searchParams.get("orderId") || "",
    partnerId: searchParams.get("partnerId") || "",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch assignments data
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filters.status,
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        orderId: filters.orderId,
        partnerId: filters.partnerId,
        search: searchQuery,
      }).toString();

      // Use the environment variable for the API endpoint
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/assignments/assignment-metrics-details?${query}`;
      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch assignments");
      }
      const data = await res.json();
      console.log(data); // Debugging

      setAssignments(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    fetchAssignments();
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
    fetchAssignments();
  };

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters and refresh data
  const applyFilters = () => {
    const query = new URLSearchParams({
      ...filters,
      page: "1",
    }).toString();
    router.push(`/assignments?${query}`);
    fetchAssignments();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      status: "",
      fromDate: "",
      toDate: "",
      orderId: "",
      partnerId: "",
    });
    setSearchQuery("");
    router.push("/assignments");
    fetchAssignments();
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const query = new URLSearchParams({
      ...filters,
      page: page.toString(),
    }).toString();
    router.push(`/assignments?${query}`);
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

  // Fetch assignments on component mount or when filters/search/pagination change
  useEffect(() => {
    fetchAssignments();
  }, [filters, searchQuery, pagination.page, pagination.limit]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search by Order ID or Partner ID"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={handleClearSearch}
        onSearch={handleSearch}
      />

      {/* Filters */}
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        onApplyFilters={applyFilters}
        includeDateFilters={true}
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

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Assignment Details">
        {selectedAssignment ? (
          <>
            <p><strong>Order ID:</strong> {selectedAssignment.orderId}</p>
            <p><strong>Partner ID:</strong> {selectedAssignment.partnerId}</p>
            <p><strong>Timestamp:</strong> {selectedAssignment.timestamp}</p>
            <p><strong>Status:</strong> {selectedAssignment.status}</p>
            <p><strong>Reason:</strong> {selectedAssignment.reason || "-"}</p>
          </>
        ) : (
          <p>No assignment selected.</p>
        )}
      </Modal>
    </div>
  );
};

export default Assignments;