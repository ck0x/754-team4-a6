import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Points System</h1>
          <p className="text-gray-600 mb-8">
            A simple point-based reward system with leaderboard and admin
            dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Users</h2>
              <p className="text-gray-600">Manage users and their points</p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Rewards</h2>
              <p className="text-gray-600">
                Award points to users through the admin panel
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
              <p className="text-gray-600">View rankings based on points</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
            <ol className="text-left max-w-xl mx-auto space-y-2 text-gray-700">
              <li>1. Set up your Neon database with the provided schema</li>
              <li>2. Create test users via the API</li>
              <li>3. Award points using the admin dashboard</li>
              <li>4. View rankings on the leaderboard</li>
            </ol>
          </div>
        </div>
      </main>
    </>
  );
}
