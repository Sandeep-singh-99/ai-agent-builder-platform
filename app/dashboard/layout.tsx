import React from 'react'
import DashboardProvider from './DashboardProvider'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
        <DashboardProvider>
            {children}
        </DashboardProvider>
    </div>
  )
}
