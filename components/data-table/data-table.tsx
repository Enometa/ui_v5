"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table"
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { DataTableToolbar } from "./toolbar"
import { DataTableColumnHeader } from "./column-header"
import type {
  DataTableConfig,
  DataTableColumnDef,
  DataTableTab,
  DataTableFilterChip,
  RowAction,
  AdvancedFilterConfig,
} from "./types"

interface DataTableProps<TData, TValue> {
  columns: DataTableColumnDef<TData, TValue>[]
  data: TData[]
  config: DataTableConfig<TData>
}

export function DataTable<TData, TValue>({
  columns: propColumns,
  data,
  config,
}: DataTableProps<TData, TValue>) {
  // State
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [activeTab, setActiveTab] = React.useState(config.tabs?.[0]?.id || "")
  const [activeFilterChips, setActiveFilterChips] = React.useState<Set<string>>(
    new Set(config.filterChips?.filter((c) => c.active).map((c) => c.id) || [])
  )
  const [advancedFilters, setAdvancedFilters] = React.useState<AdvancedFilterConfig[]>([])

  // Build columns with selection and row actions
  const columns = React.useMemo(() => {
    const cols: ColumnDef<TData, unknown>[] = []

    // Add selection column
    if (config.enableRowSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      })
    }

    // Create row actions column
    const actionsColumn: ColumnDef<TData, unknown> | null = config.rowActions && config.rowActions.length > 0 ? {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <RowActionsMenu
          row={row.original}
          actions={config.rowActions as RowAction<TData>[]}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    } : null

    // Process data columns with enhanced headers
    const dataColumns = propColumns.map((col) => ({
      ...col,
      header: col.header
        ? typeof col.header === "function"
          ? col.header
          : ({ column }: { column: unknown }) => (
              <DataTableColumnHeader
                column={column as never}
                title={String(col.header)}
                meta={col.meta}
              />
            )
        : undefined,
    }))

    // Insert actions column at the specified position (default: after first data column)
    const actionsPosition = config.rowActionsPosition ?? 1
    
    if (actionsColumn) {
      // Insert data columns with actions at the right position
      dataColumns.forEach((col, index) => {
        cols.push(col)
        // Insert actions column after the specified position (0-indexed)
        if (index === actionsPosition - 1) {
          cols.push(actionsColumn)
        }
      })
      // If position is beyond column count, add at the end
      if (actionsPosition > dataColumns.length) {
        cols.push(actionsColumn)
      }
    } else {
      cols.push(...dataColumns)
    }

    return cols
  }, [propColumns, config.enableRowSelection, config.rowActions, config.rowActionsPosition])

  // Filter data based on active tab and filter chips
  const filteredData = React.useMemo(() => {
    let result = [...data]

    // Apply tab filter
    if (activeTab && config.tabs) {
      const activeTabConfig = config.tabs.find((t) => t.id === activeTab)
      if (activeTabConfig?.filter) {
        result = result.filter(activeTabConfig.filter as (row: TData) => boolean)
      }
    }

    // Apply filter chip filters
    if (activeFilterChips.size > 0 && config.filterChips) {
      for (const chipId of activeFilterChips) {
        const chip = config.filterChips.find((c) => c.id === chipId)
        if (chip?.filter) {
          result = result.filter(chip.filter as (row: TData) => boolean)
        }
      }
    }

    return result
  }, [data, activeTab, activeFilterChips, config.tabs, config.filterChips])

  // Create table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: config.enableRowSelection,
    enableMultiRowSelection: config.enableMultiRowSelection ?? true,
    onSortingChange: (updater) => {
      const newSorting = typeof updater === "function" ? updater(sorting) : updater
      setSorting(newSorting)
      config.onSortChange?.(newSorting)
    },
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === "function" ? updater(columnFilters) : updater
      setColumnFilters(newFilters)
      config.onFilterChange?.(newFilters)
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater
      setRowSelection(newSelection)
      if (config.onSelectionChange) {
        const selectedRows = Object.keys(newSelection)
          .filter((key) => newSelection[key])
          .map((key) => filteredData[parseInt(key)])
          .filter(Boolean)
        config.onSelectionChange(selectedRows)
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: config.enablePagination
      ? getPaginationRowModel()
      : undefined,
    globalFilterFn: "includesString",
  })

  // Set initial page size
  React.useEffect(() => {
    if (config.enablePagination && config.defaultPageSize) {
      table.setPageSize(config.defaultPageSize)
    }
  }, [config.enablePagination, config.defaultPageSize, table])

  // Handle filter chip toggle
  const handleFilterChipToggle = (chipId: string) => {
    setActiveFilterChips((prev) => {
      const next = new Set(prev)
      if (next.has(chipId)) {
        next.delete(chipId)
      } else {
        next.add(chipId)
      }
      return next
    })
  }

  // Calculate counts for tabs
  const tabsWithCounts = React.useMemo<DataTableTab[]>(() => {
    if (!config.tabs) return []
    return config.tabs.map((tab) => ({
      ...tab,
      count: tab.filter
        ? data.filter(tab.filter as (row: TData) => boolean).length
        : data.length,
    }))
  }, [config.tabs, data])

  // Calculate counts for filter chips
  const chipsWithCounts = React.useMemo<DataTableFilterChip[]>(() => {
    if (!config.filterChips) return []
    return config.filterChips.map((chip) => ({
      ...chip,
      label: chip.filter
        ? `${chip.label.split(" ")[0]} (${data.filter(chip.filter as (row: TData) => boolean).length})`
        : chip.label,
    }))
  }, [config.filterChips, data])

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <DataTableToolbar
        table={table}
        enableTabs={config.enableTabs}
        tabs={tabsWithCounts}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        enableGlobalSearch={config.enableGlobalSearch}
        searchPlaceholder={config.searchPlaceholder}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        enableFilterChips={config.enableFilterChips}
        filterChips={chipsWithCounts}
        activeFilterChips={activeFilterChips}
        onFilterChipToggle={handleFilterChipToggle}
        enableAdvancedFilters={config.enableAdvancedFilters}
        advancedFilters={advancedFilters}
        onAdvancedFiltersChange={setAdvancedFilters}
        newItemActions={config.newItemActions}
        bulkActions={config.bulkActions}
        enableColumnVisibility={config.enableColumnVisibility}
      />

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {config.loading ? (
          config.loadingComponent || (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          )
        ) : (
          <Table>
            <TableHeader className={cn(config.stickyHeader && "sticky top-0 bg-background z-10")}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.column.getSize() }}
                      className={cn(
                        header.column.columnDef.meta?.align === "right" && "text-right",
                        header.column.columnDef.meta?.align === "center" && "text-center"
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "hover:bg-muted/50",
                      config.onRowClick && "cursor-pointer"
                    )}
                    onClick={() => config.onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cell.column.columnDef.meta?.align === "right" && "text-right",
                          cell.column.columnDef.meta?.align === "center" && "text-center"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {config.emptyState || "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {config.enablePagination && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Rows per page:
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              {(config.pageSizeOptions || [10, 20, 30, 50, 100]).map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border text-sm text-muted-foreground">
        {config.footerContent ? (
          config.footerContent({
            total: data.length,
            selected: Object.keys(rowSelection).filter((k) => rowSelection[k]).length,
            filtered: table.getFilteredRowModel().rows.length,
          })
        ) : (
          <>
            <div className="flex items-center gap-4">
              <span>Total: {data.length}</span>
              {config.enableRowSelection && (
                <span>
                  Selected:{" "}
                  {Object.keys(rowSelection).filter((k) => rowSelection[k]).length}
                </span>
              )}
            </div>
            <span>
              Data Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

// Row Actions Menu Component
interface RowActionsMenuProps<TData> {
  row: TData
  actions: RowAction<TData>[]
}

function RowActionsMenu<TData>({ row, actions }: RowActionsMenuProps<TData>) {
  const visibleActions = actions.filter((action) => !action.hidden?.(row))

  if (visibleActions.length === 0) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="size-6">
          <MoreVertical className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {visibleActions.map((action, index) => (
          <React.Fragment key={action.id}>
            {action.submenu ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  disabled={action.disabled?.(row)}
                  className={cn(
                    action.variant === "destructive" && "text-destructive"
                  )}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  {action.submenu.map((subAction) => (
                    <DropdownMenuItem
                      key={subAction.id}
                      onClick={() => subAction.onClick(row)}
                      disabled={subAction.disabled?.(row)}
                      className={cn(
                        subAction.variant === "destructive" && "text-destructive"
                      )}
                    >
                      {subAction.icon && <span className="mr-2">{subAction.icon}</span>}
                      {subAction.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            ) : (
              <DropdownMenuItem
                onClick={() => action.onClick(row)}
                disabled={action.disabled?.(row)}
                className={cn(
                  action.variant === "destructive" && "text-destructive"
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </DropdownMenuItem>
            )}
            {index < visibleActions.length - 1 &&
              visibleActions[index + 1].variant === "destructive" && (
                <DropdownMenuSeparator />
              )}
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
