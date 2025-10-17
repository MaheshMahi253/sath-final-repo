// utils/protectRoute.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useProtectedRoute(role) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || !user.role) {
      // 🚫 No token → send back to home/login
      router.replace("/");
      return;
    }

    // 🚫 Wrong role → send to their own dashboard
    if (role && user.role !== role) {
      router.replace(`/dashboard/${user.role}/dashboard`);
    }
  }, [router, role]);
}
