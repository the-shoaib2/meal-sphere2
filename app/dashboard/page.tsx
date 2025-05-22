"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Bell, 
  Utensils, 
  CreditCard, 
  ShoppingBag, 
  Users, 
  Home, 
  BarChart, 
  Vote 
} from "lucide-react"
import MealTracker from "@/components/meal-tracker"
import RoomOverview from "@/components/room-overview"
import PaymentHistory from "@/components/payment-history"
import MealCalculations from "@/components/meal-calculations"
import ShoppingManagement from "@/components/shopping-management"
import VotingSystem from "@/components/voting-system"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
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
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">
                  <Home className="h-4 w-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="meals">
                  <Utensils className="h-4 w-4 mr-2" />
                  Meals
                </TabsTrigger>
                <TabsTrigger value="rooms">
                  <Users className="h-4 w-4 mr-2" />
                  Rooms
                </TabsTrigger>
                <TabsTrigger value="payments">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payments
                </TabsTrigger>
                <TabsTrigger value="calculations">
                  <BarChart className="h-4 w-4 mr-2" />
                  Calculations
                </TabsTrigger>
                <TabsTrigger value="shopping">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shopping
                </TabsTrigger>
                <TabsTrigger value="voting">
                  <Vote className="h-4 w-4 mr-2" />
                  Voting
                </TabsTrigger>
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
    </div>
  )
}
