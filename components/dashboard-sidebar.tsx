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
      href: "/meals",
      icon: Utensils,
    },
    {
      title: t("meals.guest"),
      href: "/meals/guest",
      icon: UserPlus,
    },
    {
      title: t("nav.shopping"),
      href: "/shopping",
      icon: ShoppingCart,
    },
    {
      title: t("expense.title"),
      href: "/expenses",
      icon: DollarSign,
    },
    {
      title: t("nav.payments"),
      href: "/payments",
      icon: CreditCard,
    },
    {
      title: t("nav.calculations"),
      href: "/calculations",
      icon: BarChart,
    },
    {
      title: t("nav.voting"),
      href: "/voting",
      icon: Vote,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: PieChart,
    },
    {
      title: t("market.title"),
      href: "/market",
      icon: Clock,
    },
    {
      title: t("nav.excel"),
      href: "/excel",
      icon: FileSpreadsheet,
    },
    {
      title: t("nav.notifications"),
      href: "/notifications",
      icon: Bell,
    },
    {
      title: t("nav.profile"),
      href: "/settings",
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
