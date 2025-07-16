"use client";
import { Layout } from "@/components/home-layout/Layout";
import { Showroom } from "@/components/virtualShowRoom/Showroom";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ShowRoomPage() {
  useAuthGuard();

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Showroom />
        </div>
      </div>
    </Layout>
  );
}
