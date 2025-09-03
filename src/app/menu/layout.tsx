// TODO: add the login reroute from the BE when the login is successfull
//  - add form validation
//  - double check the requirements

import MenuSidebar from "@/components/MenuSidebar";
import { ReactNode } from "react";

export default function Menu({ children }: { children: ReactNode }) {
  return (
    <div className="menu">
      <MenuSidebar />
      <div className="menu__children">{children}</div>
    </div>
  );
}
