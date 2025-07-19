"use client";
import { Layout } from "@/components/home-layout/Layout";
import { Showroom } from "@/components/virtualShowRoom/Showroom";
// import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function ShowRoomPage() {
  // useAuthGuard();

  return (
    <Layout>
          <Showroom />
    </Layout>
  );
}
