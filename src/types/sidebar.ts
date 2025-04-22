
import React from "react";

export type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed: boolean;
  subItems?: SubItemProps[];
};

export type SubItemProps = {
  label: string;
  to: string;
  active?: boolean;
};
