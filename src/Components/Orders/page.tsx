// // // "use client";

// // // import React, { useState, useEffect } from "react";
// // // import { useRouter, useSearchParams } from "next/navigation";
// // // import SearchBar from "../Common/SearchBar/searchBar";
// // // import Table from "../Common/Table/table";
// // // import Pagination from "../Common/Pagination/pagination";
// // // import CreateOrder from "./createOrder";
// // // import MessageModal from "../Common/Modal/messageModal";
// // // import Filters from "../Common/Filters/filters";
// // // import UpdateOrderModal from "./updateOrderModal";

// // // interface Order {
// // //   id?: string;
// // //   ordernumber?: string;
// // //   customer: {
// // //     name: string;
// // //     phone: string;
// // //     address: string;
// // //   };
// // //   area: string;
// // //   status: string;
// // //   scheduledFor: string;
// // //   assignedTo: string | null;
// // //   totalAmount: number;
// // //   items: {
// // //     name: string;
// // //     quantity: number;
// // //     price: number;
// // //   }[];
// // // }

// // // interface Pagination {
// // //   page: number;
// // //   limit: number;
// // //   total: number;
// // //   totalPages: number;
// // // }

// // // interface Filters {
// // //   status: string;
// // //   area?: string;
// // //   assignedTo?: string;
// // // }

