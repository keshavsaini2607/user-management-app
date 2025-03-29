"use client";
import { useState, useEffect } from "react";
import { Menu, StickyNote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/state/auth-store";
import { SideNavLinks } from "@/constants/nav_data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
   const [isOpen, setIsOpen] = useState(true);
   const [isMobile, setIsMobile] = useState(false);
   const [activeSideNav, setActiveSideNav] = useState("");
   const { logout } = useAuthStore();
   const pathname = usePathname();

   useEffect(() => {
      const activeNav = SideNavLinks.find((link) => link.href === pathname);
      if (activeNav) {
         setActiveSideNav(activeNav.title);
      }
   }, [pathname]);

   useEffect(() => {
      const checkScreenSize = () => {
         setIsMobile(window.innerWidth < 768);
         setIsOpen(window.innerWidth >= 768);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
   }, []);

   return (
      <>
         <Button
            variant="ghost"
            className={`fixed top-4 right-4 z-50 md:hidden ${
               isOpen ? "hidden" : "block"
            }`}
            onClick={() => setIsOpen(true)}
         >
            <Menu size={24} />
         </Button>

         <aside
            className={cn(
               "fixed md:relative shadow-sm h-screen transition-all duration-300 z-40",
               "md:bg-background",
               "bg-white",
               isOpen
                  ? "w-64 translate-x-0"
                  : "w-64 -translate-x-full md:translate-x-0 md:w-20"
            )}
         >
            <div className="p-4 h-full">
               <div className="flex items-center justify-between mb-8 relative">
                  <h2
                     className={cn(
                        "font-bold text-2xl transition-all flex items-center space-x-1",
                        !isOpen && "md:hidden"
                     )}
                  >
                     <StickyNote className="text-blue-500" />
                     <span className="text-blue-500">Doc</span>ify
                  </h2>
                  <Button
                     variant="ghost"
                     className="absolute right-0 md:relative md:hidden"
                     onClick={() => setIsOpen(false)}
                  >
                     <X size={20} />
                  </Button>
                  <Button
                     variant="ghost"
                     className="hidden md:flex"
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </Button>
               </div>

               <nav className="space-y-2 flex flex-col">
                  {SideNavLinks.map((link, idx) => (
                     <Link 
                        href={link.href} 
                        key={idx}
                        className={cn(
                           "flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100",
                           activeSideNav === link.title && "bg-blue-50"
                        )}
                     >
                        <link.icon 
                           size={20} 
                           className={cn(
                              "text-gray-600",
                              activeSideNav === link.title && "text-blue-500"
                           )}
                        />
                        <span
                           className={cn(
                              "text-gray-600",
                              activeSideNav === link.title && "text-blue-500",
                              !isOpen && "md:hidden"
                           )}
                        >
                           {link.title}
                        </span>
                     </Link>
                  ))}
               </nav>
               <div className="absolute bottom-10 w-full">
                  <Button
                     className="bg-blue-400 w-[85%] text-white cursor-pointer"
                     onClick={logout}
                  >
                     Logout
                  </Button>
               </div>
            </div>
         </aside>
      </>
   );
}
