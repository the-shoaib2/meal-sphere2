"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  ChevronRight,
  Home,
  Utensils,
  Users,
  CreditCard,
  ShoppingBag,
  BarChart,
  Vote,
  Calendar,
  FileText,
  User,
  Bell,
  Settings,
  LogOut,
} from "lucide-react"

interface NavItem {
  title: string
  icon: React.ReactNode
  href?: string
  items?: NavItem[]
}

interface NavSectionProps {
  title: string
  items: NavItem[]
  activeTab: string
  onTabChange: (tab: string) => void
}

function NavSection({ title, items, activeTab, onTabChange }: NavSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between px-2 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
      >
        <span className="uppercase tracking-wider">{title}</span>
        {isExpanded ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
      </button>
      {isExpanded && (
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.title}>
              <Button
                variant={activeTab === item.title.toLowerCase() ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => onTabChange(item.title.toLowerCase())}
              >
                {item.icon}
                <span className="ml-2">{item.title}</span>
              </Button>
              {item.items && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.items.map((subItem) => (
                    <Button
                      key={subItem.title}
                      variant={activeTab === subItem.title.toLowerCase() ? 'secondary' : 'ghost'}
                      className="w-full justify-start"
                      size="sm"
                      onClick={() => onTabChange(subItem.title.toLowerCase())}
                    >
                      {subItem.icon}
                      <span className="ml-2">{subItem.title}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function AppSidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: string
  onTabChange: (tab: string) => void
}) {
  const dashboardItems: NavItem[] = [
    { title: 'Overview', icon: <Home className="h-4 w-4" /> },
    { title: 'Meals', icon: <Utensils className="h-4 w-4" /> },
    { title: 'Rooms', icon: <Users className="h-4 w-4" /> },
    { title: 'Payments', icon: <CreditCard className="h-4 w-4" /> },
  ]

  const managementItems: NavItem[] = [
    { title: 'Shopping', icon: <ShoppingBag className="h-4 w-4" /> },
    { title: 'Calculations', icon: <BarChart className="h-4 w-4" /> },
    { title: 'Voting', icon: <Vote className="h-4 w-4" /> },
    { title: 'Schedule', icon: <Calendar className="h-4 w-4" /> },
    { title: 'Excel Import/Export', icon: <FileText className="h-4 w-4" /> },
  ]

  const settingsItems: NavItem[] = [
    { title: 'settings', icon: <User className="h-4 w-4" /> },
    { title: 'Notifications', icon: <Bell className="h-4 w-4" /> },
    { title: 'Settings', icon: <Settings className="h-4 w-4" /> },
  ]

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-gray-100/40 p-4 dark:bg-gray-800/40 lg:flex">
      <div className="mb-6 flex h-14 items-center border-b px-2">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Utensils className="h-6 w-6" />
          <span>MealSphere</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        <NavSection
          title="Dashboard"
          items={dashboardItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        
        <NavSection
          title="Management"
          items={managementItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
        
        <NavSection
          title="Settings"
          items={settingsItems}
          activeTab={activeTab}
          onTabChange={onTabChange}
        />
      </nav>

      <div className="mt-auto pt-4">
        <Button variant="outline" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </aside>
  )
}
