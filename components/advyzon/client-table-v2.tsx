"use client"

import * as React from "react"
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Phone,
  FileText,
  Calendar,
  User,
  Users,
  DollarSign,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DataTable, type DataTableColumnDef, type DataTableConfig } from "@/components/data-table"
import { cn } from "@/lib/utils"
import {
  clientData,
  formatCurrency,
  formatCurrencyWithSign,
  formatPercent,
  type Client,
} from "@/lib/client-data"

// ============================================
// Custom Cell Renderers (Reusable)
// ============================================

function StatusBadge({ status }: { status: Client["status"] }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Onboarding: "bg-amber-50 text-amber-600 border-amber-200",
    "At Risk": "bg-red-50 text-red-600 border-red-200",
    "Review Needed": "bg-orange-50 text-orange-600 border-orange-200",
    Prospect: "bg-purple-50 text-purple-600 border-purple-200",
  }

  const dotColors = {
    Active: "bg-emerald-500",
    Onboarding: "bg-amber-500",
    "At Risk": "bg-red-500",
    "Review Needed": "bg-orange-500",
    Prospect: "bg-purple-500",
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs px-2 py-0.5 rounded-full",
        styles[status] || styles.Active
      )}
    >
      <span className={cn("size-1.5 rounded-full mr-1.5", dotColors[status] || dotColors.Active)} />
      {status}
    </Badge>
  )
}

function FinPlanBadge({ plan }: { plan: Client["finPlan"] }) {
  const styles = {
    Current: "text-emerald-600",
    "Needs Update": "text-orange-500",
    None: "text-muted-foreground",
    Expired: "text-orange-500",
    "In Progress": "text-blue-500",
  }

  return <span className={cn("text-sm", styles[plan])}>{plan}</span>
}

function RiskScoreBar({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score <= 33) return "bg-emerald-500"
    if (score <= 66) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", getColor(score))}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-sm text-muted-foreground w-6">{score}</span>
    </div>
  )
}

function ServiceTierBadge({ tier }: { tier: Client["serviceTier"] }) {
  const colors = {
    Silver: "bg-gray-400",
    Gold: "bg-amber-400",
    Platinum: "bg-slate-300",
    Bronze: "bg-orange-400",
  }

  return (
    <div className="flex items-center gap-2">
      <span className={cn("size-2 rounded-full", colors[tier])} />
      <span className="text-sm">{tier}</span>
    </div>
  )
}

function AdvisorCell({ advisor }: { advisor: Client["primaryAdvisor"] }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "size-7 rounded-full flex items-center justify-center text-white text-xs font-medium",
          advisor.color
        )}
      >
        {advisor.initials}
      </span>
      <span className="text-sm">{advisor.name}</span>
    </div>
  )
}

// ============================================
// Column Definitions
// ============================================

