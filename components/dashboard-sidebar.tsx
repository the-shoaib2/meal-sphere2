"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import {
  BarChart,
  CreditCard,
  Home,
  PieChart,
  Settings,
  ShoppingCart,
  Utensils,
  Vote,
  FileSpreadsheet,
  Bell,
  DollarSign,
  UserPlus,
  Clock,
} from "lucide-react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: React.ComponentType<{ className?: string }>
  }[]
}

export function DashboardSidebar({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const { t } = useLanguage()

  const sidebarNavItems = [
    {
      title: t("nav.dashboard"),
      href: "/dashboard",
      icon: Home,
    },
    {
      title: t("nav.meals"),
      href: "/dashboard/meals",
      icon: Utensils,
    },
    {
      title: t("meals.guest"),
      href: "/dashboard/meals/guest",
      icon: UserPlus,
    },
    {
      title: t("nav.shopping"),
      href: "/dashboard/shopping",
      icon: ShoppingCart,
    },
    {
      title: t("expense.title"),
      href: "/dashboard/expenses",
      icon: DollarSign,
    },
    {
      title: t("nav.payments"),
      href: "/dashboard/payments",
      icon: CreditCard,
    },
    {
      title: t("nav.calculations"),
      href: "/dashboard/calculations",
      icon: BarChart,
    },
    {
      title: t("nav.voting"),
      href: "/dashboard/voting",
      icon: Vote,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: PieChart,
    },
    {
      title: t("market.title"),
      href: "/dashboard/market",
      icon: Clock,
    },
    {
      title: t("nav.excel"),
      href: "/dashboard/excel",
      icon: FileSpreadsheet,
    },
    {
      title: t("nav.notifications"),
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: t("nav.profile"),
      href: "/dashboard/profile",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1", className)}>
      {sidebarNavItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "secondary" : "ghost"}
          size="sm"
          className={cn(
            "justify-start",
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
          )}
          asChild
        >
          <Link href={item.href}>
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
