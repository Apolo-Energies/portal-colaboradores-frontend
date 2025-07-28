"use client";
import { Bell, Menu } from "lucide-react";
import React from "react";
import { ModeToggle } from "../buttons/ModeToggle";
import { Button } from "../buttons/button";
import { UserMenu } from "./UserMenu";
import { useSidebarStore } from "@/app/store/SidebarStore";

export const Header = () => {
  const { toggle } = useSidebarStore();
  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <Button
          onClick={toggle}
          variant="outline"
          size="icon"
          className="md:hidden"
        >
          <Menu className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-xl sm:text-lg md:text-xl font-semibold text-foreground">
            APOLO ENERGIES
          </h1>
          <p className="text-sm sm:text-xs md:text-sm text-muted-foreground">
            Portal de colaboradores
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />

          <Button variant="outline" size="icon">
            <Bell className="w-4 h-4" />
          </Button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
