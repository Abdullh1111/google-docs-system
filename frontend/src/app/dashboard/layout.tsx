import { AppSidebar } from "@/components/sidebar/dashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { Home,  } from "lucide-react";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Ticket management dashboard",
  description: "Ticket management dashboard",
};

// Menu items.
const items = [
  {
    title: "Documents",
    url: "/dashboard/documents",
    icon: Home,
  },
];
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-screen overflow-auto">
        <AppSidebar items={items} />
        <div className="flex-1 relative">
          <SidebarTrigger className="block lg:hidden p-2" />
          <Navbar />
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
