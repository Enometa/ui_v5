"use client"

import * as React from "react"
import type { Table } from "@tanstack/react-table"
import {
  Plus,
  ChevronDown,
  Filter,
  Search,
  MoreVertical,
  X,
  Columns,
  Download,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type {
  DataTableTab,
  DataTableFilterChip,
  NewItemAction,
  BulkAction,
  AdvancedFilterConfig,
} from "./types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  // Tab props
  enableTabs?: boolean
  tabs?: DataTableTab[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  // Search props
  enableGlobalSearch?: boolean
  searchPlaceholder?: string
  globalFilter?: string
  onGlobalFilterChange?: (value: string) => void
  // Filter chips props
  enableFilterChips?: boolean
  filterChips?: DataTableFilterChip[]
  activeFilterChips?: Set<string>
  onFilterChipToggle?: (chipId: string) => void
  // Advanced filter props
  enableAdvancedFilters?: boolean
  advancedFilters?: AdvancedFilterConfig[]
  onAdvancedFiltersChange?: (filters: AdvancedFilterConfig[]) => void
  // Action props
  newItemActions?: NewItemAction[]
  bulkActions?: BulkAction<TData>[]
  // Column visibility
  enableColumnVisibility?: boolean
  // Misc props
  onRefresh?: () => void
  onExport?: () => void
}

export function DataTableToolbar<TData>({
  table,
  enableTabs = false,
  tabs = [],
  activeTab,
  onTabChange,
  enableGlobalSearch = false,
  searchPlaceholder = "Search...",
  globalFilter = "",
  onGlobalFilterChange,
  enableFilterChips = false,
  filterChips = [],
  activeFilterChips = new Set(),
  onFilterChipToggle,
  enableAdvancedFilters = false,
  advancedFilters = [],
  onAdvancedFiltersChange,
  newItemActions = [],
  bulkActions = [],
  enableColumnVisibility = false,
  onRefresh,
  onExport,
}: DataTableToolbarProps<TData>) {
  const [advancedFilterOpen, setAdvancedFilterOpen] = React.useState(false)
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    <div className="flex flex-col gap-3">
      {/* Tab Bar */}
      {enableTabs && tabs.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tab.icon || (
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    activeTab === tab.id ? "bg-primary" : tab.color || "bg-blue-500"
                  )}
                />
              )}
              {tab.label}
              {tab.count !== undefined && (
                <span className="text-xs text-muted-foreground">({tab.count})</span>
              )}
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-muted rounded-full transition-colors">
            <Plus className="size-4" />
            New View
          </button>
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Client Dropdown Placeholder */}
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            All Clients
            <ChevronDown className="size-4" />
          </Button>

          {/* Global Search */}
          {enableGlobalSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter}
                onChange={(e) => onGlobalFilterChange?.(e.target.value)}
                className="w-48 pl-9 h-8 border-muted"
              />
              {globalFilter && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 size-6"
                  onClick={() => onGlobalFilterChange?.("")}
                >
                  <X className="size-3" />
                </Button>
              )}
            </div>
          )}

          {/* Filter Chips */}
          {enableFilterChips && filterChips.length > 0 && (
            <div className="flex items-center gap-2">
              {filterChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => onFilterChipToggle?.(chip.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors border",
                    activeFilterChips.has(chip.id)
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
            </div>
          )}

          {/* Advanced Filter Button */}
          {enableAdvancedFilters && (
            <Popover open={advancedFilterOpen} onOpenChange={setAdvancedFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    advancedFilters.length > 0 && "text-primary"
                  )}
                >
                  <Filter className="size-4" />
                  Advanced
                  {advancedFilters.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded bg-primary text-primary-foreground text-xs">
                      {advancedFilters.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96" align="start">
                <AdvancedFilterPanel
                  table={table}
                  filters={advancedFilters}
                  onFiltersChange={onAdvancedFiltersChange}
                  onClose={() => setAdvancedFilterOpen(false)}
                />
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Bulk Actions */}
          {selectedRows.length > 0 && bulkActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  Actions ({selectedRows.length})
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {bulkActions.map((action) => (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => action.onClick(selectedRows.map((row) => row.original))}
                    className={cn(
                      action.variant === "destructive" && "text-destructive"
                    )}
                  >
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Column Visibility */}
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" className="size-8">
                  <Columns className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Refresh */}
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8"
              onClick={onRefresh}
            >
              <RefreshCw className="size-4" />
            </Button>
          )}

          {/* Export */}
          {onExport && (
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8"
              onClick={onExport}
            >
              <Download className="size-4" />
            </Button>
          )}

          {/* More Options */}
          <Button variant="ghost" size="icon-sm" className="size-8">
            <MoreVertical className="size-4" />
          </Button>

          {/* New Item Dropdown */}
          {newItemActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="size-4" />
                  New
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {newItemActions.map((action) => (
                  <DropdownMenuItem key={action.id} onClick={action.onClick}>
                    {action.icon && <span className="mr-2">{action.icon}</span>}
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}

// Advanced Filter Panel Component
interface AdvancedFilterPanelProps<TData> {
  table: Table<TData>
  filters: AdvancedFilterConfig[]
  onFiltersChange?: (filters: AdvancedFilterConfig[]) => void
  onClose: () => void
}

function AdvancedFilterPanel<TData>({
  table,
  filters,
  onFiltersChange,
  onClose,
}: AdvancedFilterPanelProps<TData>) {
  const [localFilters, setLocalFilters] = React.useState<AdvancedFilterConfig[]>(
    filters.length > 0 ? filters : [{ column: "", operator: "equals", value: "" }]
  )

  const columns = table.getAllColumns().filter((col) => col.getCanFilter())

  const addFilter = () => {
    setLocalFilters([...localFilters, { column: "", operator: "equals", value: "" }])
  }

  const removeFilter = (index: number) => {
    setLocalFilters(localFilters.filter((_, i) => i !== index))
  }

  const updateFilter = (
    index: number,
    field: keyof AdvancedFilterConfig,
    value: unknown
  ) => {
    const newFilters = [...localFilters]
    newFilters[index] = { ...newFilters[index], [field]: value }
    setLocalFilters(newFilters)
  }

  const applyFilters = () => {
    const validFilters = localFilters.filter((f) => f.column && f.value)
    onFiltersChange?.(validFilters)
    onClose()
  }

  const clearFilters = () => {
    setLocalFilters([{ column: "", operator: "equals", value: "" }])
    onFiltersChange?.([])
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Advanced Filters</h4>
        <p className="text-sm text-muted-foreground">
          Create complex filter conditions
        </p>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {localFilters.map((filter, index) => (
          <div key={index} className="flex items-center gap-2">
            <select
              value={filter.column}
              onChange={(e) => updateFilter(index, "column", e.target.value)}
              className="flex-1 h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">Select column...</option>
              {columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.id}
                </option>
              ))}
            </select>
            <select
              value={filter.operator}
              onChange={(e) => updateFilter(index, "operator", e.target.value)}
              className="w-24 h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="gt">{">"}</option>
              <option value="lt">{"<"}</option>
            </select>
            <Input
              value={filter.value as string}
              onChange={(e) => updateFilter(index, "value", e.target.value)}
              placeholder="Value..."
              className="flex-1 h-8"
            />
            <Button
              variant="ghost"
              size="icon-sm"
              className="size-8"
              onClick={() => removeFilter(index)}
            >
              <X className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={addFilter}>
        <Plus className="size-4 mr-2" />
        Add Filter
      </Button>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={clearFilters}>
          Clear All
        </Button>
        <Button className="flex-1" onClick={applyFilters}>
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
