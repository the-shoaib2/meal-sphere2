"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Search, Utensils } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { signOut, useSession } from "next-auth/react"
import { NotificationBell } from "./notification-bell"
import { useMobile } from "@/hooks/use-mobile"

export default function DashboardHeader() {
  const { data: session } = useSession()
  const isMobile = useMobile()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur-lg px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="md:hidden p-0">
          <SheetHeader className="border-b px-4 py-3 text-left">
            <SheetTitle className="flex items-center gap-2">
              <Utensils className="h-6 w-6" />
              <span>MealSphere</span>
            </SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Utensils className="h-6 w-6" />
        <span className={isMobile ? "sr-only" : ""}>MealSphere</span>
      </Link>
      <div className="flex-1 flex justify-center">
        <form className="hidden rounded-full md:flex w-full max-w-[450px] ">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search meals, members, or rooms..."
              className="w-full appearance-none bg-background pl-9 pr-4 shadow-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2">
        <NotificationBell />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full transition-all duration-200 hover:bg-accent/50 hover:scale-105 active:scale-95"
            >
              <Avatar className="h-8 w-8 transition-all duration-200 group-hover:ring-2 group-hover:ring-primary/20">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                <AvatarFallback>
                  {session?.user?.name
                    ? session.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{session?.user?.name || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
