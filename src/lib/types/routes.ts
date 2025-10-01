import { ComponentType, SVGProps } from "react";

export type NavIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type UserRouteType = {
  name: string;
  path: string;
  icon: NavIcon;
};
