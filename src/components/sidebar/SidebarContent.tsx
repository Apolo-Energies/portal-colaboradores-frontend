import React from 'react'

import { sidebarItems } from "@/constants/SidebarItems";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

export const SidebarContent = () => {
 const pathname = usePathname();
  const { theme } = useTheme();

  const logoSrc =
    theme === "dark" ? "/logos/apolologo2.webp" : "/logos/apolologo.webp";

  return (
    <div className="w-64 bg-card border-r border-border h-full">
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
                    isSelected ? "text-sidebar-selected-text" : "text-sidebar-text"
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