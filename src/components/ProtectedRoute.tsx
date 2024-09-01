"use client";
import { ROLENAME, USERNAME } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode, useState } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const username = localStorage.getItem(USERNAME);
        const rolename = localStorage.getItem(ROLENAME);

        if (username) {
          if (requiredRole) {
            setIsAuthorized(requiredRole === rolename);
          } else {
            setIsAuthorized(true);
          }
        }
      } catch (error) {
        console.error(`The following error has ocurred when trying
        to check user access: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  useEffect(() => {
    if (!isAuthorized && !isLoading) {
      router.replace("/login");
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen bg-dark-100"></div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