// // // const Orders = () => {
// // //   const router = useRouter();
// // //   const searchParams = useSearchParams();
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   const [pagination, setPagination] = useState<Pagination>({
// // //     page: 1,
// // //     limit: 10,
// // //     total: 0,
// // //     totalPages: 1,
// // //   });
// // //   const [filters, setFilters] = useState<Filters>({
// // //     status: searchParams.get("status") || "",
// // //     area: searchParams.get("area") || "",
// // //     assignedTo: searchParams.get("assignedTo") || "",
// // //   });
// // //   const [searchQuery, setSearchQuery] = useState<string>("");
// // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
// // //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
// // //   const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
// // //   const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
// // //   const [messageModalTitle, setMessageModalTitle] = useState<string>("");
// // //   const [messageModalMessage, setMessageModalMessage] = useState<string>("");
// // //   const [newOrder, setNewOrder] = useState<Order>({
// // //     id: "",
// // //     ordernumber: "",
// // //     customer: {
// // //       name: "",
// // //       phone: "",
// // //       address: "",
// // //     },
// // //     area: "",
// // //     status: "PENDING",
// // //     scheduledFor: "",
// // //     assignedTo: null,
// // //     totalAmount: 0,
// // //     items: [],
// // //   });

// // //   // Fetch orders when filters, pagination, or search query changes
// // //   useEffect(() => {
// // //     fetchOrders();
// // //   }, [filters, pagination.page, pagination.limit, searchQuery]);

// // //   // Clear error message when filters, pagination, or search query changes
// // //   useEffect(() => {
// // //     setError(null);
// // //   }, [filters, pagination.page, pagination.limit, searchQuery]);

// // //   useEffect(() => {
// // //     if (searchQuery === "") {
// // //       fetchOrders();
// // //     }
// // //   }, [searchQuery]); // Add searchQuery as a dependency

// // //   // Sync URL search params with filters state
// // //   useEffect(() => {
// // //     const params = new URLSearchParams();
// // //     if (filters.status) params.set("status", filters.status);
// // //     if (filters.area) params.set("area", filters.area);
// // //     if (filters.assignedTo) params.set("assignedTo", filters.assignedTo);
// // //     router.replace(`?${params.toString()}`);
// // //   }, [filters]);

// // //   // Automatically close the message modal after 3 seconds
// // //   useEffect(() => {
// // //     if (isMessageModalOpen) {
// // //       const timer = setTimeout(() => {
// // //         setIsMessageModalOpen(false);
// // //       }, 3000);
// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [isMessageModalOpen]);

// // //   const fetchOrders = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       const queryParams = new URLSearchParams({
// // //         page: pagination.page.toString(),
// // //         limit: pagination.limit.toString(),
// // //         status: filters.status,
// // //         area: filters.area || "",
// // //       });

// // //       // Add search functionality for OrderNumber, Customer, and AssignedTo
// // //       if (searchQuery) {
// // //         queryParams.append("search", searchQuery);
// // //       }

// // //       console.log("Fetching orders with query params:", queryParams.toString());

// // //       const apiUrl = `${
// // //         process.env.NEXT_PUBLIC_BACKEND_API
// // //       }/orders?${queryParams.toString()}`;
// // //       const res = await fetch(apiUrl);
// // //       if (!res.ok) throw new Error("Failed to fetch orders");

// // //       const data = await res.json();
// // //       console.log("Received data:", data);

// // //       const transformedOrders = data.data.map((order: any) => ({
// // //         id: order.id,
// // //         ordernumber: order.orderNumber,
// // //         customer: {
// // //           name: order.customer.name,
// // //           phone: order.customer.phone,
// // //           address: order.customer.address,
// // //         },
// // //         area: order.area.name,
// // //         status: order.status,
// // //         scheduledFor: order.scheduledFor,
// // //         assignedTo: order.deliveryPartner?.name || null,
// // //         totalAmount: order.totalAmount,
// // //         items: order.items.map((item: any) => ({
// // //           name: item.name,
// // //           quantity: item.quantity,
// // //           price: item.price,
// // //         })),
// // //       }));

// // //       setOrders(transformedOrders);
// // //       setPagination(
// // //         data.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 }
// // //       );
// // //     } catch (error) {
// // //       console.error("Failed to fetch orders:", error);
// // //       setError("Failed to fetch orders. Please try again later.");
// // //       setOrders([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };
// // //   // const handleSearch = () => {
// // //   //   setPagination((prev) => ({ ...prev, page: 1 }));
// // //   //   fetchOrders();
// // //   // };

// // //   const handleClearSearch = () => {
// // //     setSearchQuery("");
// // //     setPagination((prev) => ({ ...prev, page: 1 }));
// // //     fetchOrders();
// // //   };

// // //   const applyFilters = (filters: Filters) => {
// // //     setFilters(filters);
// // //     setPagination((prev) => ({ ...prev, page: 1 }));
// // //     fetchOrders();
// // //   };

// // //   const handleSearch = () => {
// // //     setPagination((prev) => ({ ...prev, page: 1 }));
// // //     fetchOrders();
// // //   };

// // //   const resetFilters = () => {
// // //     setFilters({ status: "", area: "", assignedTo: "" });
// // //     setPagination((prev) => ({ ...prev, page: 1 }));
// // //     fetchOrders();
// // //   };

// // //   const handlePageChange = (page: number) => {
// // //     setPagination((prev) => ({ ...prev, page }));
// // //     fetchOrders();
// // //   };

// // //   const handleCreateOrder = async (newOrder: Order) => {
// // //     try {
// // //       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/orders`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(newOrder),
// // //       });

// // //       if (!res.ok) {
// // //         const errorData = await res.json();
// // //         throw new Error(errorData.message || "Failed to create order");
// // //       }

// // //       const data = await res.json();
// // //       setIsCreateModalOpen(false);
// // //       fetchOrders();
// // //       setNewOrder({
// // //         id: "",
// // //         ordernumber: "",
// // //         customer: {
// // //           name: "",
// // //           phone: "",
// // //           address: "",
// // //         },
// // //         area: "",
// // //         status: "PENDING",
// // //         scheduledFor: "",
// // //         assignedTo: null,
// // //         totalAmount: 0,
// // //         items: [],
// // //       });
// // //     } catch (error) {
// // //       console.error("Error creating order:", error);
// // //       setError("Failed to create order. Please check the data and try again.");
// // //     }
// // //   };

// // //   const handleUpdateOrder = async (updatedOrder: Order) => {
// // //     try {
// // //       const res = await fetch(
// // //         `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${updatedOrder.id}/status`,
// // //         {
// // //           method: "PUT",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify({ status: updatedOrder.status }),
// // //         }
// // //       );

// // //       if (!res.ok) {
// // //         const errorData = await res.json();
// // //         throw new Error(errorData.error || "Failed to update order");
// // //       }

// // //       const data = await res.json();
// // //       setIsUpdateModalOpen(false);
// // //       fetchOrders();
// // //     } catch (error) {
// // //       console.error("Error updating order:", error);
// // //       setError("Failed to update order. Please try again later.");
// // //     }
// // //   };

// // //   const handleDeleteOrder = async (order: Order) => {
// // //     try {
// // //       const res = await fetch(
// // //         `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${order.id}`,
// // //         {
// // //           method: "DELETE",
// // //         }
// // //       );

// // //       if (!res.ok) throw new Error("Failed to delete order");

// // //       fetchOrders();
// // //     } catch (error) {
// // //       console.error("Error deleting order:", error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 bg-gray-100 min-h-screen">
// // //       <h1 className="text-2xl font-bold mb-6">Orders</h1>

// // //       {error && (
// // //         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
// // //           {error}
// // //         </div>
// // //       )}

// // <button
// //   onClick={() => setIsCreateModalOpen(true)}
// //   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
// // >
// //   Create Order
// // </button>

// // //       <SearchBar
// // //          placeholder="Search by Order Number, Customer Name, or Assigned To"
// // //         searchQuery={searchQuery}
// // //         onSearchChange={setSearchQuery}
// // //         onClearSearch={handleClearSearch}
// // //         onSearch={handleSearch}
// // //       />

// // //       <Filters
// // //         filters={filters}
// // //         onResetFilters={resetFilters}
// // //         onApplyFilters={applyFilters}
// // //         filterType="orders"
// // //         statusOptions={[
// // //           { value: "PENDING", label: "Pending" },
// // //           { value: "ASSIGNED", label: "Assigned" },
// // //           { value: "PICKED", label: "Picked" },
// // //           { value: "DELIVERED", label: "Delivered" },
// // //         ]}
// // //       />

// // //       <Table
// // //         headers={[
// // //           "Order Number",
// // //           "Customer",
// // //           "Area",
// // //           "Status",
// // //           "Scheduled For",
// // //           "Assigned To",
// // //           "Total Amount",
// // //         ]}
// // //         data={orders.map((order) => ({
// // //           ...order,
// // //           ordernumber: order.ordernumber,
// // //           customer: order.customer.name,
// // //           area: order.area,
// // //           assignedTo: order.assignedTo || "N/A",
// // //           totalAmount: `$${order.totalAmount.toFixed(2)}`,
// // //         }))}
// // //         loading={loading}
// // //         onRowClick={(order) => {
// // //           setOrderToUpdate(order);
// // //           setIsUpdateModalOpen(true);
// // //         }}
// // //         onDelete={handleDeleteOrder}
// // //       />

// // //       <Pagination
// // //         currentPage={pagination.page}
// // //         totalPages={pagination.totalPages}
// // //         onPageChange={handlePageChange}
// // //       />

// // //       {isCreateModalOpen && (
// // //         <CreateOrder
// // //           onClose={() => setIsCreateModalOpen(false)}
// // //           onCreateOrder={handleCreateOrder}
// // //           newOrder={newOrder}
// // //           setNewOrder={setNewOrder}
// // //         />
// // //       )}

// // //       {isUpdateModalOpen && (
// // //         <UpdateOrderModal
// // //           // isOpen={isUpdateModalOpen}
// // //           onClose={() => setIsUpdateModalOpen(false)}
// // //           order={orderToUpdate}
// // //           onUpdateOrder={handleUpdateOrder}
// // //         />
// // //       )}

// // //       <MessageModal
// // //         isOpen={isMessageModalOpen}
// // //         onClose={() => setIsMessageModalOpen(false)}
// // //         title={messageModalTitle}
// // //         message={messageModalMessage}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Orders;

// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import SearchBar from "../Common/SearchBar/searchBar";
// // import Table from "../Common/Table/table";
// // import Pagination from "../Common/Pagination/pagination";
// // import CreateOrder from "./createOrder";
// // import MessageModal from "../Common/Modal/messageModal";
// // import Filters from "../Common/Filters/filters";
// // import UpdateOrderModal from "./updateOrderModal";

// // interface Order {
// //   id?: string;
// //   ordernumber?: string;
// //   customer: {
// //     name: string;
// //     phone: string;
// //     address: string;
// //   };
// //   area: string;
// //   status: string;
// //   scheduledFor: string;
// //   assignedTo: string | null;
// //   totalAmount: number;
// //   items: {
// //     name: string;
// //     quantity: number;
// //     price: number;
// //   }[];
// //   deliveryPartner?: {
// //     name: string;
// //     metrics?: {
// //       rating: number;
// //     };
// //   };
// // }

// // interface Pagination {
// //   page: number;
// //   limit: number;
// //   total: number;
// //   totalPages: number;
// // }

// // interface Filters {
// //   status: string;
// //   area?: string;
// //   assignedTo?: string;
// //   minRating?: number; // New filter for performance metrics
// // }

// // const Orders = () => {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [pagination, setPagination] = useState<Pagination>({
// //     page: 1,
// //     limit: 10,
// //     total: 0,
// //     totalPages: 1,
// //   });
// //   const [filters, setFilters] = useState<Filters>({
// //     status: searchParams.get("status") || "",
// //     area: searchParams.get("area") || "",
// //     assignedTo: searchParams.get("assignedTo") || "",
// //     minRating: Number(searchParams.get("minRating")) || undefined, // New filter
// //   });
// //   const [searchQuery, setSearchQuery] = useState<string>("");
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
// //   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
// //   const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
// //   const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
// //   const [messageModalTitle, setMessageModalTitle] = useState<string>("");
// //   const [messageModalMessage, setMessageModalMessage] = useState<string>("");
// //   const [newOrder, setNewOrder] = useState<Order>({
// //     id: "",
// //     ordernumber: "",
// //     customer: {
// //       name: "",
// //       phone: "",
// //       address: "",
// //     },
// //     area: "",
// //     status: "PENDING",
// //     scheduledFor: "",
// //     assignedTo: null,
// //     totalAmount: 0,
// //     items: [],
// //   });

// //   // Fetch orders when filters, pagination, or search query changes
// //   useEffect(() => {
// //     fetchOrders();
// //   }, [filters, pagination.page, pagination.limit, searchQuery]);

// //   const fetchOrders = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const queryParams = new URLSearchParams({
// //         page: pagination.page.toString(),
// //         limit: pagination.limit.toString(),
// //         status: filters.status,
// //         area: filters.area || "",
// //         assignedTo: filters.assignedTo || "",
// //         minRating: filters.minRating?.toString() || "", // Add minRating filter
// //       });

// //       if (searchQuery) queryParams.append("search", searchQuery);

// //       const apiUrl = `${
// //         process.env.NEXT_PUBLIC_BACKEND_API
// //       }/orders?${queryParams.toString()}`;
// //       const res = await fetch(apiUrl);
// //       if (!res.ok) throw new Error("Failed to fetch orders");

// //       const data = await res.json();
// //       const transformedOrders = data.data.map((order: any) => ({
// //         id: order.id,
// //         ordernumber: order.orderNumber,
// //         customer: {
// //           name: order.customer.name,
// //           phone: order.customer.phone,
// //           address: order.customer.address,
// //         },
// //         area: order.area.name,
// //         status: order.status,
// //         scheduledFor: order.scheduledFor,
// //         assignedTo: order.deliveryPartner?.name || null,
// //         totalAmount: order.totalAmount,
// //         items: order.items.map((item: any) => ({
// //           name: item.name,
// //           quantity: item.quantity,
// //           price: item.price,
// //         })),
// //         deliveryPartner: order.deliveryPartner, // Include delivery partner details
// //       }));

// //       setOrders(transformedOrders);
// //       setPagination(data.pagination);
// //     } catch (error) {
// //       console.error("Failed to fetch orders:", error);
// //       setError("Failed to fetch orders. Please try again later.");
// //       setOrders([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = () => {
// //     setPagination((prev) => ({ ...prev, page: 1 }));
// //     fetchOrders();
// //   };

// //   const applyFilters = (filters: Filters) => {
// //     setFilters(filters);
// //     setPagination((prev) => ({ ...prev, page: 1 }));
// //     fetchOrders();
// //   };

// //   const resetFilters = () => {
// //     setFilters({ status: "", area: "", assignedTo: "", minRating: undefined });
// //     setPagination((prev) => ({ ...prev, page: 1 }));
// //     fetchOrders();
// //   };

// //   return (
// //     <div className="p-6 bg-gray-100 min-h-screen">
// //       <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

// //       {/* Summary Section */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-lg font-semibold">Total Orders</h3>
// //           <p className="text-2xl">{pagination.total}</p>
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-lg font-semibold">Pending Orders</h3>
// //           <p className="text-2xl">
// //             {orders.filter((order) => order.status === "PENDING").length}
// //           </p>
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-lg font-semibold">Delivered Orders</h3>
// //           <p className="text-2xl">
// //             {orders.filter((order) => order.status === "DELIVERED").length}
// //           </p>
// //         </div>
// //         <div className="bg-white p-4 rounded-lg shadow">
// //           <h3 className="text-lg font-semibold">Avg. Partner Rating</h3>
// //           <p className="text-2xl">
// //             {(
// //               orders.reduce((sum, order) => sum + (order.deliveryPartner?.metrics?.rating || 0), 0) /
// //               orders.length || 0
// //             ).toFixed(1)}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Filters and Search */}
// //       <Filters
// //         filters={filters}
// //         onResetFilters={resetFilters}
// //         onApplyFilters={applyFilters}
// //         filterType="orders"
// //         statusOptions={[
// //           { value: "PENDING", label: "Pending" },
// //           { value: "ASSIGNED", label: "Assigned" },
// //           { value: "PICKED", label: "Picked" },
// //           { value: "DELIVERED", label: "Delivered" },
// //         ]}
// //         minRatingOptions={[
// //           { value: "4", label: "Rating > 4" },
// //           { value: "3", label: "Rating > 3" },
// //         ]}
// //       />

// //       {/* Table */}
// //       <Table
// //         headers={[
// //           "Order Number",
// //           "Customer",
// //           "Area",
// //           "Status",
// //           "Scheduled For",
// //           "Assigned To",
// //           "Partner Rating",
// //           "Total Amount",
// //         ]}
// //         data={orders.map((order) => ({
// //           ...order,
// //           ordernumber: order.ordernumber,
// //           customer: order.customer.name,
// //           area: order.area,
// //           status: (
// //             <span className={`px-2 py-1 rounded text-sm ${
// //               order.status === "PENDING"
// //                 ? "bg-yellow-100 text-yellow-800"
// //                 : order.status === "DELIVERED"
// //                 ? "bg-green-100 text-green-800"
// //                 : "bg-blue-100 text-blue-800"
// //             }`}>
// //               {order.status}
// //             </span>
// //           ),
// //           assignedTo: order.assignedTo || "N/A",
// //           partnerRating: order.deliveryPartner?.metrics?.rating?.toFixed(1) || "N/A",
// //           totalAmount: `$${order.totalAmount.toFixed(2)}`,
// //         }))}
// //         loading={loading}
// //         onRowClick={(order) => {
// //           setOrderToUpdate(order);
// //           setIsUpdateModalOpen(true);
// //         }}
// //       />

// //       {/* Pagination */}
// //       <Pagination
// //         currentPage={pagination.page}
// //         totalPages={pagination.totalPages}
// //         onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
// //       />
// //     </div>
// //   );
// // };

// // export default Orders;

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import SearchBar from "../Common/SearchBar/searchBar";
// import Table from "../Common/Table/table";
// import Pagination from "../Common/Pagination/pagination";
// import CreateOrder from "./createOrder";
// import MessageModal from "../Common/Modal/messageModal";
// import Filters from "../Common/Filters/filters";
// import UpdateOrderModal from "./updateOrderModal";
// import OrderInfo from "./components/orderInfo";

// interface Order {
//   id?: string;
//   ordernumber?: string;
//   customer: {
//     name: string;
//     phone: string;
//     address: string;
//   };
//   area: string;
//   status: string;
//   scheduledFor: string;
//   assignedTo: string | null;
//   totalAmount: number;
//   items: {
//     name: string;
//     quantity: number;
//     price: number;
//   }[];
//   deliveryPartner?: {
//     name: string;
//     metrics?: {
//       rating: number;
//     };
//   };
// }

// interface Pagination {
//   page: number;
//   limit: number;
//   total: number;
//   totalPages: number;
// }

// interface Filters {
//   status: string;
//   area?: string;
//   assignedTo?: string;
//   minRating?: number; // New filter for performance metrics
// }

// const Orders = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [pagination, setPagination] = useState<Pagination>({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 1,
//   });
//   const [filters, setFilters] = useState<Filters>({
//     status: searchParams.get("status") || "",
//     area: searchParams.get("area") || "",
//     assignedTo: searchParams.get("assignedTo") || "",
//     minRating: Number(searchParams.get("minRating")) || undefined, // New filter
//   });
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
//   const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
//   const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
//   const [messageModalTitle, setMessageModalTitle] = useState<string>("");
//   const [messageModalMessage, setMessageModalMessage] = useState<string>("");
//   const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
//   const [newOrder, setNewOrder] = useState<Order>({
//     id: "",
//     ordernumber: "",
//     customer: {
//       name: "",
//       phone: "",
//       address: "",
//     },
//     area: "",
//     status: "PENDING",
//     scheduledFor: "",
//     assignedTo: null,
//     totalAmount: 0,
//     items: [],
//   });

//   // Fetch orders when filters, pagination, or search query changes
//   useEffect(() => {
//     fetchOrders();
//   }, [filters, pagination.page, pagination.limit]);

//   useEffect(() => {
//     if (searchQuery === "") {
//       fetchOrders();
//     }
//   }, [searchQuery]);

//   const fetchOrders = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const queryParams = new URLSearchParams({
//         page: pagination.page.toString(),
//         limit: pagination.limit.toString(),
//         status: filters.status,
//         area: filters.area || "",
//         assignedTo: filters.assignedTo || "",
//         minRating: filters.minRating?.toString() || "", // Add minRating filter
//       });

//       if (searchQuery) queryParams.append("search", searchQuery);

//       const apiUrl = `${
//         process.env.NEXT_PUBLIC_BACKEND_API
//       }/orders?${queryParams.toString()}`;
//       const res = await fetch(apiUrl);
//       if (!res.ok) throw new Error("Failed to fetch orders");

//       const data = await res.json();
//       console.log("line no 812 : ", data);
//       const transformedOrders = data.data.map((order: any) => ({
//         id: order.id,
//         ordernumber: order.orderNumber,
//         customer: {
//           name: order.customer.name,
//           phone: order.customer.phone,
//           address: order.customer.address,
//         },
//         area: order.area.name,
//         status: order.status,
//         scheduledFor: order.scheduledFor,
//         assignedTo: order.deliveryPartner?.name || null,
//         totalAmount: order.totalAmount,
//         items: order.items.map((item: any) => ({
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         deliveryPartner: order.deliveryPartner, // Include delivery partner details
//       }));

//       setOrders(transformedOrders);
//       setPagination(data.pagination);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//       setError("Failed to fetch orders. Please try again later.");
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchOrders();
//   };

//   const applyFilters = (filters: Filters) => {
//     setFilters(filters);
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchOrders();
//   };

//   const resetFilters = () => {
//     setFilters({ status: "", area: "", assignedTo: "", minRating: undefined });
//     setPagination((prev) => ({ ...prev, page: 1 }));
//     fetchOrders();
//   };

//   const handlePageChange = (page: number) => {
//     setPagination((prev) => ({ ...prev, page }));
//     fetchOrders();
//   };

//   const handleCreateOrder = async (newOrder: Order) => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newOrder),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to create order");
//       }

//       const data = await res.json();
//       setIsCreateModalOpen(false);
//       fetchOrders();
//       setNewOrder({
//         id: "",
//         ordernumber: "",
//         customer: {
//           name: "",
//           phone: "",
//           address: "",
//         },
//         area: "",
//         status: "PENDING",
//         scheduledFor: "",
//         assignedTo: null,
//         totalAmount: 0,
//         items: [],
//       });
//       setMessageModalTitle("Success");
//       setMessageModalMessage("Order created successfully.");
//       setIsMessageModalOpen(true);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       setError("Failed to create order. Please check the data and try again.");
//       setMessageModalTitle("Error");
//       setMessageModalMessage("Failed to create order. Please try again.");
//       setIsMessageModalOpen(true);
//     }
//   };

//   const handleUpdateOrder = async (updatedOrder: Order) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${updatedOrder.id}/status`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: updatedOrder.status }),
//         }
//       );

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.error || "Failed to update order");
//       }

//       const data = await res.json();
//       setIsUpdateModalOpen(false);
//       fetchOrders();
//       setMessageModalTitle("Success");
//       setMessageModalMessage("Order updated successfully.");
//       setIsMessageModalOpen(true);
//     } catch (error) {
//       console.error("Error updating order:", error);
//       setError("Failed to update order. Please try again later.");
//       setMessageModalTitle("Error");
//       setMessageModalMessage("Failed to update order. Please try again.");
//       setIsMessageModalOpen(true);
//     }
//   };

//   const handleDeleteOrder = async (order: Order) => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${order.id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!res.ok) throw new Error("Failed to delete order");

//       fetchOrders();
//       setMessageModalTitle("Success");
//       setMessageModalMessage("Order deleted successfully.");
//       setIsMessageModalOpen(true);
//     } catch (error) {
//       console.error("Error deleting order:", error);
//       setError("Failed to delete order. Please try again later.");
//       setMessageModalTitle("Error");
//       setMessageModalMessage("Failed to delete order. Please try again.");
//       setIsMessageModalOpen(true);
//     }
//   };

//   useEffect(() => {
//     console.log("Selected Order ID:", selectedOrderId); // Debug log
//   }, [selectedOrderId]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

//       {/* Summary Section */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">Total Orders</h3>
//           <p className="text-2xl">{pagination.total}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">Pending Orders</h3>
//           <p className="text-2xl">
//             {orders.filter((order) => order.status === "PENDING").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">Delivered Orders</h3>
//           <p className="text-2xl">
//             {orders.filter((order) => order.status === "DELIVERED").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h3 className="text-lg font-semibold">Avg. Partner Rating</h3>
//           <p className="text-2xl">
//             {(
//               orders.reduce(
//                 (sum, order) =>
//                   sum + (order.deliveryPartner?.metrics?.rating || 0),
//                 0
//               ) / orders.length || 0
//             ).toFixed(1)}
//           </p>
//         </div>
//       </div>

//       <button
//         onClick={() => setIsCreateModalOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
//       >
//         Create Order
//       </button>

//       {/* Filters and Search */}
//       <SearchBar
//         placeholder="Search by Order Number, Customer Name, or Assigned To"
//         searchQuery={searchQuery}
//         onSearchChange={setSearchQuery}
//         onClearSearch={() => {
//           setSearchQuery("");
//           setPagination((prev) => ({ ...prev, page: 1 }));
//           fetchOrders();
//         }}
//         onSearch={handleSearch}
//       />

//       <Filters
//         filters={filters}
//         onResetFilters={resetFilters}
//         onApplyFilters={applyFilters}
//         filterType="orders"
//         statusOptions={[
//           { value: "PENDING", label: "Pending" },
//           { value: "ASSIGNED", label: "Assigned" },
//           { value: "PICKED", label: "Picked" },
//           { value: "DELIVERED", label: "Delivered" },
//         ]}
//         minRatingOptions={[
//           { value: "4", label: "Rating > 4" },
//           { value: "3", label: "Rating > 3" },
//         ]}
//       />

//       <Table
//         headers={[
//           "Order Number",
//           "Customer",
//           "Area",
//           "Status",
//           "Scheduled For",
//           "Assigned To",
//           "Partner Rating",
//           "Total Amount",
//         ]}
//         data={orders.map((order) => ({
//           ...order,
//           ordernumber: order.ordernumber,
//           customer: order.customer.name,
//           area: order.area,
//           status: order.status, // Ensure this is a string
//           scheduledFor: order.scheduledFor,
//           assignedTo: order.assignedTo || "N/A",
//           partnerRating:
//             order.deliveryPartner?.metrics?.rating?.toFixed(1) || "N/A",
//           totalAmount: `$${order.totalAmount.toFixed(2)}`,
//         }))}
//         loading={loading}
//         onRowClick={(order) => {
//           setOrderToUpdate(order);
//           setIsUpdateModalOpen(true);
//         }}
//         onDelete={handleDeleteOrder}
//         onView={(order) => {
//           console.log("View button clicked, setting selectedOrderId:", order.id); // Debug log
//           setSelectedOrderId(order.id); // Open the OrderInfo modal
//         }}
//       />

//       {/* Pagination */}
//       <Pagination
//         currentPage={pagination.page}
//         totalPages={pagination.totalPages}
//         onPageChange={handlePageChange}
//       />

//       {/* Create Order Modal */}
//       {isCreateModalOpen && (
//         <CreateOrder
//           onClose={() => setIsCreateModalOpen(false)}
//           onCreateOrder={handleCreateOrder}
//           newOrder={newOrder}
//           setNewOrder={setNewOrder}
//         />
//       )}

//       {/* Update Order Modal */}
//       {isUpdateModalOpen && (
//         <UpdateOrderModal
//           onClose={() => setIsUpdateModalOpen(false)}
//           order={orderToUpdate}
//           onUpdateOrder={handleUpdateOrder}
//         />
//       )}

//       {/* Order Info Modal */}
//       {selectedOrderId && (
//         <OrderInfo
//           orderId={selectedOrderId}
//           onClose={() => setSelectedOrderId(null)}
//         />
//       )}

//       {/* Message Modal */}
//       <MessageModal
//         isOpen={isMessageModalOpen}
//         onClose={() => setIsMessageModalOpen(false)}
//         title={messageModalTitle}
//         message={messageModalMessage}
//       />
//     </div>
//   );
// };

// export default Orders;










"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "../Common/SearchBar/searchBar";
import Table from "../Common/Table/table";
import Pagination from "../Common/Pagination/pagination";
import CreateOrder from "./createOrder";
import MessageModal from "../Common/Modal/messageModal";
import Filters from "../Common/Filters/filters";
import UpdateOrderModal from "./updateOrderModal";
import OrderInfo from "./components/orderInfo";

interface Order {
  id?: string;
  ordernumber?: string;
  customer: {
    name: string;
    phone: string;
    address: string;
  };
  area: string;
  status: string;
  scheduledFor: string;
  assignedTo: string | null;
  totalAmount: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  deliveryPartner?: {
    name: string;
    metrics?: {
      rating: number;
    };
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  status: string;
  area?: string;
  assignedTo?: string;
  minRating?: number; // New filter for performance metrics
}

const Orders = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
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
    area: searchParams.get("area") || "",
    assignedTo: searchParams.get("assignedTo") || "",
    minRating: Number(searchParams.get("minRating")) || undefined, // New filter
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [orderToUpdate, setOrderToUpdate] = useState<Order | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [messageModalTitle, setMessageModalTitle] = useState<string>("");
  const [messageModalMessage, setMessageModalMessage] = useState<string>("");
  const [isOrderInfo, setOrderInfo] = useState<string | null>(null);
  const [newOrder, setNewOrder] = useState<Order>({
    id: "",
    ordernumber: "",
    customer: {
      name: "",
      phone: "",
      address: "",
    },
    area: "",
    status: "PENDING",
    scheduledFor: "",
    assignedTo: null,
    totalAmount: 0,
    items: [],
  });

  // Fetch orders when filters, pagination, or search query changes
  useEffect(() => {
    fetchOrders();
  }, [filters, pagination.page, pagination.limit]);

  useEffect(() => {
    if (searchQuery === "") {
      fetchOrders();
    }
  }, [searchQuery]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        status: filters.status,
        area: filters.area || "",
        assignedTo: filters.assignedTo || "",
        minRating: filters.minRating?.toString() || "", // Add minRating filter
      });

      if (searchQuery) queryParams.append("search", searchQuery);

      const apiUrl = `${
        process.env.NEXT_PUBLIC_BACKEND_API
      }/orders?${queryParams.toString()}`;
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      console.log("line no 812 : ", data);
      const transformedOrders = data.data.map((order: any) => ({
        id: order.id,
        ordernumber: order.orderNumber,
        customer: {
          name: order.customer.name,
          phone: order.customer.phone,
          address: order.customer.address,
        },
        area: order.area.name,
        status: order.status,
        scheduledFor: order.scheduledFor,
        assignedTo: order.deliveryPartner?.name || null,
        totalAmount: order.totalAmount,
        items: order.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        deliveryPartner: order.deliveryPartner, // Include delivery partner details
      }));

      setOrders(transformedOrders);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError("Failed to fetch orders. Please try again later.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchOrders();
  };

  const applyFilters = (filters: Filters) => {
    setFilters(filters);
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchOrders();
  };

  const resetFilters = () => {
    setFilters({ status: "", area: "", assignedTo: "", minRating: undefined });
    setPagination((prev) => ({ ...prev, page: 1 }));
    fetchOrders();
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
    fetchOrders();
  };

  const handleCreateOrder = async (newOrder: Order) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const data = await res.json();
      setIsCreateModalOpen(false);
      fetchOrders();
      setNewOrder({
        id: "",
        ordernumber: "",
        customer: {
          name: "",
          phone: "",
          address: "",
        },
        area: "",
        status: "PENDING",
        scheduledFor: "",
        assignedTo: null,
        totalAmount: 0,
        items: [],
      });
      setMessageModalTitle("Success");
      setMessageModalMessage("Order created successfully.");
      setIsMessageModalOpen(true);
    } catch (error) {
      console.error("Error creating order:", error);
      setError("Failed to create order. Please check the data and try again.");
      setMessageModalTitle("Error");
      setMessageModalMessage("Failed to create order. Please try again.");
      setIsMessageModalOpen(true);
    }
  };

  const handleUpdateOrder = async (updatedOrder: Order) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/orders/${updatedOrder.id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: updatedOrder.status }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update order");
      }

      const data = await res.json();
      setIsUpdateModalOpen(false);
      fetchOrders();
      setMessageModalTitle("Success");
      setMessageModalMessage("Order updated successfully.");
      setIsMessageModalOpen(true);
    } catch (error) {
      console.error("Error updating order:", error);
      setError("Failed to update order. Please try again later.");
      setMessageModalTitle("Error");
      setMessageModalMessage("Failed to update order. Please try again.");
      setIsMessageModalOpen(true);
    }
  };

  useEffect(() => {
    console.log("Selected Order ID:", isOrderInfo); // Debug log
  }, [isOrderInfo]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Orders Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl">{pagination.total}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-2xl">
            {orders.filter((order) => order.status === "PENDING").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Delivered Orders</h3>
          <p className="text-2xl">
            {orders.filter((order) => order.status === "DELIVERED").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Avg. Partner Rating</h3>
          <p className="text-2xl">
            {(
              orders.reduce(
                (sum, order) =>
                  sum + (order.deliveryPartner?.metrics?.rating || 0),
                0
              ) / orders.length || 0
            ).toFixed(1)}
          </p>
        </div>
      </div>

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Create Order
      </button>

      {/* Filters and Search */}
      <SearchBar
        placeholder="Search by Order Number, Customer Name, or Assigned To"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearSearch={() => {
          setSearchQuery("");
          setPagination((prev) => ({ ...prev, page: 1 }));
          fetchOrders();
        }}
        onSearch={handleSearch}
      />

      <Filters
        filters={filters}
        onResetFilters={resetFilters}
        onApplyFilters={applyFilters}
        filterType="orders"
        statusOptions={[
          { value: "PENDING", label: "Pending" },
          { value: "ASSIGNED", label: "Assigned" },
          { value: "PICKED", label: "Picked" },
          { value: "DELIVERED", label: "Delivered" },
        ]}
        minRatingOptions={[
          { value: "4", label: "Rating > 4" },
          { value: "3", label: "Rating > 3" },
        ]}
      />

      <Table
        headers={[
          "Order Number",
          "Customer",
          "Area",
          "Status",
          "Scheduled For",
          "Assigned To",
          "Partner Rating",
          "Total Amount",
        ]}
        data={orders.map((order) => ({
          ...order,
          ordernumber: order.ordernumber,
          customer: order.customer.name,
          area: order.area,
          status: order.status, // Ensure this is a string
          scheduledFor: order.scheduledFor,
          assignedTo: order.assignedTo || "N/A",
          partnerRating:
            order.deliveryPartner?.metrics?.rating?.toFixed(1) || "N/A",
          totalAmount: `$${order.totalAmount.toFixed(2)}`,
        }))}
        loading={loading}
        onRowClick={(order) => {
          setOrderToUpdate(order);
          setIsUpdateModalOpen(true);
        }}
        onView={(order) => {
          console.log("View button clicked, setting setOrderInfo:", order.id); // Debug log
          setOrderInfo(order.id); // Open the OrderInfo modal
        }}
      />

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />

      {/* Create Order Modal */}
      {isCreateModalOpen && (
        <CreateOrder
          onClose={() => setIsCreateModalOpen(false)}
          onCreateOrder={handleCreateOrder}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
        />
      )}

      {/* Update Order Modal */}
      {isUpdateModalOpen && (
        <UpdateOrderModal
          onClose={() => setIsUpdateModalOpen(false)}
          order={orderToUpdate}
          onUpdateOrder={handleUpdateOrder}
        />
      )}

      {/* Order Info Modal */}
      {isOrderInfo && (
        <OrderInfo
          id={isOrderInfo}
          onClose={() => setOrderInfo(null)}
        />
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

export default Orders;