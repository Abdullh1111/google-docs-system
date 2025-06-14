"use client";
import { handleError, handleSuccess } from "@/lib/toaster";
import { useLogoutMutation } from "@/redux/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [logout, { isLoading, data, error }] = useLogoutMutation();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (data) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      handleSuccess(data.message || "Logout successful!");
      router.push("/login");
    }
    if (error) {
      handleError(error);
    }
  }, [data, error, isLoading, router]);
  return (
    <button
      disabled={isLoading}
      onClick={handleLogout}
      className="text-red-500 hover:underline w-full bg-red-100 py-3 mb-2"
    >
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
