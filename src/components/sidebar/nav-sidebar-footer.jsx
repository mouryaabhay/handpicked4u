import { User } from "lucide-react";
import githubIcon from "@/assets/icons/github.svg";
import discordIcon from "@/assets/icons/discord.svg";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { DISCORD_INVITE_CODE, handpickedProjectDetails } from "@/constants";

export default function NavSidebarFooter() {
  return (
    <SidebarFooter className="border-t">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="space-x-2"
            tooltip="About - How this site came to be"
          >
            <Link to="/about">
              <User />
              <span>About</span>
            </Link>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            className="space-x-2"
            tooltip="@mouryaabhay (Github Profile)"
          >
            <a
              href={`https://github.com/${handpickedProjectDetails.repoOwner}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="h-4 w-4 invert-0 dark:invert transition-all"
              />
              <span>@mouryaabhay</span>
            </a>
          </SidebarMenuButton>

          <SidebarMenuButton
            asChild
            className="space-x-2"
            tooltip="Creation Guide (Discord Server)"
          >
            <a
              href={`https://discord.com/invite/${DISCORD_INVITE_CODE}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={discordIcon}
                alt="Discord"
                className="h-4 w-4 invert-0 dark:invert transition-all"
              />
              <span>Creation Guide</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
