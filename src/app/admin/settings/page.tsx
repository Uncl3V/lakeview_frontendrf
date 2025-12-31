"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import { Save, Shield, Bell, User } from "lucide-react";

interface AdminSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  weeklyReports: boolean;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<AdminSettings>({
    emailNotifications: true,
    smsNotifications: false,
    weeklyReports: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In real production, this would fetch from backend
    // Keeping local + deterministic for now
    setLoading(false);
  }, []);

  const user = getUser();

  const handleSave = () => {
    // Placeholder for backend integration
    alert("Settings saved successfully");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and system preferences
        </p>
      </div>

      {/* Profile */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <User className="text-[#00BCD4]" />
          <h2 className="text-xl font-semibold text-gray-900">
            Admin Profile
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <p className="text-gray-900 font-medium mt-1">
              {user?.name || "Administrator"}
            </p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="text-gray-900 font-medium mt-1">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Bell className="text-[#00BCD4]" />
          <h2 className="text-xl font-semibold text-gray-900">
            Notifications
          </h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({ ...settings, emailNotifications: e.target.checked })
              }
            />
            <span>Email notifications</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) =>
                setSettings({ ...settings, smsNotifications: e.target.checked })
              }
            />
            <span>SMS notifications</span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.weeklyReports}
              onChange={(e) =>
                setSettings({ ...settings, weeklyReports: e.target.checked })
              }
            />
            <span>Weekly reports</span>
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="text-[#00BCD4]" />
          <h2 className="text-xl font-semibold text-gray-900">
            Security
          </h2>
        </div>

        <p className="text-gray-600 text-sm">
          Password changes and advanced security settings are managed by the backend.
        </p>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#00BCD4] text-white px-5 py-2 rounded-lg hover:bg-[#00ACC1] transition flex items-center space-x-2"
        >
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
}
