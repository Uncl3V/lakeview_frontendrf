"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config";
import {
  Search,
  Filter,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Download,
} from "lucide-react";

interface Booking {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  totalAmount: number;
  service?: { name: string };
  pricingPlan?: { name: string };
  createdAt: string;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchTerm, statusFilter]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch(API_ENDPOINTS.adminBookings, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch bookings");

      const data = await res.json();
      setBookings(data.data.bookings);
      setFilteredBookings(data.data.bookings);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.phone.includes(searchTerm)
      );
    }

    // Status filter
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch(
        API_ENDPOINTS.adminBookingStatus(bookingId.toString()),
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update status");

      // Refresh bookings
      await fetchBookings();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update booking status");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Bookings Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and track all patient bookings
          </p>
        </div>
        <button className="bg-[#00BCD4] text-white px-4 py-2 rounded-lg hover:bg-[#00ACC1] transition flex items-center space-x-2">
          <Download size={18} />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
          <span>Total: {filteredBookings.length} bookings</span>
          <span className="text-yellow-600">
            Pending: {bookings.filter((b) => b.status === "PENDING").length}
          </span>
          <span className="text-green-600">
            Confirmed:{" "}
            {bookings.filter((b) => b.status === "CONFIRMED").length}
          </span>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Appointment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {booking.service?.name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.pricingPlan?.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {new Date(booking.appointmentDate).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.appointmentTime}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : booking.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ₦{booking.totalAmount?.toLocaleString() || "0"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowModal(true);
                      }}
                      className="text-[#00BCD4] hover:text-[#00ACC1] flex items-center space-x-1"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Booking Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Patient Name
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedBooking.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900 mt-1">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p className="text-gray-900 mt-1">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedBooking.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Appointment Date
                    </label>
                    <p className="text-gray-900 mt-1">
                      {new Date(
                        selectedBooking.appointmentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Appointment Time
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedBooking.appointmentTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Service
                    </label>
                    <p className="text-gray-900 mt-1">
                      {selectedBooking.service?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Amount
                    </label>
                    <p className="text-gray-900 mt-1 font-semibold">
                      ₦{selectedBooking.totalAmount?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-6">
                  <label className="text-sm font-medium text-gray-500 block mb-3">
                    Update Status
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedBooking.status !== "CONFIRMED" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, "CONFIRMED")
                        }
                        className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                      >
                        <CheckCircle size={18} />
                        <span>Confirm</span>
                      </button>
                    )}
                    {selectedBooking.status !== "COMPLETED" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, "COMPLETED")
                        }
                        className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        <CheckCircle size={18} />
                        <span>Complete</span>
                      </button>
                    )}
                    {selectedBooking.status !== "CANCELLED" && (
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, "CANCELLED")
                        }
                        className="flex items-center justify-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <XCircle size={18} />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
