"use client";
import { BarChart3, Bell, Plus, User } from "lucide-react";
import React from "react";
import { ModeToggle } from "../buttons/ModeToggle";
import { Button } from "../buttons/button";

export const Header = () => {

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">APOLO ENERGIES</h1>
          <p className="text-sm text-muted-foreground">Potal de colaboradores</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* <Button variant="outline" size="sm" className="text-sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button> */}
          
          <ModeToggle />
          
          <Button variant="outline" size="icon">
            <Bell className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
