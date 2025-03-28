"use client";

export default function Navbar() {

   return (
      <nav className="sticky top-0 z-30 w-full shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="flex h-16 items-center px-4 md:px-6">
            <div className="md:hidden w-8" />

            <div className="flex flex-1 items-center justify-between">
               <h2 className="text-lg font-semibold">User Management</h2>
            </div>
         </div>
      </nav>
   );
}
