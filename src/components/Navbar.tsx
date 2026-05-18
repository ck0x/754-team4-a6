"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Points System
        </Link>
        <div className="flex gap-6">
          <Link href="/leaderboard" className="hover:text-gray-200">
            Leaderboard
          </Link>
          <Link href="/admin" className="hover:text-gray-200">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
