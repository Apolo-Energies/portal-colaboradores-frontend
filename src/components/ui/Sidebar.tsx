"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { sidebarItems } from "@/constants/SidebarItems";

export const Sidebar = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  // const role = "master";

  const logoSrc =
    theme === "dark" ? "/logos/apolologo2.webp" : "/logos/apolologo.webp";

  return (
    <div className="w-64 bg-card border-r border-border h-screen">
      <Link
        href="/dashboard"
        className="flex justify-center items-center w-full h-20 py-4 px-2"
      >
        <div className="relative w-full h-full max-w-xs">
          <Image
            src={logoSrc}
            alt="Apolo Energies"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </Link>

      {/* Menú lateral */}
      <nav className="px-3">
        {sidebarItems.map((item, index) => {
          const isSelected = pathname === item.url;
          return (
            <Link href={item.url} key={index}>
              <button
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-1 cursor-pointer
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon
                  className={`w-4 h-4 ${
                    isSelected
                      ? "text-sidebar-selected-text"
                      : "text-sidebar-text"
                  }`}
                />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

