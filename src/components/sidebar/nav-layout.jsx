import { useContext } from "react";
import * as Icons from "lucide-react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { ResourcesProviderContext } from "@/store/resources";
import NavSidebarHeader from "./nav-sidebar-header";
import NavSidebarGroup from "./nav-sidebar-group";
import NavSidebarMenu from "./nav-sidebar-menu";
import NavSidebarFooter from "./nav-sidebar-footer";

export default function NavSidebarLayout() {
  const resources = useContext(ResourcesProviderContext);
  const categories = resources?.categories ?? [];

  const menuItems =
    categories.length > 0
      ? categories.map((category) => ({
          title: category.name || "Uncategorized",
          icon: Icons[category.icon] || Icons.Ungroup,
          count: Number.isFinite(category.count)
            ? category.count
            : (category.tags?.length ?? 0),
        }))
      : []; // empty array → child will show "No data available"

  return (
    <Sidebar collapsible="icon" variant="floating">
      <NavSidebarHeader />
      <SidebarContent className="overflow-x-hidden">
        <NavSidebarGroup>
          <NavSidebarMenu items={menuItems} />
        </NavSidebarGroup>
      </SidebarContent>
      <NavSidebarFooter />
    </Sidebar>
  );
}
