'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";

export const useAuthGuard = (role?: "admin" | "user") => {
  const { token, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/auths/login");
    } else if (role && user?.role !== role) {
      router.push("/unauthorized");
    }
  }, [token, user]);
};
