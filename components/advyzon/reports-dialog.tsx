"use client"

import * as React from "react"
import {
  X,
  Search,
  Star,
  Clock,
  AlertTriangle,
  Layers,
  Folder,
  FileText,
  Users,
  Building2,
  PieChart,
  ChevronDown,
  Calendar,
  MoreVertical,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ReportFolder {
  id: string
  name: string
  count: number
  icon?: React.ReactNode
}

interface Report {
  id: string
  name: string
  isFavorite: boolean
  publishFormats: ("pdf" | "excel")[]
  lastOpened?: string
}

const sidebarCategories: { id: string; label: string; icon: React.ReactNode; color?: string }[] = [
  { id: "favorites", label: "Favorites", icon: <Star className="size-4" />, color: "text-amber-500" },
  { id: "recent", label: "Recent", icon: <Clock className="size-4" /> },
  { id: "troubleshooting", label: "Data Troubleshooting", icon: <AlertTriangle className="size-4" /> },
  { id: "all", label: "All Reports", icon: <Layers className="size-4" /> },
]

const sidebarFolders: ReportFolder[] = [
  { id: "feb-release", name: "feb release template", count: 0 },
  { id: "client-meetings", name: "Client Meetings", count: 3 },
  { id: "internal-reviews", name: "Internal Reviews", count: 5 },
  { id: "oct-release", name: "Oct Release", count: 1 },
  { id: "patch", name: "Patch", count: 1 },
  { id: "performance", name: "Performance22323", count: 1 },
  { id: "23213", name: "23213", count: 0 },
  { id: "my-stuff", name: "My Stuff", count: 1 },
]

const sampleReports: Report[] = [
  { id: "1", name: "Awarded Stock Options Value", isFavorite: true, publishFormats: ["excel"] },
  { id: "2", name: "Awarded Stock Options Value", isFavorite: true, publishFormats: ["excel"] },
  { id: "3", name: "Balance Sheet", isFavorite: true, publishFormats: ["pdf"], lastOpened: "a month ago" },
  { id: "4", name: "Billing Summary", isFavorite: true, publishFormats: ["pdf"], lastOpened: "23 days ago" },
  { id: "5", name: "client component sag", isFavorite: true, publishFormats: ["pdf"], lastOpened: "5 days ago" },
  { id: "6", name: "Comprehensive Analysis (Section)", isFavorite: true, publishFormats: ["pdf"] },
  { id: "7", name: "contact -test", isFavorite: true, publishFormats: ["pdf", "excel"], lastOpened: "6 days ago" },
  { id: "8", name: "eMoney widget", isFavorite: true, publishFormats: ["pdf"] },
  { id: "9", name: "Evan-Test-GI-91739", isFavorite: true, publishFormats: ["pdf", "excel"], lastOpened: "5 months ago" },
  { id: "10", name: "Expanded Current vs. Target Model", isFavorite: true, publishFormats: ["pdf", "excel"], lastOpened: "a month ago" },
  { id: "11", name: "GI-66664", isFavorite: true, publishFormats: ["pdf"], lastOpened: "a month ago" },
  { id: "12", name: "net vs gross of fee component", isFavorite: true, publishFormats: ["pdf", "excel"], lastOpened: "a month ago" },
  { id: "13", name: "Purchase & Sale (YTD)", isFavorite: true, publishFormats: ["pdf", "excel"], lastOpened: "4 months ago" },
  { id: "14", name: "Qtrly Template (INTERNAL USE)", isFavorite: true, publishFormats: ["pdf"], lastOpened: "a year ago" },
  { id: "15", name: "rmd", isFavorite: true, publishFormats: ["pdf", "excel"], lastOpened: "7 months ago" },
  { id: "16", name: "Sample Report", isFavorite: true, publishFormats: ["pdf"], lastOpened: "2 months ago" },
]

interface ReportsDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportsDialog({ isOpen, onClose }: ReportsDialogProps) {
  const [activeTab, setActiveTab] = React.useState<"client" | "firm" | "composite">("client")
  const [activeCategory, setActiveCategory] = React.useState("favorites")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredReports = React.useMemo(() => {
    if (!searchQuery.trim()) return sampleReports
    return sampleReports.filter((report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/30" 
          onClick={onClose}
        />
      )}
      
      {/* Slide-in Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full z-50 bg-[#3bb4c1] transition-transform duration-300 ease-in-out w-full max-w-4xl shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 size-8 text-white hover:bg-white/20 z-10"
          onClick={onClose}
        >
          <X className="size-5" />
        </Button>

        {/* Main Container */}
        <div className="h-full flex flex-col pt-10 px-4 pb-4">
          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <div className="flex bg-white/10 rounded-lg p-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("client")}
                className={cn(
                  "gap-2 px-4 rounded-md text-sm",
                  activeTab === "client"
                    ? "bg-white text-primary hover:bg-white"
                    : "text-white hover:bg-white/20"
                )}
              >
                <Users className="size-4" />
                Client Reports
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("firm")}
                className={cn(
                  "gap-2 px-4 rounded-md text-sm",
                  activeTab === "firm"
                    ? "bg-white text-gray-700 hover:bg-white"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                )}
              >
                <Building2 className="size-4" />
                Firm Reports
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab("composite")}
                className={cn(
                  "gap-2 px-4 rounded-md text-sm",
                  activeTab === "composite"
                    ? "bg-white text-gray-700 hover:bg-white"
                    : "bg-gray-600 text-white hover:bg-gray-500"
                )}
              >
                <PieChart className="size-4" />
                Composite Reports
              </Button>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex-1 bg-white rounded-lg overflow-hidden flex">
            {/* Left Sidebar */}
            <div className="w-60 border-r border-border flex flex-col">
              <ScrollArea className="flex-1 p-4">
                {/* Categories */}
                <div className="space-y-1">
                  {sidebarCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                        activeCategory === category.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-muted-foreground"
                      )}
                    >
                      <span className={category.color}>{category.icon}</span>
                      {category.label}
                      {category.id === "favorites" && (
                        <span className="ml-auto text-xs text-primary">(22)</span>
                      )}
                      {category.id === "troubleshooting" && (
                        <span className="ml-auto text-xs text-muted-foreground">(5)</span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Folders */}
                <div className="mt-6 space-y-1">
                  {sidebarFolders.map((folder) => (
                    <button
                      key={folder.id}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted text-muted-foreground text-left"
                    >
                      <Folder className="size-4" />
                      <span className="flex-1 truncate">{folder.name}</span>
                      <span className="text-xs">({folder.count})</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-border">
                <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                  + Create Template
                </Button>
                <button className="w-full text-center text-primary text-sm mt-3 hover:underline">
                  Go To Report Library {">>"}
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              {/* Top Filters */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Report Target :</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <span className="size-5 rounded bg-green-500 text-white text-xs flex items-center justify-center font-medium">A</span>
                    <span className="text-primary">All Accounts 0</span>
                    <ChevronDown className="size-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Report Period :</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Calendar className="size-4 text-primary" />
                    <span className="text-primary">01-01-2025</span>
                    <span>-</span>
                    <span className="text-primary">12-31-2025</span>
                  </Button>
                </div>
              </div>

              {/* Content Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Favorites</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-48 h-9"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="size-9">
                    <Menu className="size-5" />
                  </Button>
                </div>
              </div>

              {/* Reports Table */}
              <ScrollArea className="flex-1">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="w-24">Publish</TableHead>
                      <TableHead className="w-32">Last Opened</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-muted/50 cursor-pointer">
                        <TableCell>
                          <Star
                            className={cn(
                              "size-4",
                              report.isFavorite
                                ? "text-amber-500 fill-amber-500"
                                : "text-muted-foreground"
                            )}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="size-6">
                            <MoreVertical className="size-4" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {report.publishFormats.includes("pdf") && (
                              <span className="size-6 rounded bg-red-100 text-red-600 text-xs flex items-center justify-center font-bold">
                                PDF
                              </span>
                            )}
                            {report.publishFormats.includes("excel") && (
                              <span className="size-6 rounded bg-green-100 text-green-600 text-xs flex items-center justify-center font-bold">
                                X
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {report.lastOpened || ""}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
