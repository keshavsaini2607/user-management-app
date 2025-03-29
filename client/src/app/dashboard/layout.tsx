import type { Metadata } from "next";
import Sidebar from "@/components/molecules/sidebar";
import { Navbar } from "@/components/molecules";

export const metadata: Metadata = {
   title: "User Management System | Dashboard",
   description: "manage users with ease",
};

export default function DashboardLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <div className="flex relative">
            <Sidebar />
            <div className="flex-1 min-h-screen">
               <Navbar />
               <main className="p-4">{children}</main>
            </div>
         </div>
      </>
   );
}
