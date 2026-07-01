'use client'
import { ChartBarStacked, HardHat, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { IMenu } from "./menu/admin.menu";


const navItems = [
  { to: "/admin", icon: <LayoutDashboard />, label: "Dashboard" },
  { to: "/admin/helm", icon: <HardHat />, label: "Helm" },
  { to: "/admin/kategori", icon: <ChartBarStacked />, label: "Kategori" },
];

export default function Sidebar(
  { 
    isOpen,
    listMenu,
    collapsed,
    onClose 
  } : {
    isOpen: boolean,
    listMenu : IMenu[],
    collapsed: boolean,
    onClose: () => void
  }
) {
  return (
    <div
      className={`sidebar ${isOpen ? "open" : ""} ${collapsed ? "collapsed" : ""}`}
    >
      <div className="sidebar-brand">
        {!collapsed && <span className="brand-name">HELM IN</span>}
        <button
          className="btn d-md-none ms-auto"
          style={{ color: "white" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <nav className="mt-2">
        <ul className="nav flex-column">
          {listMenu.map(({ to, icon: Icon, label }) => (
            <li className="nav-item" key={to}>
              <Link
                href={to}
                className={'nav-link'}
                onClick={onClose}
                title={collapsed ? label : ""}
              >
                <span className="nav-icon">
                  <Icon/>
                </span>
                {!collapsed && <span className="nav-label">{label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}