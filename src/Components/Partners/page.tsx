"use client";

import React, { useState, useEffect, SetStateAction } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../Common/SearchBar/searchBar";
import Table from "../Common/Table/table";
import Pagination from "../Common/Pagination/pagination";
import Modal from "../Common/Modal/modal";
import Filters from "../Common/Filters/fliters";
import CreatePartner from "./createPartner";
// import CreateArea from "./CreateArea";
import AreaModal from "./area";

interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  currentLoad: number;
  areas: string[]; // Ensure areas is an array of strings
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
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isCreateAreaModalOpen, setIsCreateAreaModalOpen] = useState<boolean>(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState<boolean>(false);
  const [newPartner, setNewPartner] = useState<Partner>({
    id: "",
    name: "",
    email: "",
    phone: "",
    status: "ACTIVE", // Default status
    currentLoad: 0,
    areas: [], // Array of strings
    shift: { start: "", end: "" }, // Shift object
    metrics: { rating: 0, completedOrders: 0, cancelledOrders: 0 }, // Metrics object
    orders: [],
  });


  // Fetch partners data
  const fetchPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filters.status,
        search: searchQuery,
      }).toString();

      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API}/partners?${query}`;
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

  // Handle search
  const handleSearch = () => {
    fetchPartners();
  };

  // Clear search query
  const handleClearSearch = () => {
    setSearchQuery("");
    fetchPartners();
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
    router.push(`/partners?${query}`);
    fetchPartners();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ status: "" });
    setSearchQuery("");
    router.push("/partners");
    fetchPartners();
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    const query = new URLSearchParams({
      ...filters,
      page: page.toString(),
    }).toString();
    router.push(`/partners?${query}`);
    fetchPartners();
  };

  // Open modal with partner details
  const handleMoreClick = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPartner(null);
  };

  // Handle form submission for creating a new partner
  const handleCreatePartner = async () => {
    try {
      // Ensure correct area format
      const formattedAreas = newPartner.areas.map((area) => ({
        area: {
          connectOrCreate: {
            where: { name: area }, 
            create: { name: area } 
          }
        }
      }));
  
      const partnerData = {
        ...newPartner,
        areas: formattedAreas, // ✅ Fix: Sending correct format
        shift: newPartner.shift.start && newPartner.shift.end ? newPartner.shift : undefined,
        metrics: newPartner.metrics.rating ? newPartner.metrics : undefined,
      };
  
      console.log("Sending data to API:", partnerData); // ✅ Debugging log
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/partners`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partnerData),
      });
  
      console.log("API Response Status:", res.status); // ✅ Debugging log
  
      const responseText = await res.text(); // Read raw response
      console.log("API Response Body:", responseText); // ✅ Debugging log
  
      if (!res.ok) {
        throw new Error(`Failed to create partner. Status: ${res.status} - ${responseText}`);
      }
  
      const data = JSON.parse(responseText);
      console.log("Partner created successfully:", data);
  
      setIsCreateModalOpen(false);
      fetchPartners(); // Refresh the list of partners
    } catch (error) {
      console.error("Error creating partner:", error);
    }
  };
  
  


   // ✅ Create new area function
   const handleCreateArea = async (name: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/areas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        throw new Error("Failed to create area");
      }

      const data = await res.json();
      console.log("Area created successfully:", data);

      setIsCreateAreaModalOpen(false); // Close modal after creation
    } catch (error) {
      console.error("Error creating area:", error);
    }
  };
  

  // Fetch partners on component mount or when filters/search/pagination change
  useEffect(() => {
    fetchPartners();
  }, [filters, searchQuery, pagination.page, pagination.limit]);

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
      {/* Buttons for Creating Partner & Area */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Partner
        </button>

        <button onClick={() => setIsAreaModalOpen(true)} className="bg-green-500 text-white px-4 py-2 rounded">
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
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        onApplyFilters={applyFilters}
      />

      {/* Table */}
      <Table
        headers={["Name", "Email", "Phone", "Status", "Current Load", "Areas", "Shift", "Metrics"]}
        data={partners.map((partner) => ({
          ...partner,
          areas: partner.areas.join(", "),
          shift: partner.shift ? `${partner.shift.start} - ${partner.shift.end}` : "N/A",
          metrics: `Rating: ${partner.metrics.rating}, Completed: ${partner.metrics.completedOrders}, Cancelled: ${partner.metrics.cancelledOrders}`,
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

      {/* Partner Details Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Partner Details">
        {selectedPartner ? (
          <>
            <p><strong>Name:</strong> {selectedPartner.name}</p>
            <p><strong>Email:</strong> {selectedPartner.email}</p>
            <p><strong>Phone:</strong> {selectedPartner.phone}</p>
            <p><strong>Status:</strong> {selectedPartner.status}</p>
            <p><strong>Current Load:</strong> {selectedPartner.currentLoad}</p>
            <p><strong>Areas:</strong> {selectedPartner.areas.join(", ")}</p>
            <p><strong>Shift:</strong> {selectedPartner.shift ? `${selectedPartner.shift.start} - ${selectedPartner.shift.end}` : "N/A"}</p>
            <p><strong>Metrics:</strong> Rating: {selectedPartner.metrics.rating}, Completed: {selectedPartner.metrics.completedOrders}, Cancelled: {selectedPartner.metrics.cancelledOrders}</p>
          </>
        ) : (
          <p>No partner selected.</p>
        )}
      </Modal>


      {isCreateModalOpen && (
  <CreatePartner
    onClose={() => setIsCreateModalOpen(false)}
    onCreatePartner={handleCreatePartner}
    newPartner={newPartner}
    setNewPartner={(value: SetStateAction<Partner>) => {
      if (typeof value === "function") {
        // If value is a function (e.g., (prevState) => newState), call it with the previous state
        setNewPartner(value);
      } else {
        // If value is a partial object, merge it with the previous state
        setNewPartner((prevState) => ({
          ...prevState,
          ...value,
          areas: Array.isArray(value?.areas)
            ? value.areas.map((area: string) => area.trim())
            : prevState.areas,
          orders: value?.orders ?? prevState.orders,
        }));
      }
    }}
  />
)}



{/* {isCreateAreaModalOpen && <CreateArea onClose={() => setIsCreateAreaModalOpen(false)} onCreateArea={handleCreateArea} />} */}

{isAreaModalOpen && 
<AreaModal isOpen={isAreaModalOpen} onClose={() => setIsAreaModalOpen(false)} />}
    </div>
  );
};

export default PartnersPage;