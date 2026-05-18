"use client";

import { useEffect, useState } from "react";
import { LeaderboardEntry } from "@/types/user";

export default function LeaderboardTable() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard?limit=100");
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        const data = await response.json();
        setLeaderboard(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading)
    return <div className="text-center py-8">Loading leaderboard...</div>;
  if (error) return <div className="text-red-500 py-8">{error}</div>;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Rank
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Username
              </th>
              <th className="border border-gray-300 px-4 py-2 text-right">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry) => (
              <tr key={entry.user_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">
                  {entry.rank}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {entry.username}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right font-semibold">
                  {entry.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