const columns: DataTableColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Client Household",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
    meta: {
      sortable: true,
      searchable: true,
      filterable: false,
    },
  },
  {
    accessorKey: "aum",
    header: "AUM",
    cell: ({ row }) => formatCurrency(row.getValue("aum")),
    meta: {
      sortable: true,
      filterable: true,
      filterType: "range",
      filterOptions: [
        { value: "1000000", label: "> $1M" },
        { value: "5000000", label: "> $5M" },
        { value: "10000000", label: "> $10M" },
      ],
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    meta: {
      sortable: true,
      filterable: true,
      filterType: "multi-select",
      filterOptions: [
        { value: "Active", label: "Active", color: "emerald-600" },
        { value: "Onboarding", label: "Onboarding", color: "amber-600" },
        { value: "At Risk", label: "At Risk", color: "red-600" },
        { value: "Review Needed", label: "Review Needed", color: "orange-600" },
      ],
    },
  },
  {
    accessorKey: "riskScore",
    header: "Risk Score",
    cell: ({ row }) => <RiskScoreBar score={row.getValue("riskScore")} />,
    meta: {
      sortable: true,
      filterable: true,
      filterType: "range",
    },
  },
  {
    accessorKey: "investmentModel",
    header: "Investment Model",
    cell: ({ row }) => row.getValue("investmentModel"),
    meta: {
      sortable: true,
      searchable: true,
      filterable: true,
      filterType: "multi-select",
      filterOptions: [
        { value: "Growth Moderate", label: "Growth Moderate" },
        { value: "ESG Global", label: "ESG Global" },
        { value: "Conservative", label: "Conservative" },
        { value: "Tech Sector Focus", label: "Tech Sector Focus" },
        { value: "Balanced", label: "Balanced" },
        { value: "Income Focused", label: "Income Focused" },
      ],
    },
  },
  {
    accessorKey: "custodian",
    header: "Custodian",
    cell: ({ row }) => row.getValue("custodian"),
    meta: {
      sortable: true,
      filterable: true,
      filterType: "multi-select",
      filterOptions: [
        { value: "Charles Schwab", label: "Charles Schwab" },
        { value: "TD Ameritrade", label: "TD Ameritrade" },
        { value: "Interactive Brokers", label: "Interactive Brokers" },
        { value: "Pershing", label: "Pershing" },
        { value: "Fidelity", label: "Fidelity" },
      ],
    },
  },
  {
    accessorKey: "finPlan",
    header: "Fin. Plan",
    cell: ({ row }) => <FinPlanBadge plan={row.getValue("finPlan")} />,
    meta: {
      sortable: true,
      filterable: true,
      filterType: "select",
      filterOptions: [
        { value: "Current", label: "Current" },
        { value: "Needs Update", label: "Needs Update" },
        { value: "None", label: "None" },
        { value: "Expired", label: "Expired" },
        { value: "In Progress", label: "In Progress" },
      ],
    },
  },
  {
    accessorKey: "primaryAdvisor",
    header: "Primary Advisor",
    cell: ({ row }) => <AdvisorCell advisor={row.getValue("primaryAdvisor")} />,
    meta: {
      sortable: false,
      filterable: true,
      filterType: "multi-select",
      filterOptions: [
        { value: "Michael Chen", label: "Michael Chen" },
        { value: "Sarah Jenkins", label: "Sarah Jenkins" },
        { value: "Robert Taylor", label: "Robert Taylor" },
        { value: "David Wilson", label: "David Wilson" },
        { value: "Jennifer Wu", label: "Jennifer Wu" },
      ],
    },
  },
  {
    accessorKey: "nextReview",
    header: "Next Review",
    cell: ({ row }) => row.getValue("nextReview"),
    meta: {
      sortable: true,
      filterable: true,
      filterType: "date-range",
    },
  },
  {
    accessorKey: "serviceTier",
    header: "Service Tier",
    cell: ({ row }) => <ServiceTierBadge tier={row.getValue("serviceTier")} />,
    meta: {
      sortable: true,
      filterable: true,
      filterType: "multi-select",
      filterOptions: [
        { value: "Platinum", label: "Platinum" },
        { value: "Gold", label: "Gold" },
        { value: "Silver", label: "Silver" },
        { value: "Bronze", label: "Bronze" },
      ],
    },
  },
  {
    accessorKey: "ytdPerf",
    header: "YTD Perf",
    cell: ({ row }) => {
      const value = row.getValue("ytdPerf") as number
      return (
        <span className={cn("font-medium", value >= 0 ? "text-emerald-600" : "text-red-500")}>
          {formatPercent(value)}
        </span>
      )
    },
    meta: {
      sortable: true,
      align: "right",
    },
  },
  {
    accessorKey: "unrealizedGL",
    header: "Unrealized G/L",
    cell: ({ row }) => {
      const value = row.getValue("unrealizedGL") as number
      return (
        <span className={cn("font-medium", value >= 0 ? "text-emerald-600" : "text-red-500")}>
          {formatCurrencyWithSign(value)}
        </span>
      )
    },
    meta: {
      sortable: true,
      align: "right",
    },
  },
  {
    accessorKey: "cashPercent",
    header: "Cash %",
    cell: ({ row }) => `${row.getValue("cashPercent")}%`,
    meta: {
      sortable: true,
      align: "right",
    },
  },
]

