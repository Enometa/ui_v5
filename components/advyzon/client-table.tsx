"use client"

import * as React from "react"
import {
  ArrowUpDown,
  MoreVertical,
  Plus,
  ChevronDown,
  Filter,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  clientData,
  formatCurrency,
  formatCurrencyWithSign,
  formatPercent,
  type Client,
} from "@/lib/client-data"

const tabs = [
  { id: "households", label: "Client Households", active: true },
  { id: "aum-100m", label: "AUM > 100M" },
  { id: "aum-lt-100m", label: "AUM < 100M" },
]

const filterChips = [
  { id: "managed", label: "Managed Only (42)", active: true },
  { id: "aum-1m", label: "AUM > $1M" },
  { id: "review", label: "Review Due" },
  { id: "cash", label: "High Cash" },
]

function StatusBadge({ status }: { status: Client["status"] }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-600 border-emerald-200",
    Onboarding: "bg-amber-50 text-amber-600 border-amber-200",
    "At Risk": "bg-red-50 text-red-600 border-red-200",
    "Review Needed": "bg-orange-50 text-orange-600 border-orange-200",
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs px-2 py-0.5 rounded-full",
        styles[status]
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full mr-1.5",
          status === "Active" && "bg-emerald-500",
          status === "Onboarding" && "bg-amber-500",
          status === "At Risk" && "bg-red-500",
          status === "Review Needed" && "bg-orange-500"
        )}
      />
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

export function ClientTable() {
  const [selectedClients, setSelectedClients] = React.useState<Set<string>>(
    new Set()
  )
  const [activeTab, setActiveTab] = React.useState("households")
  const [activeFilters, setActiveFilters] = React.useState<Set<string>>(
    new Set(["managed"])
  )

  const toggleClient = (id: string) => {
    setSelectedClients((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleAllClients = () => {
    if (selectedClients.size === clientData.length) {
      setSelectedClients(new Set())
    } else {
      setSelectedClients(new Set(clientData.map((c) => c.id)))
    }
  }

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <span
              className={cn(
                "size-2.5 rounded-full",
                activeTab === tab.id ? "bg-primary" : "bg-blue-500"
              )}
            />
            {tab.label}
          </button>
        ))}
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-full transition-colors">
          <Plus className="size-4" />
          New View
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Client Dropdown */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            All Clients
            <ChevronDown className="size-4" />
          </Button>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-48 pl-9 h-8 border-muted"
            />
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2">
            {filterChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => toggleFilter(chip.id)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                  activeFilters.has(chip.id)
                    ? "bg-primary/10 text-primary border-primary/30"
                    : "text-muted-foreground hover:bg-muted border-border"
                )}
              >
                {chip.label}
              </button>
            ))}
            <Button variant="ghost" size="icon-sm" className="size-8">
              <Plus className="size-4" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="size-4" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="size-8">
            <MoreVertical className="size-4" />
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="size-4" />
            New
            <ChevronDown className="size-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedClients.size === clientData.length}
                  onCheckedChange={toggleAllClients}
                />
              </TableHead>
              <TableHead className="min-w-[200px]">
                <button className="flex items-center gap-1 hover:text-foreground">
                  Client Household
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead className="w-8" />
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  AUM
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Status
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Risk Score
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Investment Model
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Custodian
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Fin. Plan
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Primary Advisor
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Next Review
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Service Tier
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  YTD Perf
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Unrealized G/L
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
              <TableHead>
                <button className="flex items-center gap-1 hover:text-foreground">
                  Cash %
                  <ArrowUpDown className="size-3" />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientData.map((client) => (
              <TableRow
                key={client.id}
                className="hover:bg-muted/50"
                data-state={selectedClients.has(client.id) ? "selected" : undefined}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedClients.has(client.id)}
                    onCheckedChange={() => toggleClient(client.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-sm" className="size-6">
                    <MoreVertical className="size-4" />
                  </Button>
                </TableCell>
                <TableCell>{formatCurrency(client.aum)}</TableCell>
                <TableCell>
                  <StatusBadge status={client.status} />
                </TableCell>
                <TableCell>
                  <RiskScoreBar score={client.riskScore} />
                </TableCell>
                <TableCell>{client.investmentModel}</TableCell>
                <TableCell>{client.custodian}</TableCell>
                <TableCell>
                  <FinPlanBadge plan={client.finPlan} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "size-7 rounded-full flex items-center justify-center text-white text-xs font-medium",
                        client.primaryAdvisor.color
                      )}
                    >
                      {client.primaryAdvisor.initials}
                    </span>
                    <span className="text-sm">{client.primaryAdvisor.name}</span>
                  </div>
                </TableCell>
                <TableCell>{client.nextReview}</TableCell>
                <TableCell>
                  <ServiceTierBadge tier={client.serviceTier} />
                </TableCell>
                <TableCell
                  className={cn(
                    "font-medium",
                    client.ytdPerf >= 0 ? "text-emerald-600" : "text-red-500"
                  )}
                >
                  {formatPercent(client.ytdPerf)}
                </TableCell>
                <TableCell
                  className={cn(
                    "font-medium",
                    client.unrealizedGL >= 0 ? "text-emerald-600" : "text-red-500"
                  )}
                >
                  {formatCurrencyWithSign(client.unrealizedGL)}
                </TableCell>
                <TableCell>{client.cashPercent}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Total: 50</span>
          <span>Selected: {selectedClients.size}</span>
        </div>
        <span>Data Updated: Jan 8, 2026</span>
      </div>
    </div>
  )
}
