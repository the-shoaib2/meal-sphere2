import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="w-full border-r md:w-64 md:flex-shrink-0">
          <div className="flex h-full flex-col overflow-y-auto py-4 px-3 md:py-8 md:px-5">
            <DashboardSidebar />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}
