"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config";
import {
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  status: string;
  createdAt: string;
  preferredDateTime?: string;
  pricingPlan?: {
    title: string;
    price: string;
  };
}

interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  todayBookings: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  monthlyRevenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      // Fetch dashboard stats
      const statsRes = await fetch(API_ENDPOINTS.adminDashboard, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!statsRes.ok) throw new Error("Failed to fetch stats");

      const statsData = (await statsRes.json()) as {
        data: {
            bookings: {
            total: number;
            pending: number;
            confirmed: number;
            completed: number;
            };
            payments: {
            totalRevenue: number;
            completed: number;
            };
        };
        };

      
      // Transform backend data to match frontend interface
      const transformedStats = {
        totalBookings: statsData.data.bookings.total,
        totalRevenue: statsData.data.payments.totalRevenue,
        totalUsers: 0, // Not available from dashboard endpoint
        pendingBookings: statsData.data.bookings.pending,
        confirmedBookings: statsData.data.bookings.confirmed,
        completedBookings: statsData.data.bookings.completed,
        cancelledBookings: 0, // Not in dashboard response
        todayBookings: 0, // Not in dashboard response
        successfulPayments: statsData.data.payments.completed,
        pendingPayments: 0, // Not in dashboard response
        failedPayments: 0, // Not in dashboard response
        monthlyRevenue: statsData.data.payments.totalRevenue,
      };
      
      setStats(transformedStats);

      // Fetch recent bookings
      const bookingsRes = await fetch(
        `${API_ENDPOINTS.adminBookings}?limit=5&sort=createdAt:desc`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!bookingsRes.ok) throw new Error("Failed to fetch bookings");

      const bookingsData = await bookingsRes.json();
      setRecentBookings(bookingsData.data.bookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: Calendar,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Revenue",
      value: `₦${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-500",
      change: "+18%",
    },
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-purple-500",
      change: "+8%",
    },
    {
      title: "Today&apos;s Bookings",
      value: stats?.todayBookings || 0,
      icon: TrendingUp,
      color: "bg-orange-500",
      change: "+5",
    },
  ];

  const bookingStatusCards = [
    {
      title: "Pending",
      count: stats?.pendingBookings || 0,
      icon: Clock,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      title: "Confirmed",
      count: stats?.confirmedBookings || 0,
      icon: CheckCircle,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Completed",
      count: stats?.completedBookings || 0,
      icon: CheckCircle,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Cancelled",
      count: stats?.cancelledBookings || 0,
      icon: XCircle,
      color: "text-red-600 bg-red-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Status Cards */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Booking Status Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {bookingStatusCards.map((status, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${status.color}`}>
                  <status.icon size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{status.title}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {status.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Successful Payments
              </p>
              <p className="text-2xl font-bold text-green-600 mt-2">
                {stats?.successfulPayments || 0}
              </p>
            </div>
            <CheckCircle className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending Payments
              </p>
              <p className="text-2xl font-bold text-yellow-600 mt-2">
                {stats?.pendingPayments || 0}
              </p>
            </div>
            <AlertCircle className="text-yellow-500" size={32} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Failed Payments
              </p>
              <p className="text-2xl font-bold text-red-600 mt-2">
                {stats?.failedPayments || 0}
              </p>
            </div>
            <XCircle className="text-red-500" size={32} />
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
          <a
            href="/admin/bookings"
            className="text-sm text-[#00BCD4] hover:underline"
          >
            View all
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {booking.fullName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {booking.serviceRequired || booking.pricingPlan?.title || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {booking.preferredDateTime 
                      ? new Date(booking.preferredDateTime).toLocaleDateString()
                      : new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    ₦{booking.pricingPlan?.price || "0"}
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No recent bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
