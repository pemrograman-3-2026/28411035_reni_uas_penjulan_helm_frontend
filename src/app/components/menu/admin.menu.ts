import { ChartBarStacked, HardHat, LayoutDashboard } from "lucide-react";

export const adminMenu = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/helm", icon: HardHat, label: "Helm" },
  { to: "/admin/kategori", icon: ChartBarStacked, label: "Kategori" },
];

export type IMenu = typeof adminMenu[0]