import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/molecules/sidebar";
import { Navbar } from "@/components/molecules";

const lato = Lato({
   weight: ["400", "700"],
   subsets: ["latin"],
   variable: "--font-lato",
});

export const metadata: Metadata = {
   title: "User Management System",
   description: "manage users with ease",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${lato.variable} font-lato antialiased`}>
            <RootProvider>
               <div className="flex relative">
                  <Sidebar />
                  <div className="flex-1 min-h-screen">
                     <Navbar />
                     <main className="p-4">{children}</main>
                  </div>
               </div>
            </RootProvider>
            <Toaster />
         </body>
      </html>
   );
}
