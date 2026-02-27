"use client"

import * as React from "react"
import {
  FileText,
  CheckSquare,
  Calendar,
  Mail,
  GitBranch,
  Target,
  FileBarChart,
  Briefcase,
  UserCheck,
  PieChart,
  Users,
  UserPlus,
  Star,
  Wallet,
  Shield,
  Hash,
  ChevronRight,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick?: () => void
  submenu?: MenuItem[]
  highlighted?: boolean
  hasSubmenu?: boolean
}

const menuItems: MenuItem[] = [
  {
    id: "note",
    label: "Note",
    icon: <FileText className="size-4" />,
    onClick: () => console.log("New Note"),
  },
  {
    id: "task",
    label: "Task",
    icon: <CheckSquare className="size-4 text-primary" />,
    highlighted: true,
    hasSubmenu: true,
  },
  {
    id: "calendar",
    label: "Calendar Event",
    icon: <Calendar className="size-4" />,
    onClick: () => console.log("New Calendar Event"),
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail className="size-4" />,
    onClick: () => console.log("New Email"),
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: <GitBranch className="size-4" />,
    onClick: () => console.log("New Workflow"),
  },
  {
    id: "opportunity",
    label: "Opportunity",
    icon: <Target className="size-4" />,
    onClick: () => console.log("New Opportunity"),
  },
  {
    id: "proposal",
    label: "Proposal",
    icon: <FileBarChart className="size-4" />,
    onClick: () => console.log("New Proposal"),
  },
  {
    id: "case",
    label: "Case",
    icon: <Briefcase className="size-4" />,
    submenu: [
      { id: "case-service", label: "Service Case", icon: <Briefcase className="size-4" />, onClick: () => console.log("Service Case") },
      { id: "case-support", label: "Support Case", icon: <Briefcase className="size-4" />, onClick: () => console.log("Support Case") },
    ],
  },
  {
    id: "client-action",
    label: "Client Action Item",
    icon: <UserCheck className="size-4" />,
    onClick: () => console.log("New Client Action Item"),
  },
  {
    id: "planning",
    label: "Planning",
    icon: <PieChart className="size-4" />,
    onClick: () => console.log("New Planning"),
  },
]

const entityItems: MenuItem[] = [
  {
    id: "contact",
    label: "Contact",
    icon: <Users className="size-4" />,
    submenu: [
      { id: "contact-individual", label: "Individual", icon: <Users className="size-4" />, onClick: () => console.log("Individual Contact") },
      { id: "contact-organization", label: "Organization", icon: <Users className="size-4" />, onClick: () => console.log("Organization Contact") },
    ],
  },
  {
    id: "client",
    label: "Client",
    icon: <Users className="size-4" />,
    submenu: [
      { id: "client-individual", label: "Individual", icon: <Users className="size-4" />, onClick: () => console.log("Individual Client") },
      { id: "client-household", label: "Household", icon: <Users className="size-4" />, onClick: () => console.log("Household Client") },
    ],
  },
  {
    id: "prospect",
    label: "Prospect",
    icon: <UserPlus className="size-4" />,
    submenu: [
      { id: "prospect-individual", label: "Individual", icon: <UserPlus className="size-4" />, onClick: () => console.log("Individual Prospect") },
      { id: "prospect-household", label: "Household", icon: <UserPlus className="size-4" />, onClick: () => console.log("Household Prospect") },
    ],
  },
]

const accountItems: MenuItem[] = [
  {
    id: "account",
    label: "Account",
    icon: <Wallet className="size-4" />,
    submenu: [
      { id: "account-investment", label: "Investment Account", icon: <Wallet className="size-4" />, onClick: () => console.log("Investment Account") },
      { id: "account-retirement", label: "Retirement Account", icon: <Wallet className="size-4" />, onClick: () => console.log("Retirement Account") },
      { id: "account-bank", label: "Bank Account", icon: <Wallet className="size-4" />, onClick: () => console.log("Bank Account") },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: <Shield className="size-4" />,
    onClick: () => console.log("New Security"),
  },
  {
    id: "rep-code",
    label: "Rep Code",
    icon: <Hash className="size-4" />,
    onClick: () => console.log("New Rep Code"),
  },
  {
    id: "fidelity",
    label: "Fidelity Custody",
    icon: <span className="size-4 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">W</span>,
    onClick: () => console.log("Fidelity Custody"),
  },
  {
    id: "aim-service",
    label: "AIM Service Request",
    icon: <Star className="size-4" />,
    submenu: [
      { id: "aim-new", label: "New Request", icon: <Star className="size-4" />, onClick: () => console.log("New AIM Request") },
      { id: "aim-follow", label: "Follow-up", icon: <Star className="size-4" />, onClick: () => console.log("AIM Follow-up") },
    ],
  },
]

function MenuItemComponent({ item, onTaskClick }: { item: MenuItem; onTaskClick?: () => void }) {
  if (item.submenu) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          className={cn(
            "gap-3",
            item.highlighted && "text-primary"
          )}
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-48">
          {item.submenu.map((subItem) => (
            <DropdownMenuItem
              key={subItem.id}
              onClick={subItem.onClick}
              className="gap-3"
            >
              {subItem.icon}
              {subItem.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }

  // Special handling for Task item with hasSubmenu
  if (item.id === "task" && item.hasSubmenu) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          className={cn(
            "gap-3",
            item.highlighted && "text-primary"
          )}
        >
          {item.icon}
          <span className="flex-1">{item.label}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-48">
          <DropdownMenuItem onClick={onTaskClick} className="gap-3">
            <CheckSquare className="size-4" />
            New
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }

  return (
    <DropdownMenuItem
      onClick={item.onClick}
      className={cn(
        "gap-3",
        item.highlighted && "text-primary"
      )}
    >
      {item.icon}
      {item.label}
    </DropdownMenuItem>
  )
}

interface HeaderAddMenuProps {
  onTaskClick?: () => void
}

export function HeaderAddMenu({ onTaskClick }: HeaderAddMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground rounded-md">
          <Plus className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {menuItems.map((item) => (
          <MenuItemComponent key={item.id} item={item} onTaskClick={onTaskClick} />
        ))}
        
        <DropdownMenuSeparator />
        
        {entityItems.map((item) => (
          <MenuItemComponent key={item.id} item={item} onTaskClick={onTaskClick} />
        ))}
        
        <DropdownMenuSeparator />
        
        {accountItems.map((item) => (
          <MenuItemComponent key={item.id} item={item} onTaskClick={onTaskClick} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
