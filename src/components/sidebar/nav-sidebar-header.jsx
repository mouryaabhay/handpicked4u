import { Boxes } from "lucide-react";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { handleScroll } from "@/lib/handle-scroll";

export default function NavSidebarHeader() {
  const handleHomeClick = (e) => {
    // Prevents reloading the route if already on the homepage
    if (window.location.pathname === "/") {
      e.preventDefault();
      handleScroll("hero-section", 256);
    }
  };

  return (
    <SidebarHeader className="border-b">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="space-x-2" tooltip="Home">
            <Link to="/" onClick={handleHomeClick}>
              <Boxes />
              <span className="font-semibold">Handpicked</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
