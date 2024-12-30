"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isTokenExpired } from "@/utils/auth"; 

export default function withAuth(Component) {
  const PUBLIC_ROUTES = ["/", "/login", "/register"]; 

  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const router = useRouter();
    const pathname = usePathname(); 

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (PUBLIC_ROUTES.includes(pathname)) {
        return;
      }

      if (!token || isTokenExpired(token)) {
        router.push("/login"); 
      } else {
        setIsAuthenticated(true); 
      }
    }, [router, pathname]);

    if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated) {
      return <div className="p-4 text-center">Verificando autenticación...</div>;
    }

    return <Component {...props} />;
  };
}
