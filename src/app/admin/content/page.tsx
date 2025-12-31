"use client";

import { useEffect, useState, useCallback } from "react";
import { API_ENDPOINTS } from "@/lib/config";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

type ContentType = "services" | "pricing" | "faqs" | "testimonials";

interface ContentItem {
  id: number;
  [key: string]: unknown;
}

export default function AdminContent() {
  const [contentType, setContentType] = useState<ContentType>("services");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchContent = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch(API_ENDPOINTS.adminContent(contentType), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setItems(data.data[contentType] || data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const handleCreate = () => {
    const newItem: ContentItem = { id: 0 };
    
    // Set default fields based on content type
    if (contentType === "services") {
      newItem.name = "";
      newItem.description = "";
      newItem.icon = "";
    } else if (contentType === "pricing") {
      newItem.name = "";
      newItem.price = "";
      newItem.duration = "";
      newItem.features = [];
    } else if (contentType === "faqs") {
      newItem.question = "";
      newItem.answer = "";
      newItem.category = "";
    } else if (contentType === "testimonials") {
      newItem.name = "";
      newItem.role = "";
      newItem.content = "";
      newItem.rating = 5;
    }

    setEditingItem(newItem);
    setShowModal(true);
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem({ ...item });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const url =
        editingItem?.id === 0
          ? API_ENDPOINTS.adminContent(contentType)
          : API_ENDPOINTS.adminContentById(contentType, String(editingItem?.id || ''));

      const method = editingItem?.id === 0 ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingItem),
      });

      if (!res.ok) throw new Error("Failed to save");

      await fetchContent();
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
      alert("Failed to save item");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch(
        API_ENDPOINTS.adminContentById(contentType, id.toString()),
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to delete");

      await fetchContent();
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  const renderTableHeaders = () => {
    switch (contentType) {
      case "services":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Icon
            </th>
          </>
        );
      case "pricing":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Plan Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Duration
            </th>
          </>
        );
      case "faqs":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Question
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
          </>
        );
      case "testimonials":
        return (
          <>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Rating
            </th>
          </>
        );
    }
  };

  const renderTableRow = (item: ContentItem) => {
    switch (contentType) {
      case "services":
        return (
          <>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {String(item.name ?? "")}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
              {String(item.description ?? "")}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{String(item.icon ?? "")}</td>
          </>
        );
      case "pricing":
        return (
          <>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              {String(item.name ?? "")}
            </td>
            <td className="px-6 py-4 text-sm font-semibold text-gray-900">
              ₦{Number(item.price ?? 0).toLocaleString()}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{String(item.duration ?? "")}</td>
          </>
        );
      case "faqs":
        return (
          <>
            <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-md truncate">
              {String(item.question ?? "")}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{String(item.category ?? "")}</td>
          </>
        );
      case "testimonials":
        return (
          <>
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {String(item.name ?? "")} 
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{String(item.role ?? "")}</td>
            <td className="px-6 py-4 text-sm text-yellow-600">
              {"⭐".repeat(Number(item.rating ?? 0))}
            </td>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage website content and information
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-[#00BCD4] text-white px-4 py-2 rounded-lg hover:bg-[#00ACC1] transition flex items-center space-x-2"
        >
          <Plus size={18} />
          <span>Add New</span>
        </button>
      </div>

      {/* Content Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm p-1">
        <div className="flex space-x-2">
          {(["services", "pricing", "faqs", "testimonials"] as ContentType[]).map(
            (type) => (
              <button
                key={type}
                onClick={() => setContentType(type)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium capitalize transition ${
                  contentType === type
                    ? "bg-[#00BCD4] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
            )
          )}
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00BCD4]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {renderTableHeaders()}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {renderTableRow(item)}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-[#00BCD4] hover:text-[#00ACC1]"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No items found. Click &quot;Add New&quot; to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem.id === 0 ? "Create" : "Edit"}{" "}
                  {contentType.slice(0, -1)}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Dynamic form fields based on content type */}
                {Object.keys(editingItem).map((key) => {
                  if (key === "id" || key === "createdAt" || key === "updatedAt")
                    return null;

                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key}
                      </label>
                      {key === "description" || key === "content" || key === "answer" ? (
                        <textarea
                          value={String(editingItem[key] ?? "")}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              [key]: e.target.value,
                            })
                          }
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                        />
                      ) : (
                        <input
                          type={key === "price" || key === "rating" ? "number" : "text"}
                          value={String(editingItem[key] ?? "")}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              [key]: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00BCD4] focus:border-transparent"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#00BCD4] text-white rounded-lg hover:bg-[#00ACC1] transition flex items-center space-x-2"
                >
                  <Save size={18} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
