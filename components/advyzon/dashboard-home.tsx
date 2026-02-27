"use client"

import * as React from "react"
import {
  Calendar,
  TrendingUp,
  AlertCircle,
  FileEdit,
  Paperclip,
  Send,
  ArrowRight,
  LayoutGrid,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const quickActions = [
  { label: "Upcoming meeting", id: "meeting" },
  { label: "Extract data", id: "extract" },
  { label: "Portfolio analysis", id: "portfolio" },
  { label: "Risk report", id: "risk" },
]

const insightCards = [
  {
    id: "meeting",
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: { label: "Next Up", color: "text-blue-500" },
    title: "Client Review: Bob and Susan Anderson",
    subtitle: "10:30 AM - 45m",
    action: "Prepare for Meeting",
  },
  {
    id: "market",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    badge: { label: "+1.2%", color: "text-emerald-500" },
    title: "Market Update",
    subtitle: "S&P 500 trending up amid tech earnings reports.",
    action: "Full Report",
  },
  {
    id: "compliance",
    icon: AlertCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    badge: { label: "Priority", color: "text-red-500" },
    title: "Compliance Alert",
    subtitle: "2 accounts require RMD review before Friday.",
    action: "Review Now",
  },
  {
    id: "performance",
    icon: FileEdit,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: { label: "Draft", color: "text-blue-500" },
    title: "Q3 Performance",
    subtitle: "Draft email ready for top 20 clients.",
    action: "Open Draft",
  },
]

export function DashboardHome() {
  const [inputValue, setInputValue] = React.useState("")

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const getCurrentDateTime = () => {
    const now = new Date()
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = days[now.getDay()]
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase()
    return `${day}, ${time}`
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background Gradient with Waves */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient layer */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 100% at 50% 0%, 
                #6366f1 0%, 
                #8b5cf6 20%,
                #f97316 45%,
                #fbbf24 60%,
                #fb923c 75%,
                #ec4899 90%,
                #1e40af 100%
              )
            `,
          }}
        />
        
        {/* Wave layers using SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Wave patterns */}
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M-200,${100 + i * 45} C200,${50 + i * 40} 400,${150 + i * 50} 700,${80 + i * 45} S1000,${140 + i * 48} 1640,${60 + i * 42}`}
              fill="none"
              stroke={i < 10 ? "url(#waveGradient1)" : "url(#waveGradient2)"}
              strokeWidth={i % 3 === 0 ? "3" : "2"}
              opacity={0.3 - i * 0.01}
            />
          ))}
        </svg>
        
        {/* Bottom blue curve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: `
              radial-gradient(ellipse 150% 100% at 50% 100%, 
                #1e40af 0%,
                #3b82f6 30%,
                transparent 70%
              )
            `,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start h-full pt-24 px-4">
        {/* Greeting Section */}
        <div className="text-center mb-8">
          <p className="text-white/90 text-sm font-medium mb-2 italic">
            {getCurrentDateTime()}
          </p>
          <h1 className="text-4xl font-bold text-white">
            Hello Dirk!
          </h1>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm border-white/30 text-foreground hover:bg-white"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* AI Chat Input */}
        <div className="w-full max-w-2xl mb-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Advyzon AI anything... (Try dragging a file or typing @)"
                  className="w-full pr-24 py-3 text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    <span className="size-3 rounded-full bg-emerald-500" />
                    <span className="size-3 rounded-full bg-primary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <LayoutGrid className="size-4" />
                Prompts
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="size-8 text-muted-foreground">
                  <Paperclip className="size-4" />
                </Button>
                <Button size="icon" className="size-8 bg-primary hover:bg-primary/90 rounded-lg">
                  <Send className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Section */}
        <div className="w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-white mb-4 italic">
            {"Today's Insights & Agenda"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {insightCards.map((card) => (
              <div
                key={card.id}
                className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn("size-9 rounded-lg flex items-center justify-center", card.iconBg)}>
                    <card.icon className={cn("size-5", card.iconColor)} />
                  </div>
                  <span className={cn("text-sm font-medium", card.badge.color)}>
                    {card.badge.label}
                  </span>
                </div>
                <h3 className="font-medium text-foreground mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{card.subtitle}</p>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {card.action}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
