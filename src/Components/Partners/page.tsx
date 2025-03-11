"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../Common/SearchBar/searchBar";
import Table from "../Common/Table/table";
import Pagination from "../Common/Pagination/pagination";
import CreatePartner from "./createPartner";
import UpdatePartner from "./updatePartner";
import AreaModal from "./area";
import MessageModal from "../Common/Modal/messageModal";
import Filters from "../Common/Filters/filters";

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  currentLoad: number;
  areas: string[];
  shift: {
    start: string;
    end: string;
  };
  metrics: {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
  };
  orders: {
    id: string;
    orderNumber: string;
    status: string;
  }[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  status: string;
}


const PartnersPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [partners, setPartners] = useState<Partner[]>([]);
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
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [partnerToUpdate, setPartnerToUpdate] = useState<Partner | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [messageModalTitle, setMessageModalTitle] = useState<string>("");
  const [messageModalMessage, setMessageModalMessage] = useState<string>("");

  const [newPartner, setNewPartner] = useState<Partner>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "ACTIVE",
    currentLoad: 0,
    areas: [],
    shift: { start: "", end: "" },
    metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 },
    orders: [],
  });

  const fetchPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filters.status,
      });
  
      // Only add the search parameter if searchQuery is not empty
      if (searchQuery) {
        queryParams.append("search", searchQuery);
      }
  
      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/partners?${queryParams.toString()}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch partners");
  
      const data = await res.json();
      setPartners(data.data || []);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (error) {
      console.error("Failed to fetch partners:", error);
      setError("Failed to fetch partners. Please try again later.");
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on new search
    fetchPartners(); // Perform search
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page on clear search
    fetchPartners();
  };



  const applyFilters = (filters: { status: string; fromDate?: string; toDate?: string }) => {
    setFilters(filters); // Update filters state
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
    fetchPartners(); // Fetch data with new filters
  };
  
  const resetFilters = () => {
    setFilters({ status: "" }); // Reset filters state
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset to first page
    fetchPartners(); // Fetch data without filters
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchPartners();
  };


  const handleCreatePartner = async () => {
    try {
      const formattedAreas = newPartner.areas.map((area) => ({
        area: {
          connectOrCreate: {
            where: { name: area },
            create: { name: area },
          },
        },
      }));
  
      const partnerData = {
        ...newPartner,
        areas: formattedAreas,
        shift: newPartner.shift.start && newPartner.shift.end ? newPartner.shift : undefined,
        metrics: newPartner.metrics.rating ? newPartner.metrics : undefined,
      };
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partnerData),
      });
  
      if (!res.ok) throw new Error("Failed to create partner");
  
      const data = await res.json();
      setIsCreateModalOpen(false);
      fetchPartners(); // Refresh the list of partners
  
      // Reset the newPartner state
      setNewPartner({
        id: "",
        name: "",
        email: "",
        phone: "",
        status: "ACTIVE",
        currentLoad: 0,
        areas: [],
        shift: { start: "", end: "" },
        metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 },
        orders: [],
      });
    } catch (error) {
      console.error("Error creating partner:", error);
    }
  };

  // Handle updating a partner
  const handleUpdatePartner = async (updatedPartner: Partner) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/partners/${updatedPartner.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPartner),
      });

      if (!res.ok) throw new Error("Failed to update partner");

      const data = await res.json();
      setIsUpdateModalOpen(false);
      fetchPartners(); // Refresh the list of partners
    } catch (error) {
      console.error("Error updating partner:", error);
    }
  };

  // Handle deleting a partner
  const handleDeletePartner = async (partner: Partner) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/partners/${partner.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete partner");

      fetchPartners(); // Refresh the list of partners
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  // Fetch partners on component mount or when filters/pagination change
  useEffect(() => {
    fetchPartners();
  }, [filters, pagination.page, pagination.limit ]); // Removed searchQuery from dependencies

  useEffect(() => {
    if (searchQuery === "") {
      fetchPartners();
    }
  }, [searchQuery]); // Add searchQuery as a dependency
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Delivery Partners</h1>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Partner Button */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Partner
        </button>
        <button
          onClick={() => setIsAreaModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Manage Areas
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar
        placeholder="Search by Name, Email, or Area"
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
  includeDateFilters={false} 
/> */}


<Filters
  filters={filters}
  onResetFilters={resetFilters}
  onApplyFilters={applyFilters}
  filterType="partners"
  statusOptions={[
    { value: "ACTIVE", label: "Active" },
    { value: "INACTIVE", label: "Inactive" },
  ]}
/>

      {/* Table */}
      <Table
        headers={["Name", "Email", "Phone", "Status", "Current Load", "Areas", "Shift", "Metrics"]}
        data={partners.map((partner) => ({
          ...partner,
          areas: partner.areas.map((area: any) => area?.area?.name).join(", "),
          shift: partner.shift ? `${partner.shift.start} - ${partner.shift.end}` : "N/A",
          metrics: `Rating: ${partner.metrics.rating}, Completed: ${partner.metrics.completedOrders}, Cancelled: ${partner.metrics.cancelledOrders}`,
        }))}
        loading={loading}
        onRowClick={(partner) => {
          setPartnerToUpdate(partner);
          setIsUpdateModalOpen(true);
        }}
        onDelete={handleDeletePartner}
      />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Create Partner Modal */}
      {isCreateModalOpen && (
        <CreatePartner
          onClose={() => setIsCreateModalOpen(false)}
          onCreatePartner={handleCreatePartner}
          newPartner={newPartner}
          setNewPartner={setNewPartner}
        />
      )}

      {/* Update Partner Modal */}
      {isUpdateModalOpen && partnerToUpdate && (
        <UpdatePartner
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdatePartner={handleUpdatePartner}
          partner={partnerToUpdate}
        />
      )}

      {/* Area Modal */}
      {isAreaModalOpen && (
        <AreaModal isOpen={isAreaModalOpen} onClose={() => setIsAreaModalOpen(false)} />
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

export default PartnersPage;

