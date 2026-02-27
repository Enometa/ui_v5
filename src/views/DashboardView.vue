<template>
  <div class="flex h-screen bg-background overflow-hidden">
    <AppSidebar
      :collapsed="sidebarCollapsed"
      :expanded="sidebarExpanded"
      :current-view="currentView"
      @toggle="sidebarCollapsed = !sidebarCollapsed"
      @update:expanded="sidebarExpanded = $event"
      @update:view="currentView = $event"
    />

    <div class="flex-1 flex flex-col min-w-0">
      <AppHeader
        :is-ai-chat-open="isAIChatOpen"
        @toggle-ai-chat="toggleAIChat"
        @open-notifications="toggleNotifications"
        @open-settings="toggleSettings"
        @open-reports="toggleReports"
        @open-tasks="toggleTasks"
      />

      <main class="flex-1 overflow-hidden">
        <DashboardHome v-if="currentView === 'home'" />
        <ClientTableV2 v-else />
      </main>
    </div>

    <AIChatSidebar
      :is-open="isAIChatOpen"
      context-label="Client Households"
      @close="isAIChatOpen = false"
    />

    <NotificationsPanel
      :is-open="isNotificationsOpen"
      @close="isNotificationsOpen = false"
    />

    <SettingsPanel
      :is-open="isSettingsOpen"
      @close="isSettingsOpen = false"
    />

    <ReportsDialog
      :is-open="isReportsOpen"
      @close="isReportsOpen = false"
    />

    <TasksPanel
      :is-open="isTasksOpen"
      @close="isTasksOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppSidebar from "@/components/advyzon/AppSidebar.vue";
import AppHeader from "@/components/advyzon/AppHeader.vue";
import DashboardHome from "@/components/advyzon/DashboardHome.vue";
import ClientTableV2 from "@/components/advyzon/ClientTableV2.vue";
import AIChatSidebar from "@/components/advyzon/AIChatSidebar.vue";
import NotificationsPanel from "@/components/advyzon/NotificationsPanel.vue";
import SettingsPanel from "@/components/advyzon/SettingsPanel.vue";
import ReportsDialog from "@/components/advyzon/ReportsDialog.vue";
import TasksPanel from "@/components/advyzon/TasksPanel.vue";

type ViewType = "home" | "clients";

const sidebarCollapsed = ref(false);
const sidebarExpanded = ref(false);
const currentView = ref<ViewType>("clients");

const isAIChatOpen = ref(false);
const isNotificationsOpen = ref(false);
const isSettingsOpen = ref(false);
const isReportsOpen = ref(false);
const isTasksOpen = ref(false);

const toggleAIChat = () => (isAIChatOpen.value = !isAIChatOpen.value);
const toggleNotifications = () =>
  (isNotificationsOpen.value = !isNotificationsOpen.value);
const toggleSettings = () => (isSettingsOpen.value = !isSettingsOpen.value);
const toggleReports = () => (isReportsOpen.value = !isReportsOpen.value);
const toggleTasks = () => (isTasksOpen.value = !isTasksOpen.value);
</script>

