"use client"

import * as React from "react"
import {
  X,
  Settings,
  MoreHorizontal,
  FileText,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  type: "activity" | "rebalance" | "compliance" | "system"
  title: string
  description: string
  clientName?: string
  timestamp: string
  read: boolean
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "activity",
    title: "Activity Assignment",
    description: "You have been assigned the Task",
    clientName: "Activity 1-1",
    timestamp: "Yesterday 09:00 PM",
    read: false,
  },
  {
    id: "2",
    type: "activity",
    title: "Activity Assignment",
    description: "You have been assigned the Task",
    clientName: "Activity 1-1",
    timestamp: "Yesterday 09:00 PM",
    read: false,
  },
  {
    id: "3",
    type: "rebalance",
    title: "Rebalance Portfolio Out of Balance",
    description: "Rebalance portfolio is out of balance with target model portfolio",
    clientName: "Client Name",
    timestamp: "Yesterday 06:21 PM",
    read: false,
  },
  {
    id: "4",
    type: "rebalance",
    title: "Rebalance Portfolio Out of Balance",
    description: "Rebalance portfolio is out of balance with target model portfolio",
    clientName: "Client Name",
    timestamp: "Yesterday 06:21 PM",
    read: true,
  },
  {
    id: "5",
    type: "rebalance",
    title: "Rebalance Portfolio Out of Balance",
    description: "Rebalance portfolio is out of balance with target model portfolio",
    clientName: "3 Accounts",
    timestamp: "Yesterday 06:19 PM",
    read: true,
  },
  {
    id: "6",
    type: "rebalance",
    title: "Rebalance Portfolio Out of Balance",
    description: "Rebalance portfolio is out of balance with target model portfolio",
    clientName: "3 Accounts",
    timestamp: "Yesterday 06:19 PM",
    read: true,
  },
  {
    id: "7",
    type: "activity",
    title: "Activity Assignment",
    description: "You have been assigned the Case",
    clientName: "SUb",
    timestamp: "Yesterday 11:43 AM",
    read: true,
  },
  {
    id: "8",
    type: "activity",
    title: "Activity Assignment",
    description: "You have been assigned the Task",
    clientName: "Activity 1-1",
    timestamp: "Sun 09:00 PM",
    read: true,
  },
]

interface NotificationsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const [filter, setFilter] = React.useState<"all" | "unread">("unread")
  const [moduleFilter, setModuleFilter] = React.useState<string>("all")

  const filteredNotifications = React.useMemo(() => {
    return sampleNotifications.filter((notification) => {
      if (filter === "unread" && notification.read) return false
      if (moduleFilter !== "all" && notification.type !== moduleFilter) return false
      return true
    })
  }, [filter, moduleFilter])

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "activity":
        return (
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="size-4 text-primary" />
          </div>
        )
      case "rebalance":
        return (
          <div className="size-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="size-4 text-orange-600" />
          </div>
        )
      default:
        return (
          <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
            <FileText className="size-4 text-muted-foreground" />
          </div>
        )
    }
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-8 text-primary">
              <Settings className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreHorizontal className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-4 px-4 py-3 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                {filter === "unread" ? "Unread Alerts" : "All Alerts"}
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter("unread")}>
                Unread Alerts
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("all")}>
                All Alerts
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                {moduleFilter === "all" ? "All Modules" : moduleFilter}
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setModuleFilter("all")}>
                All Modules
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModuleFilter("activity")}>
                Activity
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModuleFilter("rebalance")}>
                Rebalance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setModuleFilter("compliance")}>
                Compliance
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Notifications List */}
        <ScrollArea className="flex-1">
          <div className="divide-y divide-border">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 px-4 py-4 hover:bg-muted/50 cursor-pointer transition-colors",
                    !notification.read && "bg-primary/5"
                  )}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">
                      {notification.title}
                    </p>
                    <p className="text-sm mt-0.5">
                      {notification.clientName && (
                        <span className="text-primary font-medium">
                          {notification.clientName}{" "}
                        </span>
                      )}
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-muted-foreground">
                No notifications
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
