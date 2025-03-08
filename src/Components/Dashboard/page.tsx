"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import "ol/ol.css";

// Define Types
type Metrics = {
  totalAssigned: number;
  successRate: number;
};

type Partner = {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE";
};

type Order = {
  id: string;
  status: "PENDING" | "ASSIGNED" | "PICKED" | "DELIVERED";
  location: { lat: number; lng: number };
};

type Assignment = {
  orderId: string;
  partnerId: string;
  timestamp: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    totalAssigned: 0,
    successRate: 0,
  });
  const [partners, setPartners] = useState<Partner[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement | null>(null);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metricsRes, partnersRes, ordersRes, assignmentsRes] =
          await Promise.all([
            axios.get<Metrics>(`${API_BASE_URL}/assignments/metrics`),
            axios.get<Partner[]>(`${API_BASE_URL}/partners/available`),
            axios.get<Order[]>(`${API_BASE_URL}/orders/active`),
            axios.get(`${API_BASE_URL}/assignments/recent-assignments`),
          ]);

        // Set metrics, partners, and orders
        setMetrics(metricsRes.data);
        setPartners(partnersRes.data || []); // Fallback to empty array if undefined
        setOrders(ordersRes.data || []); // Fallback to empty array if undefined

        // Handle assignments response
        const assignmentsData = assignmentsRes.data;
        if (Array.isArray(assignmentsData)) {
          setAssignments(assignmentsData);
        } else if (
          assignmentsData &&
          Array.isArray(assignmentsData.assignments)
        ) {
          // If assignments are nested under a property
          setAssignments(assignmentsData.assignments);
        } else {
          console.error("Assignments data is not an array:", assignmentsData);
          setAssignments([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || !orders) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([72.8777, 19.076]), // Default center (Mumbai)
        zoom: 12,
      }),
    });

    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    // Add markers for orders
    orders.forEach((order) => {
      const marker = new Feature({
        geometry: new Point(
          fromLonLat([order.location.lng, order.location.lat])
        ),
      });
      marker.setStyle(
        new Style({
          image: new Icon({
            src: "https://openlayers.org/en/latest/examples/data/icon.png",
            scale: 0.5,
          }),
        })
      );
      vectorSource.addFeature(marker);
    });

    return () => map.setTarget(undefined);
  }, [orders]);

  return (
    <div className="mx-auto p-6 text-black">
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-slate-100 p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Total Assignments</h2>
              <p className="text-2xl font-bold">{metrics.totalAssigned ?? 0}</p>
            </div>
            <div className="bg-slate-100 p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Success Rate</h2>
              <p className="text-2xl font-bold">{metrics.successRate ?? 0}%</p>
            </div>
            <div className="bg-slate-100 p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Available Partners</h2>
              <p className="text-2xl font-bold">
                {partners.filter((p) => p.status === "ACTIVE").length}
              </p>
            </div>
            <div className="bg-slate-100 p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold">Active Orders</h2>
              <p className="text-2xl font-bold">
                {orders.filter((o) => o.status !== "DELIVERED").length}
              </p>
            </div>
          </div>

          {/* Map and Partner/Assignments Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Active Orders Map (60% width on the left) */}
            <div className="w-full md:w-[60%] bg-slate-100 p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-4">
                📍 Active Orders Map
              </h2>
              <div ref={mapRef} style={{ width: "100%", height: "600px" }} />
            </div>

            {/* Partner Availability and Recent Assignments (40% width on the right) */}
            <div className="w-full md:w-[40%] space-y-6">
              {/* Partner Availability */}
              <div className="bg-slate-100 p-4 shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  ✅ Partner Availability
                </h2>
                {partners.length > 0 ? (
                  <ul>
                    {partners.map((partner) => (
                      <li key={partner.id} className="border-b py-2">
                        {partner.name} -{" "}
                        <span
                          className={
                            partner.status === "ACTIVE"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {partner.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No partner available.</p>
                )}
              </div>

              {/* Recent Assignments */}
              <div className="bg-slate-100 p-4 shadow rounded-lg">
                <h2 className="text-lg font-semibold mb-4">
                  📌 Recent Assignments
                </h2>
                {assignments.length > 0 ? (
                  <ul>
                    {assignments.slice(0, 5).map((assignment) => (
                      <li key={assignment.orderId} className="border-b py-2">
                        Order <b>{assignment.orderId}</b> → Partner{" "}
                        <b>{assignment.partnerId}</b> at{" "}
                        {new Date(assignment.timestamp).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recent assignments found.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
