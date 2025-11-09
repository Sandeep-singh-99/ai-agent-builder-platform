import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './_components/AppSidebar'

export default function DashboardProvider({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        {children}
        </SidebarProvider>
  )
}