// ============================================
// Table Configuration
// ============================================

const tableConfig: DataTableConfig<Client> = {
  idField: "id",
  
  // Selection
  enableRowSelection: true,
  enableMultiRowSelection: true,
  
  // Row actions position (after Client Household name column)
  rowActionsPosition: 1,
  
  // Sorting & Filtering
  enableSorting: true,
  enableColumnVisibility: true,
  enableGlobalSearch: true,
  searchPlaceholder: "Search...",
  enableAdvancedFilters: true,
  
  // Tabs
  enableTabs: true,
  tabs: [
    { id: "households", label: "Client Households" },
    { id: "aum-100m", label: "AUM > 100M", filter: (row) => (row as Client).aum > 100000000 },
    { id: "aum-lt-100m", label: "AUM < 100M", filter: (row) => (row as Client).aum < 100000000 },
  ],
  
  // Filter Chips
  enableFilterChips: true,
  filterChips: [
    { id: "managed", label: "Managed Only", active: true },
    { id: "aum-1m", label: "AUM > $1M", filter: (row) => (row as Client).aum > 1000000 },
    { id: "review", label: "Review Due", filter: (row) => (row as Client).finPlan === "Needs Update" },
    { id: "cash", label: "High Cash", filter: (row) => (row as Client).cashPercent > 10 },
  ],
  
  // Row Actions (Multi-level menu)
  rowActions: [
    {
      id: "view",
      label: "View Details",
      icon: <Eye className="size-4" />,
      onClick: (row) => console.log("View", row),
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit className="size-4" />,
      onClick: (row) => console.log("Edit", row),
    },
    {
      id: "contact",
      label: "Contact",
      icon: <User className="size-4" />,
      onClick: () => {},
      submenu: [
        {
          id: "email",
          label: "Send Email",
          icon: <Mail className="size-4" />,
          onClick: (row) => console.log("Email", row),
        },
        {
          id: "call",
          label: "Schedule Call",
          icon: <Phone className="size-4" />,
          onClick: (row) => console.log("Call", row),
        },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      icon: <FileText className="size-4" />,
      onClick: (row) => console.log("Documents", row),
    },
    {
      id: "schedule",
      label: "Schedule Review",
      icon: <Calendar className="size-4" />,
      onClick: (row) => console.log("Schedule", row),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 className="size-4" />,
      variant: "destructive",
      onClick: (row) => console.log("Delete", row),
    },
  ],
  
  // Bulk Actions
  bulkActions: [
    {
      id: "export",
      label: "Export Selected",
      icon: <FileText className="size-4" />,
      onClick: (rows) => console.log("Export", rows),
    },
    {
      id: "assign",
      label: "Assign Advisor",
      icon: <Users className="size-4" />,
      onClick: (rows) => console.log("Assign", rows),
    },
    {
      id: "delete",
      label: "Delete Selected",
      icon: <Trash2 className="size-4" />,
      variant: "destructive",
      onClick: (rows) => console.log("Delete", rows),
    },
  ],
  
  // New Item Actions
  newItemActions: [
    {
      id: "client",
      label: "New Client",
      icon: <User className="size-4" />,
      onClick: () => console.log("New Client"),
    },
    {
      id: "household",
      label: "New Household",
      icon: <Users className="size-4" />,
      onClick: () => console.log("New Household"),
    },
    {
      id: "account",
      label: "New Account",
      icon: <DollarSign className="size-4" />,
      onClick: () => console.log("New Account"),
    },
  ],
  
  // Callbacks
  onRowClick: (row) => console.log("Row clicked", row),
  onSelectionChange: (rows) => console.log("Selection changed", rows.length),
  onSortChange: (sorting) => console.log("Sort changed", sorting),
}

// ============================================
// Main Component
// ============================================

export function ClientTableV2() {
  return (
    <DataTable
      columns={columns}
      data={clientData}
      config={tableConfig}
    />
  )
}
