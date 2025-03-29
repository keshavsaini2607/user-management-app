import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import RootProvider from "@/providers";
import { Toaster } from "@/components/ui/sonner";

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
            <RootProvider>{children}</RootProvider>
            <Toaster />
         </body>
      </html>
   );
}
