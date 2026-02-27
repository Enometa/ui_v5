"use client"

import * as React from "react"
import {
  X,
  Sparkles,
  Paperclip,
  Send,
  ChevronDown,
  LayoutGrid,
  Edit3,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface AIChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  contextLabel?: string
}

export function AIChatSidebar({
  isOpen,
  onClose,
  contextLabel = "Client Households",
}: AIChatSidebarProps) {
  const [inputValue, setInputValue] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("chat")
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Focus input when sidebar opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    // Handle submit logic here
    setInputValue("")
  }

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <aside
        className={cn(
          "fixed top-14 right-0 bottom-0 w-full sm:w-96 bg-white border-l border-border z-50",
          "flex flex-col shadow-lg",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-9 bg-muted/50">
              <TabsTrigger value="chat" className="text-sm px-4">
                Chat
              </TabsTrigger>
              <TabsTrigger value="outputs" className="text-sm px-4">
                Outputs
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
              <Edit3 className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
              <Settings className="size-4" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Welcome Icon */}
          <div className="size-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
            <DollarSparkleIcon className="size-8 text-primary" />
          </div>

          {/* Welcome Message */}
          <p className="text-muted-foreground text-center">
            How can I help you today?
          </p>
        </div>

        {/* Bottom Input Section */}
        <div className="p-4 border-t border-border space-y-3">
          {/* Context Selector */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <span className="text-muted-foreground">{"<-"}</span>
            <span>{contextLabel}</span>
            <ChevronDown className="size-3.5" />
          </button>

          {/* Input Field */}
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Advyzon AI anything..."
                className="w-full h-11 pl-4 pr-24 rounded-lg border border-border bg-white text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground hover:text-foreground"
                >
                  <Paperclip className="size-4" />
                </Button>
                <Button
                  type="submit"
                  size="icon"
                  className="size-8 bg-primary hover:bg-primary/90"
                  disabled={!inputValue.trim()}
                >
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Prompts Button */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            <LayoutGrid className="size-4" />
            <span>Prompts</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// Custom dollar/sparkle icon to match Advyzon branding
function DollarSparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12" />
      <path d="M15 9.5c0-1.38-1.34-2.5-3-2.5s-3 1.12-3 2.5 1.34 2.5 3 2.5 3 1.12 3 2.5-1.34 2.5-3 2.5" />
    </svg>
  )
}
