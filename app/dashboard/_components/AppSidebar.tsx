"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import {
  Database,
  Gem,
  Headphones,
  LayoutDashboard,
  User2Icon,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const MenuOptions = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "AI Agents",
    url: "#",
    icon: Headphones,
  },
  {
    title: "Data",
    url: "#",
    icon: Database,
  },
  {
    title: "Pricing",
    url: "/dashboard/pricing",
    icon: WalletCards,
  },
  {
    title: "Profile",
    url: "#",
    icon: User2Icon,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const path = usePathname();
  const { has } = useAuth();
  const isPaidUser = has && has({ plan: "unlimited_plan" });
  const convex = useConvex();

  const [totalRemianingCredits, setTotalRemianingCredits] = useState(0);

  useEffect(() => {
    if (!isPaidUser && userDetails) {
      GetUserAgent();
    }
  }, [userDetails, isPaidUser]);

  const GetUserAgent = async () => {
    const results = await convex.query(api.agent.GetUserAgents, {
      userId: userDetails?._id,
    });
    const remainingCredits = 2 - Number(results?.length || 0);

    setTotalRemianingCredits(remainingCredits);

    if (userDetails?.totalRemianingCredits !== remainingCredits) {
      setUserDetails((prev: any) => ({
        ...prev,
        totalRemianingCredits: remainingCredits,
      }));
    }
  };
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={48} height={48} />
          {open && <h1 className="font-bold">AI Agent Builder Platform</h1>}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((option, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    size={open ? "lg" : "default"}
                    isActive={path === option.url}
                  >
                    <Link href={option.url}>
                      <option.icon />
                      <span>{option.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter className="mb-10">
        {!isPaidUser ? (
          <div className="w-full">
            <div className="flex gap-2 items-center">
              <Gem />
              {open && <h2>Remaining Credits: {totalRemianingCredits}/2 </h2>}
            </div>
            {open && (
              <Button className="mt-3 w-full">Upgrade to Unlimited</Button>
            )}
          </div>
        ) : (
          <div>
            <h2>You can create unlimited Agents</h2>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
