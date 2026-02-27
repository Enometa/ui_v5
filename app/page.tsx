"use client"

import * as React from "react"
import { AppSidebar } from "@/components/advyzon/app-sidebar"
import { AppHeader } from "@/components/advyzon/app-header"
import { DashboardHome } from "@/components/advyzon/dashboard-home"
import { ClientTableV2 } from "@/components/advyzon/client-table-v2"
import { AIChatSidebar } from "@/components/advyzon/ai-chat-sidebar"
import { NotificationsPanel } from "@/components/advyzon/notifications-panel"
import { SettingsPanel } from "@/components/advyzon/settings-panel"
import { ReportsDialog } from "@/components/advyzon/reports-dialog"
import { TasksPanel } from "@/components/advyzon/tasks-panel"

export default function AdvyzonDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [sidebarExpanded, setSidebarExpanded] = React.useState(false)
  const [currentView, setCurrentView] = React.useState<"home" | "clients">("clients")
  const [isAIChatOpen, setIsAIChatOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [isReportsOpen, setIsReportsOpen] = React.useState(false)
  const [isTasksOpen, setIsTasksOpen] = React.useState(false)

  const toggleAIChat = () => setIsAIChatOpen((prev) => !prev)
  const toggleNotifications = () => setIsNotificationsOpen((prev) => !prev)
  const toggleSettings = () => setIsSettingsOpen((prev) => !prev)
  const toggleReports = () => setIsReportsOpen((prev) => !prev)
  const toggleTasks = () => setIsTasksOpen((prev) => !prev)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        expanded={sidebarExpanded}
        onExpandedChange={setSidebarExpanded}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AppHeader
          isAIChatOpen={isAIChatOpen}
          onToggleAIChat={toggleAIChat}
          onNotificationsClick={toggleNotifications}
          onSettingsClick={toggleSettings}
          onReportsClick={toggleReports}
          onTasksClick={toggleTasks}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          {currentView === "home" ? (
            <DashboardHome />
          ) : (
            <ClientTableV2 />
          )}
        </main>
      </div>

      {/* AI Chat Sidebar */}
      <AIChatSidebar
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        contextLabel="Client Households"
      />

      {/* Notifications Panel */}
      <NotificationsPanel
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Reports Dialog */}
      <ReportsDialog
        isOpen={isReportsOpen}
        onClose={() => setIsReportsOpen(false)}
      />

      {/* Tasks Panel */}
      <TasksPanel
        isOpen={isTasksOpen}
        onClose={() => setIsTasksOpen(false)}
      />
    </div>
  )
}
