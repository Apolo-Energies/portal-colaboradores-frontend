"use client";
import { Menu } from "lucide-react";
import React, { useEffect } from "react";
import { ModeToggle } from "../buttons/ModeToggle";
import { Button } from "../buttons/button";
import { UserMenu } from "./UserMenu";
import { useSidebarStore } from "@/app/store/sidebar.store";
import { useSession } from "next-auth/react";
import { getCommissionUser } from "@/app/services/UserCommissionService/user-commission.service";
import { useCommissionUserStore } from "@/app/store/commission-user/commission-user.store";

export const Header = () => {
  const { data: session } = useSession();
  const {setCommission, commission} = useCommissionUserStore();
  
  useEffect(() => {
    const fetchCommission = async () => {
      if (!session?.user?.token) return;

      try {
        const res = await getCommissionUser(session.user.token, session.user.id);
        if (res.isSuccess) {
          setCommission(res.result?.commissionType.percentage);
          console.log(res.result)
        } else {
          console.error("Error fetching commission:", res.displayMessage);
        }
      } catch (error) {
        console.error("Unexpected error fetching commission:", error);
      }
    };

    fetchCommission();
  }, [session?.user?.token]);

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
            Portal de colaboradores {commission}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <ModeToggle />

          {/* <Button variant="outline" size="icon">
            <Bell className="w-4 h-4" />
          </Button> */}

          <UserMenu />
        </div>
      </div>
    </header>
  );
};
