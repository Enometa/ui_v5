"use client"

import * as React from "react"
import type { Column } from "@tanstack/react-table"
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  X,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import type { DataTableColumnMeta, FilterOption } from "./types"

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  meta?: DataTableColumnMeta
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  meta,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [searchValue, setSearchValue] = React.useState("")
  const [filterOpen, setFilterOpen] = React.useState(false)
  
  const isSortable = meta?.sortable !== false && column.getCanSort()
  const isFilterable = meta?.filterable && meta?.filterOptions
  const isSearchable = meta?.searchable
  
  // Simple sortable header without dropdown
  if (isSortable && !isFilterable && !isSearchable) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span>{title}</span>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 h-3 w-3" />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 h-3 w-3" />
        ) : (
          <ArrowUpDown className="ml-2 h-3 w-3" />
        )}
      </Button>
    )
  }

  // Header with dropdown menu for sorting, search, and filtering
  if (isSortable || isFilterable || isSearchable) {
    return (
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
              <span>{title}</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDown className="ml-2 h-3 w-3" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUp className="ml-2 h-3 w-3" />
              ) : (
                <ArrowUpDown className="ml-2 h-3 w-3 opacity-50" />
              )}
              {column.getFilterValue() !== undefined && (
                <Filter className="ml-1 h-3 w-3 text-primary" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {/* Sorting Options */}
            {isSortable && (
              <>
                <DropdownMenuLabel>Sort</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                  <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  Sort Ascending
                  {column.getIsSorted() === "asc" && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                  <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                  Sort Descending
                  {column.getIsSorted() === "desc" && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </DropdownMenuItem>
                {column.getIsSorted() && (
                  <DropdownMenuItem onClick={() => column.clearSorting()}>
                    <X className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
                    Clear Sort
                  </DropdownMenuItem>
                )}
                {(isSearchable || isFilterable) && <DropdownMenuSeparator />}
              </>
            )}

            {/* Search Submenu */}
            {isSearchable && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Search className="mr-2 h-3.5 w-3.5" />
                  Search
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="p-2">
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder={`Search ${title.toLowerCase()}...`}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="h-8"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                          setSearchValue("")
                          column.setFilterValue(undefined)
                        }}
                      >
                        Clear
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => column.setFilterValue(searchValue)}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

            {/* Filter Submenu */}
            {isFilterable && meta?.filterOptions && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Filter className="mr-2 h-3.5 w-3.5" />
                  Filter
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <FilterOptionsContent
                    column={column}
                    options={meta.filterOptions}
                    filterType={meta.filterType}
                  />
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            )}

            {/* Advanced Filter */}
            {isFilterable && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFilterOpen(true)}
                >
                  <Filter className="mr-2 h-3.5 w-3.5" />
                  Advanced Filter...
                </DropdownMenuItem>
              </>
            )}

            {/* Clear Filter */}
            {column.getFilterValue() !== undefined && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => column.setFilterValue(undefined)}
                >
                  <X className="mr-2 h-3.5 w-3.5" />
                  Clear Filter
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Advanced Filter Popover */}
        <Popover open={filterOpen} onOpenChange={setFilterOpen}>
          <PopoverTrigger asChild>
            <span className="hidden" />
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <AdvancedFilterContent
              column={column}
              title={title}
              meta={meta}
              onClose={() => setFilterOpen(false)}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  // Non-sortable, non-filterable header
  return <div className="text-sm font-medium">{title}</div>
}

// Filter options content component
interface FilterOptionsContentProps<TData, TValue> {
  column: Column<TData, TValue>
  options: FilterOption[]
  filterType?: string
}

function FilterOptionsContent<TData, TValue>({
  column,
  options,
  filterType = "select",
}: FilterOptionsContentProps<TData, TValue>) {
  const currentValue = column.getFilterValue()

  if (filterType === "multi-select") {
    const selectedValues = (currentValue as string[]) || []
    
    return (
      <>
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedValues.includes(option.value)}
            onCheckedChange={(checked) => {
              const newValues = checked
                ? [...selectedValues, option.value]
                : selectedValues.filter((v) => v !== option.value)
              column.setFilterValue(newValues.length ? newValues : undefined)
            }}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
        {selectedValues.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => column.setFilterValue(undefined)}
            >
              Clear Selection
            </DropdownMenuItem>
          </>
        )}
      </>
    )
  }

  return (
    <>
      {options.map((option) => (
        <DropdownMenuItem
          key={option.value}
          onClick={() => column.setFilterValue(option.value)}
        >
          {option.icon && <span className="mr-2">{option.icon}</span>}
          <span
            className={cn(
              option.color && `text-${option.color}`,
            )}
          >
            {option.label}
          </span>
          {currentValue === option.value && (
            <Check className="ml-auto h-4 w-4" />
          )}
        </DropdownMenuItem>
      ))}
    </>
  )
}

// Advanced filter content component
interface AdvancedFilterContentProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  meta?: DataTableColumnMeta
  onClose: () => void
}

function AdvancedFilterContent<TData, TValue>({
  column,
  title,
  meta,
  onClose,
}: AdvancedFilterContentProps<TData, TValue>) {
  const [operator, setOperator] = React.useState<string>("equals")
  const [value, setValue] = React.useState("")
  const [value2, setValue2] = React.useState("")

  const operators = [
    { value: "equals", label: "Equals" },
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts With" },
    { value: "endsWith", label: "Ends With" },
    { value: "gt", label: "Greater Than" },
    { value: "gte", label: "Greater Than or Equal" },
    { value: "lt", label: "Less Than" },
    { value: "lte", label: "Less Than or Equal" },
    { value: "between", label: "Between" },
  ]

  const applyFilter = () => {
    if (operator === "between") {
      column.setFilterValue({ operator, value, value2 })
    } else {
      column.setFilterValue({ operator, value })
    }
    onClose()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Filter {title}</h4>
        <p className="text-sm text-muted-foreground">
          Set up advanced filter conditions
        </p>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium">Operator</label>
          <select
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            {operators.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Value</label>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value..."
          />
        </div>
        {operator === "between" && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Value 2</label>
            <Input
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              placeholder="Enter second value..."
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={applyFilter}>
          Apply Filter
        </Button>
      </div>
    </div>
  )
}
