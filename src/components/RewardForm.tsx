"use client";

import { useState } from "react";
import { RewardRequest } from "@/types/user";

export default function RewardForm() {
  const [formData, setFormData] = useState<RewardRequest>({
    user_id: "",
    points: 0,
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    let parsed: string | number = value;
    if (name === "points") {
      parsed = value === "" ? "" : Number.parseInt(value, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: parsed }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to reward user");
      }

      setMessage({
        type: "success",
        text: `Successfully rewarded ${formData.points} points!`,
      });
      setFormData({ user_id: "", points: 0, reason: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reward User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="user_id" className="block text-sm font-medium mb-1">
            User ID
          </label>
          <input
            type="text"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter user ID"
          />
        </div>

        <div>
          <label htmlFor="points" className="block text-sm font-medium mb-1">
            Points
          </label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter points to award"
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium mb-1">
            Reason (Optional)
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter reason for reward"
            rows={3}
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Rewarding..." : "Award Points"}
        </button>
      </form>
    </div>
  );
}
