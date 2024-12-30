"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/AuthContext";

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/tasks");
    }
  }, [user, router]);

  return <>{children}</>; 
};

export default PublicRoute;
