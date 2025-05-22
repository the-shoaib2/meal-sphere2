"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bell,
  Calendar,
  CreditCard,
  Home,
  LogOut,
  Settings,
  ShoppingBag,
  User,
  Users,
  Utensils,
  Vote,
  FileText,
} from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import MealTracker from "@/components/meal-tracker"
import RoomOverview from "@/components/room-overview"
import PaymentHistory from "@/components/payment-history"
import MealCalculations from "@/components/meal-calculations"
import ShoppingManagement from "@/components/shopping-management"
import VotingSystem from "@/components/voting-system"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 items-start flex">
        <aside className="hidden lg:flex h-screen w-64 flex-col border-r bg-gray-100/40 dark:bg-gray-800/40 fixed">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Utensils className="h-6 w-6" />
              <span>MealSphere</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Dashboard</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant={activeTab === "meals" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("meals")}
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  Meals
                </Button>
                <Button
                  variant={activeTab === "rooms" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("rooms")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Rooms
                </Button>
                <Button
                  variant={activeTab === "payments" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("payments")}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payments
                </Button>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Management</h2>
              <div className="space-y-1">
                <Button
                  variant={activeTab === "shopping" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("shopping")}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Shopping
                </Button>
                <Button
                  variant={activeTab === "calculations" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("calculations")}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Calculations
                </Button>
                <Button
                  variant={activeTab === "voting" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("voting")}
                >
                  <Vote className="mr-2 h-4 w-4" />
                  Voting
                </Button>
                <Button
                  variant={activeTab === "schedule" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("schedule")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button
                  variant={activeTab === "excel" ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("excel")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Excel Import/Export
                </Button>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight">Settings</h2>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </nav>
          <div className="mt-auto p-4">
            <Button variant="outline" className="w-full justify-start">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </aside>
        <div className="flex-1 lg:pl-64">
          <main className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <Button size="sm">
                <Bell className="h-4 w-4 mr-2" />
                <span className="sr-only sm:not-sr-only sm:inline">Notifications</span>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Meals</CardTitle>
                  <Utensils className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Current Rate</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">৳65.50</div>
                  <p className="text-xs text-muted-foreground">Per meal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">My Balance</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">৳2,950</div>
                  <p className="text-xs text-muted-foreground">+1,250 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Active Rooms</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">12 members total</p>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="meals">Meals</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="calculations">Calculations</TabsTrigger>
                <TabsTrigger value="shopping">Shopping</TabsTrigger>
                <TabsTrigger value="voting">Voting</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Monthly Meal Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <div className="h-[300px] w-full">
                        {/* This would be a chart component */}
                        <div className="flex items-center justify-center h-full border rounded-md bg-muted/20">
                          <p className="text-sm text-muted-foreground">Monthly meal chart will be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>Your recent meal and payment activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <Utensils className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Lunch added</p>
                            <p className="text-sm text-muted-foreground">Today, 12:30 PM</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <CreditCard className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Payment received</p>
                            <p className="text-sm text-muted-foreground">Yesterday, 3:45 PM</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <ShoppingBag className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Shopping cost added</p>
                            <p className="text-sm text-muted-foreground">2 days ago, 10:15 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="rounded-full bg-primary/10 p-2 mr-3">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Joined Room 2</p>
                            <p className="text-sm text-muted-foreground">3 days ago, 5:30 PM</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="meals" className="space-y-4">
                <MealTracker />
              </TabsContent>
              <TabsContent value="rooms" className="space-y-4">
                <RoomOverview />
              </TabsContent>
              <TabsContent value="payments" className="space-y-4">
                <PaymentHistory />
              </TabsContent>
              <TabsContent value="calculations" className="space-y-4">
                <MealCalculations />
              </TabsContent>
              <TabsContent value="shopping" className="space-y-4">
                <ShoppingManagement />
              </TabsContent>
              <TabsContent value="voting" className="space-y-4">
                <VotingSystem />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  )
}
