import logo from "@/assets/svg/logo.svg";
import Image from "next/image";
import SidebarOption from "./SidebarOption";

type Props = {};

export default function MenuSidebar({}: Props) {
  return (
    <div className="menu-sidebar">
      <Image
        className="menu-sidebar__logo"
        src={logo}
        alt="Logo"
        width={100}
        height={60}
      />

      <div className="menu-sidebar__options">
        <SidebarOption href="/menu/leads" text="Leads" />
        {/* TODO: define the settings page */}
        <SidebarOption href="/menu/settings" text="Settings" />
      </div>
    </div>
  );
}
