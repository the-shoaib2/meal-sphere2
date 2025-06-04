import type { ReactNode } from "react"
import DashboardHeader from "@/components/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="h-full overflow-y-auto py-4 px-3">
            <DashboardSidebar />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
