import Navbar from "@/components/Navbar";
import RewardForm from "@/components/RewardForm";

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl">
          <RewardForm />
        </div>
      </main>
    </>
  );
}
