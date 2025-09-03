import ImmigrationAssessmentForm from "@/components/ImmigrationAssessmentForm";
import logo from "@/assets/svg/logo.svg";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const SidebarOption = ({ href, text }: { href: string; text: string }) => {
  return <Link href={href}>{text}</Link>;
};

export default function MenuSidebar({}: Props) {
  return (
    <div className="menu-sidebar">
      <Image src={logo} alt="Logo" width={50} height={50} />

      <div className="menu-sidebar__options">
        <SidebarOption href="/menu/leads" text="Leads" />
        <SidebarOption href="/menu/settings" text="Settings" />
      </div>
    </div>
  );
}
