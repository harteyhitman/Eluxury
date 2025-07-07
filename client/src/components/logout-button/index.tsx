"use client";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import Button from "@/components/buttons";
import toast from "react-hot-toast";


const LogoutButton = () => {
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} variant="secondary" className="text-[red] text-semibold cursor-pointer">
      Logout
    </Button>
  );
};

export default LogoutButton;
