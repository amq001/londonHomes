"use client";

import Navbar from "@/components/Navbar";
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import Sidebar from "@/components/AppSidebar";
import React, { useEffect, useState } from "react";
import { useGetAuthUserQuery } from "@/state/api";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { usePathname, useRouter } from "next/navigation";

const DashboardContent = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();
  const { data: authUser } = useGetAuthUserQuery();
  
  console.log("Auth User", authUser);

  if (!authUser?.userRole) return null;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />

        <div className={`flex flex-1 pt-[${NAVBAR_HEIGHT}px]`}>
          <Sidebar userType={authUser.userRole.toLowerCase()} />

          <SidebarInset
            className={
              open
                ? "transition-all duration-200 md:ml-[14rem]"
                : "transition-all duration-200 md:ml-[5rem]"
            }
          >
            <main className="min-w-0 flex-1" style={{marginTop:NAVBAR_HEIGHT}}>{children}</main>
          </SidebarInset>
        </div>
      </div>
    </>
  );
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites",
          { scroll: false },
        );
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;
  if (!authUser?.userRole) return null;

  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
};

export default DashboardLayout;
