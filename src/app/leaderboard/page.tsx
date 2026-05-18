import Navbar from "@/components/Navbar";
import LeaderboardTable from "@/components/LeaderboardTable";

export default function LeaderboardPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <LeaderboardTable />
      </main>
    </>
  );
}
