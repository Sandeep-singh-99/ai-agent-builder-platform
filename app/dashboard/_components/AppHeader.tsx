import { SidebarTrigger } from '@/components/ui/sidebar'
import { SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

export default function AppHeader() {
  return (
    <div className='flex justify-between items-center w-full p-4 shadow bg-sidebar'>
        <SidebarTrigger />
       <div>
         <SignedIn>
              <UserButton />
            </SignedIn>
       </div>
    </div>
  )
}
