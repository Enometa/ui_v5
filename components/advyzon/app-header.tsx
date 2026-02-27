"use client"

import {
  Search,
  CheckSquare,
  MessageSquare,
  Bell,
  FileText,
  Sparkles,
  X,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HeaderAddMenu } from "./header-add-menu"
import { UserProfileDropdown } from "./user-profile-dropdown"

interface AppHeaderProps {
  isAIChatOpen?: boolean
  onToggleAIChat?: () => void
  onNotificationsClick?: () => void
  onSettingsClick?: () => void
  onReportsClick?: () => void
  onTasksClick?: () => void
}

export function AppHeader({
  isAIChatOpen,
  onToggleAIChat,
  onNotificationsClick,
  onSettingsClick,
  onReportsClick,
  onTasksClick,
}: AppHeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-4 shrink-0">
      {/* Left Section - Logo and Search */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="size-8 rounded bg-primary/10 flex items-center justify-center">
            <div className="size-5 rounded bg-primary" />
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="w-64 pl-9 h-9 bg-muted/30 border-0"
          />
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Reports Button */}
        <Button
          size="sm"
          onClick={onReportsClick}
          className="gap-1.5 bg-[#3bb4c1] hover:bg-[#2da3b0] text-white"
        >
          <span className="text-sm font-medium">Rep</span>
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">rts</span>
        </Button>

        {/* AI Assistant Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleAIChat}
          className={
            isAIChatOpen
              ? "gap-2 border-destructive/30 text-destructive hover:bg-destructive/5 bg-transparent"
              : "gap-2 border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
          }
        >
          {isAIChatOpen ? (
            <>
              <X className="size-4" />
              Close Advyzon AI
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Ask Advyzon AI
            </>
          )}
        </Button>

        {/* Add Menu */}
        <HeaderAddMenu onTaskClick={onTasksClick} />
        
        {/* Action Icons */}
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={onTasksClick}
        >
          <CheckSquare className="size-4 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="size-8">
          <MessageSquare className="size-4 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={onNotificationsClick}
        >
          <Bell className="size-4 text-muted-foreground" />
        </Button>

        {/* User Avatar and Brand */}
        <div className="flex items-center gap-2 ml-2 pl-2 border-l border-border">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={onReportsClick}
          >
            <FileText className="size-4 text-muted-foreground" />
          </Button>
          <UserProfileDropdown onSettingsClick={onSettingsClick} />
          <span className="text-lg font-semibold text-foreground">Advyzon</span>
        </div>
      </div>
    </header>
  )
}
