import type { ColumnDef, SortingState, ColumnFiltersState, VisibilityState, RowSelectionState } from "@tanstack/react-table"
import type { ReactNode } from "react"

// Column configuration types
export interface DataTableColumnMeta {
  /** Display label for the column header */
  label?: string
  /** Whether the column is sortable */
  sortable?: boolean
  /** Whether the column is searchable */
  searchable?: boolean
  /** Whether the column is filterable */
  filterable?: boolean
  /** Filter options for dropdown/checkbox filters */
  filterOptions?: FilterOption[]
  /** Filter type */
  filterType?: "text" | "select" | "multi-select" | "range" | "date-range"
  /** Custom header render function */
  headerRender?: () => ReactNode
  /** Alignment */
  align?: "left" | "center" | "right"
  /** Whether the column can be hidden */
  hideable?: boolean
  /** Default visibility */
  defaultVisible?: boolean
  /** Column group */
  group?: string
}

export interface FilterOption {
  label: string
  value: string
  icon?: ReactNode
  color?: string
}

// Tab configuration
export interface DataTableTab {
  id: string
  label: string
  icon?: ReactNode
  color?: string
  filter?: (row: unknown) => boolean
  count?: number
}

// Filter chip configuration
export interface DataTableFilterChip {
  id: string
  label: string
  active?: boolean
  filter?: (row: unknown) => boolean
  column?: string
  value?: unknown
}

// Advanced filter configuration
export interface AdvancedFilterConfig {
  column: string
  operator: "equals" | "contains" | "startsWith" | "endsWith" | "gt" | "gte" | "lt" | "lte" | "between" | "in" | "notIn"
  value: unknown
  value2?: unknown // For "between" operator
}

// Row action configuration
export interface RowAction<TData> {
  id: string
  label: string
  icon?: ReactNode
  onClick: (row: TData) => void
  variant?: "default" | "destructive"
  disabled?: (row: TData) => boolean
  hidden?: (row: TData) => boolean
  submenu?: RowAction<TData>[]
}

// Bulk action configuration
export interface BulkAction<TData> {
  id: string
  label: string
  icon?: ReactNode
  onClick: (rows: TData[]) => void
  variant?: "default" | "destructive"
  requiresSelection?: boolean
}

// New item action configuration
export interface NewItemAction {
  id: string
  label: string
  icon?: ReactNode
  onClick: () => void
}

// Main data table configuration
export interface DataTableConfig<TData> {
  /** Unique identifier field in the data */
  idField: keyof TData
  
  /** Enable row selection */
  enableRowSelection?: boolean
  
  /** Enable multi-row selection */
  enableMultiRowSelection?: boolean
  
  /** Enable sorting */
  enableSorting?: boolean
  
  /** Enable column visibility toggle */
  enableColumnVisibility?: boolean
  
  /** Enable global search */
  enableGlobalSearch?: boolean
  
  /** Global search placeholder */
  searchPlaceholder?: string
  
  /** Enable pagination */
  enablePagination?: boolean
  
  /** Default page size */
  defaultPageSize?: number
  
  /** Page size options */
  pageSizeOptions?: number[]
  
  /** Enable tabs */
  enableTabs?: boolean
  
  /** Tab configurations */
  tabs?: DataTableTab[]
  
  /** Enable filter chips */
  enableFilterChips?: boolean
  
  /** Filter chip configurations */
  filterChips?: DataTableFilterChip[]
  
  /** Enable advanced filters */
  enableAdvancedFilters?: boolean
  
  /** Row actions */
  rowActions?: RowAction<TData>[]
  
  /** Row actions column position (default: 1, after select checkbox) */
  rowActionsPosition?: number
  
  /** Bulk actions */
  bulkActions?: BulkAction<TData>[]
  
  /** New item actions */
  newItemActions?: NewItemAction[]
  
  /** Footer content */
  footerContent?: (data: { total: number; selected: number; filtered: number }) => ReactNode
  
  /** Custom empty state */
  emptyState?: ReactNode
  
  /** Loading state */
  loading?: boolean
  
  /** Custom loading component */
  loadingComponent?: ReactNode
  
  /** Sticky header */
  stickyHeader?: boolean
  
  /** Row click handler */
  onRowClick?: (row: TData) => void
  
  /** Selection change handler */
  onSelectionChange?: (selectedRows: TData[]) => void
  
  /** Sort change handler */
  onSortChange?: (sorting: SortingState) => void
  
  /** Filter change handler */
  onFilterChange?: (filters: ColumnFiltersState) => void
}

// State type for the data table
export interface DataTableState {
  sorting: SortingState
  columnFilters: ColumnFiltersState
  columnVisibility: VisibilityState
  rowSelection: RowSelectionState
  globalFilter: string
  activeTab: string
  activeFilterChips: Set<string>
  advancedFilters: AdvancedFilterConfig[]
}

// Extended column def type with meta
export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue> & {
  meta?: DataTableColumnMeta
}
