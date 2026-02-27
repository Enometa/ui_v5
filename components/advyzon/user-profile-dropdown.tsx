"use client"

import * as React from "react"
import {
  User,
  Settings,
  Palette,
  Users,
  HelpCircle,
  BookMarked,
  MessageSquare,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface UserProfileDropdownProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
  onSettingsClick?: () => void
}

export function UserProfileDropdown({
  userName = "Saturn Peng",
  userEmail = "peng.yang@advyzon.com",
  userAvatar,
  onSettingsClick,
}: UserProfileDropdownProps) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light")

  const menuItems = [
    {
      id: "profile",
      label: "User Profile",
      icon: <User className="size-4" />,
      onClick: () => console.log("User Profile"),
    },
    {
      id: "settings",
      label: "User Settings",
      icon: <Settings className="size-4" />,
      onClick: () => {
        console.log("User Settings")
        onSettingsClick?.()
      },
    },
  ]

  const additionalItems = [
    {
      id: "impersonation",
      label: "Impersonation",
      icon: <Users className="size-4" />,
      onClick: () => console.log("Impersonation"),
    },
    {
      id: "knowledge-base",
      label: "Knowledge Base",
      icon: <HelpCircle className="size-4" />,
      onClick: () => console.log("Knowledge Base"),
    },
    {
      id: "release-notes",
      label: "Product Release Notes",
      icon: <BookMarked className="size-4" />,
      onClick: () => console.log("Release Notes"),
    },
    {
      id: "contact",
      label: "Contact Us",
      icon: <MessageSquare className="size-4" />,
      onClick: () => console.log("Contact Us"),
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-9 rounded-full p-0">
          <Avatar className="size-8">
            <AvatarImage src={userAvatar || "/placeholder-user.jpg"} alt={userName} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {/* User Info Section */}
        <div className="flex items-center gap-3 p-4">
          <Avatar className="size-14 border-2 border-muted">
            <AvatarImage src={userAvatar || "/placeholder-user.jpg"} alt={userName} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-lg">
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground">{userName}</span>
            <span className="text-sm text-primary">{userEmail}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Main Menu Items */}
        {menuItems.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={item.onClick}
            className="gap-3 py-3 px-4 cursor-pointer"
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}

        {/* Theme Toggle */}
        <div className="flex items-center gap-3 py-3 px-4">
          <span className="text-muted-foreground">
            <Palette className="size-4" />
          </span>
          <span className="flex-1">Display</span>
          <div className="flex rounded-full bg-muted p-0.5">
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "px-4 py-1 rounded-full text-sm font-medium transition-colors",
                theme === "light"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "px-4 py-1 rounded-full text-sm font-medium transition-colors",
                theme === "dark"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Dark
            </button>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Additional Menu Items */}
        {additionalItems.map((item) => (
          <DropdownMenuItem
            key={item.id}
            onClick={item.onClick}
            className="gap-3 py-3 px-4 cursor-pointer"
          >
            <span className="text-muted-foreground">{item.icon}</span>
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={() => console.log("Logout")}
          className="gap-3 py-3 px-4 cursor-pointer"
        >
          <span className="text-muted-foreground">
            <LogOut className="size-4" />
          </span>
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
