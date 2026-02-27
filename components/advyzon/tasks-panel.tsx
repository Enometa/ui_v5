"use client"

import * as React from "react"
import {
  X,
  Plus,
  MoreHorizontal,
  Settings2,
  ChevronDown,
  ChevronUp,
  Play,
  MessageSquare,
  Zap,
  Paperclip,
  RefreshCw,
  CheckSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskAssignee {
  id: string
  name: string
  initials: string
  avatar?: string
  color?: string
}

interface Task {
  id: string
  title: string
  description?: string
  dueDate: string
  status: "not-started" | "in-progress" | "completed"
  priority?: "normal" | "high" | "urgent"
  assignees: TaskAssignee[]
  commentCount: number
  hasAttachment?: boolean
  hasRecurrence?: boolean
  isPastDue?: boolean
  categoryIcon?: React.ReactNode
}

interface TasksSection {
  title: string
  count: number
  tasks: Task[]
  color?: string
}

const sampleTasks: TasksSection[] = [
  {
    title: "Upcoming",
    count: 1,
    tasks: [
      {
        id: "1",
        title: "Follow-up:These 10 ETFs Gained the Most Assets in 2021: ETFGI",
        description: "CHRISTOPHER W MOZINA & 4 more",
        dueDate: "Future",
        status: "not-started",
        priority: "urgent",
        assignees: [
          { id: "1", name: "FF", initials: "FF", color: "bg-orange-500" },
          { id: "2", name: "SA", initials: "SA", color: "bg-amber-500" },
          { id: "3", name: "+3", initials: "+3", color: "bg-sky-500" },
        ],
        commentCount: 1,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
    ],
  },
  {
    title: "Past Due",
    count: 58,
    color: "text-red-500",
    tasks: [
      {
        id: "2",
        title: "",
        dueDate: "01-13-2026",
        status: "not-started",
        assignees: [{ id: "1", name: "User", initials: "", avatar: "/placeholder-user.jpg" }],
        commentCount: 0,
        isPastDue: true,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
      {
        id: "3",
        title: "1",
        dueDate: "11-12-2025",
        status: "not-started",
        assignees: [{ id: "1", name: "User", initials: "", avatar: "/placeholder-user.jpg" }],
        commentCount: 0,
        isPastDue: true,
        hasAttachment: true,
        hasRecurrence: true,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
      {
        id: "4",
        title: "1123",
        dueDate: "01-18-2026",
        status: "not-started",
        assignees: [{ id: "1", name: "FF", initials: "FF", color: "bg-orange-500" }],
        commentCount: 0,
        isPastDue: true,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
      {
        id: "5",
        title: "1233",
        dueDate: "11-10-2025",
        status: "not-started",
        assignees: [{ id: "1", name: "FF", initials: "FF", color: "bg-orange-500" }],
        commentCount: 0,
        isPastDue: true,
        hasRecurrence: true,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
      {
        id: "6",
        title: "A12",
        dueDate: "11-10-2025",
        status: "not-started",
        assignees: [{ id: "1", name: "FF", initials: "FF", color: "bg-orange-500" }],
        commentCount: 0,
        isPastDue: true,
        hasRecurrence: true,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
      {
        id: "7",
        title: "Activity 1-1",
        description: "first name 000215 A last name 000...",
        dueDate: "11-06-2025",
        status: "not-started",
        assignees: [{ id: "1", name: "User", initials: "", avatar: "/placeholder-user.jpg" }],
        commentCount: 0,
        isPastDue: true,
        hasAttachment: true,
        categoryIcon: <CheckSquare className="size-4 text-primary" />,
      },
    ],
  },
]

function StatusDropdown({ status }: { status: Task["status"] }) {
  const statusConfig = {
    "not-started": { label: "Not Started", icon: Play },
    "in-progress": { label: "In Progress", icon: RefreshCw },
    completed: { label: "Completed", icon: CheckSquare },
  }

  const config = statusConfig[status]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1.5 text-xs font-normal bg-transparent"
        >
          <config.icon className="size-3" />
          {config.label}
          <ChevronDown className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem>
          <Play className="size-3 mr-2" />
          Not Started
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RefreshCw className="size-3 mr-2" />
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CheckSquare className="size-3 mr-2" />
          Completed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border-b border-border py-4 px-2">
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button className="mt-1 size-5 rounded-full border-2 border-muted-foreground/30 hover:border-primary transition-colors shrink-0" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {task.title && (
                <h4 className="text-sm font-medium text-primary hover:underline cursor-pointer line-clamp-2">
                  {task.title}
                </h4>
              )}
              {task.description && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-xs", task.isPastDue ? "text-red-500" : "text-muted-foreground")}>
                  {task.dueDate}
                </span>
                {task.hasAttachment && <Paperclip className="size-3 text-muted-foreground" />}
                {task.hasRecurrence && <RefreshCw className="size-3 text-muted-foreground" />}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-2 shrink-0">
              {task.priority === "urgent" && (
                <Zap className="size-4 text-amber-500 fill-amber-500" />
              )}
              {task.categoryIcon}
            </div>
          </div>

          {/* Assignees Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex -space-x-1">
              {task.assignees.map((assignee) => (
                <Avatar key={assignee.id} className="size-6 border-2 border-white">
                  {assignee.avatar ? (
                    <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                  ) : null}
                  <AvatarFallback className={cn("text-[10px] text-white font-medium", assignee.color || "bg-gray-400")}>
                    {assignee.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          {/* Status and Comments Row */}
          <div className="flex items-center justify-between mt-2">
            <StatusDropdown status={task.status} />
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageSquare className="size-3.5" />
              <span className="text-xs">{task.commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TasksPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function TasksPanel({ isOpen, onClose }: TasksPanelProps) {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    Upcoming: true,
    "Past Due": true,
  })

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Tasks</h2>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-8">
              <Plus className="size-4 text-primary" />
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
        <div className="flex items-center justify-center gap-4 p-3 border-b border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm font-normal">
                Saturn AAA Pen...
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Users</DropdownMenuItem>
              <DropdownMenuItem>Saturn AAA Peng</DropdownMenuItem>
              <DropdownMenuItem>Other Users</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm font-normal">
                Open
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Open</DropdownMenuItem>
              <DropdownMenuItem>Completed</DropdownMenuItem>
              <DropdownMenuItem>All</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-auto">
          {sampleTasks.map((section) => (
            <div key={section.title}>
              {/* Section Header */}
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                onClick={() => toggleSection(section.title)}
              >
                <span className={cn("text-sm font-semibold", section.color)}>
                  {section.title} ({section.count})
                </span>
                {expandedSections[section.title] ? (
                  <ChevronUp className="size-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 text-muted-foreground" />
                )}
              </button>

              {/* Section Tasks */}
              {expandedSections[section.title] && (
                <div className="px-2">
                  {section.tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
