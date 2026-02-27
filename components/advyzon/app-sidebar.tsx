"use client"

import * as React from "react"
import {
  Home,
  Users,
  Briefcase,
  BarChart3,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
  Search,
  Wallet,
  PieChart,
  Calendar,
  GitBranch,
  Mail,
  StickyNote,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AppSidebarProps {
  collapsed: boolean
  onToggle: () => void
  expanded: boolean
  onExpandedChange: (expanded: boolean) => void
  currentView: "home" | "clients"
  onViewChange: (view: "home" | "clients") => void
}

// Custom icons to match Advyzon style
function DollarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5" />
    </svg>
  )
}

function CashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  )
}

const mainNavItems = [
  { icon: DollarIcon, label: "Home", id: "home" as const },
  { icon: Briefcase, label: "Portfolio", id: "portfolio" },
  { icon: Users, label: "Clients", id: "clients" as const },
  { icon: CashIcon, label: "Accounts", id: "accounts" },
  { icon: PieChart, label: "Investments", id: "investments" },
  { icon: FileText, label: "Reports", id: "reports" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: LayoutGrid, label: "Apps", id: "apps" },
]

const bottomNavItems = [
  { icon: FileText, label: "Documents", id: "documents" },
  { icon: Users, label: "Team", id: "team" },
  { icon: Settings, label: "Settings", id: "settings" },
  { icon: HelpCircle, label: "Help", id: "help" },
]

const recentApps = [
  { icon: Briefcase, label: "Practice Management", id: "practice" },
  { icon: Users, label: "Client Households", id: "households" },
  { icon: Wallet, label: "Accounts", id: "accounts" },
  { icon: BarChart3, label: "Reporting Center", id: "reporting" },
]

const favoriteApps = [
  { icon: PieChart, label: "Rebalance", id: "rebalance" },
  { icon: Calendar, label: "Planning", id: "planning" },
  { icon: FileText, label: "Activities", id: "activities" },
  { icon: GitBranch, label: "Workflows", id: "workflows" },
  { icon: FileText, label: "Documents", id: "documents" },
  { icon: Mail, label: "Email", id: "email" },
  { icon: StickyNote, label: "Notes", id: "notes" },
]

export function AppSidebar({
  collapsed,
  onToggle,
  expanded,
  onExpandedChange,
  currentView,
  onViewChange,
}: AppSidebarProps) {
  return (
    <div
      className={cn(
        "flex h-full bg-white border-r border-sidebar-border transition-all duration-200 ease-in-out relative z-50",
        collapsed ? "w-16" : "w-16",
        expanded && !collapsed ? "w-80" : ""
      )}
      onMouseEnter={() => !collapsed && onExpandedChange(true)}
      onMouseLeave={() => !collapsed && onExpandedChange(false)}
    >
      {/* Icon Rail */}
      <div className="w-16 flex flex-col items-center py-4 bg-white shrink-0">
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="mb-4 size-9 rounded-full bg-primary hover:bg-primary/90 text-white"
        >
          <ChevronRight
            className={cn(
              "size-4 transition-transform",
              !collapsed && "rotate-180"
            )}
          />
        </Button>

        {/* Main Nav Icons */}
        <nav className="flex flex-col items-center gap-1 flex-1">
          {mainNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className={cn(
                "size-10 rounded-lg",
                currentView === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              onClick={() => {
                if (item.id === "home" || item.id === "clients") {
                  onViewChange(item.id)
                }
              }}
            >
              <item.icon className="size-5" />
            </Button>
          ))}
        </nav>

        {/* Bottom Nav Icons */}
        <nav className="flex flex-col items-center gap-1 mt-auto">
          {bottomNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="icon"
              className="size-10 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <item.icon className="size-5" />
            </Button>
          ))}
        </nav>
      </div>

      {/* Expanded Panel */}
      {expanded && !collapsed && (
        <div className="w-64 border-l border-sidebar-border bg-white py-4 px-3 animate-in slide-in-from-left-2 duration-200">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search apps..."
              className="pl-9 h-9 bg-muted/50 border-0"
            />
          </div>

          <ScrollArea className="h-[calc(100vh-180px)]">
            {/* Recent Section */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-muted-foreground mb-3 px-2">
                RECENT
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {recentApps.map((app) => (
                  <button
                    key={app.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => {
                      if (app.id === "households") {
                        onViewChange("clients")
                        onExpandedChange(false)
                      }
                    }}
                  >
                    <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                      <app.icon className="size-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-center leading-tight">
                      {app.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Favorite Section */}
            <div>
              <h3 className="text-xs font-medium text-muted-foreground mb-3 px-2">
                FAVORITE
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {favoriteApps.map((app) => (
                  <button
                    key={app.id}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="size-10 rounded-lg bg-muted flex items-center justify-center">
                      <app.icon className="size-5 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-center leading-tight">
                      {app.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>

          {/* All Apps Button */}
          <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
            All Apps
          </Button>
        </div>
      )}
    </div>
  )
}
