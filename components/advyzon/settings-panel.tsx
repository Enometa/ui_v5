"use client"

import * as React from "react"
import {
  X,
  Search,
  User,
  Shield,
  Clock,
  Mail,
  Building2,
  Handshake,
  Puzzle,
  Monitor,
  LayoutList,
  Bell,
  Users,
  Calendar,
  CheckSquare,
  FileText,
  MailOpen,
  FileBarChart,
  PieChart,
  Calculator,
  Layers,
  Globe,
  Receipt,
  GitBranch,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SettingItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  isNew?: boolean
  onClick?: () => void
}

interface SettingSection {
  title: string
  items: SettingItem[]
}

const settingsSections: SettingSection[] = [
  {
    title: "My Personal Information",
    items: [
      {
        id: "profile",
        title: "User Profile",
        description: "Personal Display Information, Assigned Role and Permissions",
        icon: <User className="size-5" />,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
      },
      {
        id: "security",
        title: "Security",
        description: "Login, Password Reset, Two-Factor Authentication, Known Devices, Timeout",
        icon: <Shield className="size-5" />,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        id: "login-history",
        title: "Login History",
        description: "User login tracking records",
        icon: <Clock className="size-5" />,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
      },
    ],
  },
  {
    title: "My Integrations",
    items: [
      {
        id: "email-calendar",
        title: "Emails and Calendar",
        description: "Microsoft 365, Google Workspace, Outlook.com, Gmail, and more.",
        icon: <Mail className="size-5" />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        id: "custodian",
        title: "Custodian Integrations",
        description: "Charles Schwab, Fidelity, Pershing",
        icon: <Building2 className="size-5" />,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
      },
      {
        id: "partner",
        title: "Partner Integrations",
        description: "Planning, Risk Management, Trading, Portfolio Analytics and More",
        icon: <Handshake className="size-5" />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        id: "other",
        title: "Other",
        description: "Jira Platform and Jira Service Desk",
        icon: <Puzzle className="size-5" />,
        iconBg: "bg-sky-100",
        iconColor: "text-sky-600",
      },
    ],
  },
  {
    title: "My System Defaults",
    items: [
      {
        id: "display",
        title: "Display Preferences",
        description: "Set up data formatting preferences within your login",
        icon: <Monitor className="size-5" />,
        iconBg: "bg-cyan-100",
        iconColor: "text-cyan-600",
      },
      {
        id: "default-views",
        title: "Default Views",
        description: "Customize your data grid column preferences",
        icon: <LayoutList className="size-5" />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        id: "alerts",
        title: "Alerts & Notifications",
        description: "Opt-in from menu of system notifications",
        icon: <Bell className="size-5" />,
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
      },
      {
        id: "clients-contacts",
        title: "Clients & Contacts",
        description: "Set default preferences for Clients, Prospects and Contacts",
        icon: <Users className="size-5" />,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
      },
      {
        id: "calendar",
        title: "Calendar",
        description: "Set Calendar preferences and default field values for new Calendar Events",
        icon: <Calendar className="size-5" />,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
      },
      {
        id: "task",
        title: "Task Management",
        description: "Set default field values for new Tasks",
        icon: <CheckSquare className="size-5" />,
        iconBg: "bg-green-100",
        iconColor: "text-green-600",
      },
      {
        id: "notes",
        title: "Notes",
        description: "Set default preferences for Notes",
        icon: <FileText className="size-5" />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        id: "email-settings",
        title: "Email Settings",
        description: "Set email preferences and default settings for New Email",
        icon: <MailOpen className="size-5" />,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
      },
      {
        id: "report",
        title: "Report Settings",
        description: "Default report formatting preferences",
        icon: <FileBarChart className="size-5" />,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-600",
      },
      {
        id: "portfolio",
        title: "Portfolio Setting Defaults",
        description: "Your assigned portfolios will borrow from these defaults",
        icon: <PieChart className="size-5" />,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
      },
      {
        id: "calculation",
        title: "Calculation Settings",
        description: "Set your default portfolio and performance calculation preferences",
        icon: <Calculator className="size-5" />,
        iconBg: "bg-rose-100",
        iconColor: "text-rose-600",
      },
      {
        id: "asset",
        title: "Asset Allocation",
        description: "Define class and sector categories for portfolio evaluation",
        icon: <Layers className="size-5" />,
        iconBg: "bg-indigo-100",
        iconColor: "text-indigo-600",
      },
      {
        id: "client-portal",
        title: "Client Portal",
        description: "Assembled branding and administration preferences",
        icon: <Globe className="size-5" />,
        iconBg: "bg-sky-100",
        iconColor: "text-sky-600",
        isNew: true,
      },
      {
        id: "billing",
        title: "Billing Settings",
        description: "Set up billing specifications for your billed portfolios",
        icon: <Receipt className="size-5" />,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
      {
        id: "rebalance",
        title: "Rebalance",
        description: "Set required trading parameters to follow when rebalancing",
        icon: <GitBranch className="size-5" />,
        iconBg: "bg-teal-100",
        iconColor: "text-teal-600",
      },
    ],
  },
]

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredSections = React.useMemo(() => {
    if (!searchQuery.trim()) return settingsSections

    const query = searchQuery.toLowerCase()
    return settingsSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.items.length > 0)
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative bg-muted w-full max-w-5xl mt-4 mb-4 mx-4 rounded-lg shadow-xl flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 32px)' }}>
        {/* Close Button - Positioned absolutely in top-right */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 size-8 z-10 hover:bg-muted"
          onClick={onClose}
        >
          <X className="size-4" />
        </Button>

        {/* Search Header */}
        <div className="p-6 pb-4 bg-white rounded-t-lg shrink-0">
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search Settings"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-muted/30 border-border"
            />
          </div>
        </div>

        {/* Settings Content */}
        <ScrollArea className="flex-1 overflow-auto">
          <div className="p-6 pt-2 space-y-6">
            {filteredSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {section.title}
                </h3>
                <div className="bg-white rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={item.onClick}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                      >
                        <div
                          className={cn(
                            "size-10 rounded-lg flex items-center justify-center shrink-0",
                            item.iconBg,
                            item.iconColor
                          )}
                        >
                          {item.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {item.title}
                            </span>
                            {item.isNew && (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-[10px] px-1.5 py-0">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
