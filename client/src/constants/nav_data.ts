import { HomeIcon, Upload, Users } from "lucide-react";

export const SideNavLinks = [
   {
      title: "Home",
      href: "/dashboard/home",
      icon: HomeIcon,
      isProtected: false,
   },
   {
      title: "My Uploads",
      href: "/dashboard/my-uploads",
      icon: Upload,
      isProtected: false,
   },
   {
      title: "User Management",
      href: "/dashboard/user-management",
      icon: Users,
      isProtected: true,
   },
];
