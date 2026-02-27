<template>
  <div class="relative h-full w-full overflow-hidden">
    <!-- Background Gradient with Waves -->
    <div class="absolute inset-0 overflow-hidden">
      <!-- Base gradient layer -->
      <div
        class="absolute inset-0"
        :style="{
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
        }"
      />

      <!-- Wave layers using SVG -->
      <svg
        class="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f97316" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#fbbf24" stop-opacity="0.6" />
            <stop offset="100%" stop-color="#fb923c" stop-opacity="0.8" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.4" />
            <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.5" />
            <stop offset="100%" stop-color="#1e40af" stop-opacity="0.6" />
          </linearGradient>
        </defs>

        <!-- Wave patterns -->
        <path
          v-for="i in 20"
          :key="i"
          :d="`M-200,${100 + (i - 1) * 45} C200,${50 + (i - 1) * 40} 400,${
            150 + (i - 1) * 50
          } 700,${80 + (i - 1) * 45} S1000,${140 + (i - 1) * 48} 1640,${
            60 + (i - 1) * 42
          }`"
          fill="none"
          :stroke="(i - 1) < 10 ? 'url(#waveGradient1)' : 'url(#waveGradient2)'"
          :stroke-width="(i - 1) % 3 === 0 ? 3 : 2"
          :opacity="0.3 - (i - 1) * 0.01"
        />
      </svg>

      <!-- Bottom blue curve -->
      <div
        class="absolute bottom-0 left-0 right-0 h-48"
        :style="{
          background: `
              radial-gradient(ellipse 150% 100% at 50% 100%, 
                #1e40af 0%,
                #3b82f6 30%,
                transparent 70%
              )
            `,
        }"
      />
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col items-center justify-start h-full pt-24 px-4">
      <!-- Greeting Section -->
      <div class="text-center mb-8">
        <p class="text-white/90 text-sm font-medium mb-2 italic">
          {{ currentDateTime }}
        </p>
        <h1 class="text-4xl font-bold text-white">
          Hello Dirk!
        </h1>
      </div>

      <!-- Quick Actions -->
      <div class="flex items-center gap-2 mb-4">
        <button
          v-for="action in quickActions"
          :key="action.id"
          type="button"
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-white/90 backdrop-blur-sm border-white/30 text-foreground hover:bg-white h-7 px-3"
        >
          {{ action.label }}
        </button>
      </div>

      <!-- AI Chat Input -->
      <div class="w-full max-w-2xl mb-12">
        <div class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="p-4">
            <div class="relative">
              <input
                v-model="inputValue"
                type="text"
                placeholder="Ask Advyzon AI anything... (Try dragging a file or typing @)"
                class="w-full pr-24 py-3 text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground"
              />
              <div class="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <div class="flex items-center gap-0.5">
                  <span class="size-3 rounded-full bg-emerald-500" />
                  <span class="size-3 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between px-4 pb-4">
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-2 text-muted-foreground"
            >
              <span class="i-lucide-layout-grid size-4" />
              Prompts
            </button>
            <div class="flex items-center gap-2">
              <button
                type="button"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 text-muted-foreground"
              >
                <span class="i-lucide-paperclip size-4" />
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 text-primary-foreground h-8 w-8 rounded-lg"
              >
                <span class="i-lucide-send size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Insights Section -->
      <div class="w-full max-w-5xl">
        <h2 class="text-xl font-semibold text-white mb-4 italic">
          Today's Insights &amp; Agenda
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="card in insightCards"
            :key="card.id"
            class="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div class="flex items-start justify-between mb-3">
              <div
                class="size-9 rounded-lg flex items-center justify-center"
                :class="card.iconBg"
              >
                <span :class="['size-5', card.iconClass]" />
              </div>
              <span class="text-sm font-medium" :class="card.badge.color">
                {{ card.badge.label }}
              </span>
            </div>
            <h3 class="font-medium text-foreground mb-1">
              {{ card.title }}
            </h3>
            <p class="text-sm text-muted-foreground mb-4">
              {{ card.subtitle }}
            </p>
            <button
              type="button"
              class="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {{ card.action }}
              <span class="i-lucide-arrow-right size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"

const inputValue = ref("")

const quickActions = [
  { label: "Upcoming meeting", id: "meeting" },
  { label: "Extract data", id: "extract" },
  { label: "Portfolio analysis", id: "portfolio" },
  { label: "Risk report", id: "risk" },
]

const insightCards = [
  {
    id: "meeting",
    iconBg: "bg-blue-100",
    iconClass: "i-lucide-calendar text-blue-600",
    badge: { label: "Next Up", color: "text-blue-500" },
    title: "Client Review: Bob and Susan Anderson",
    subtitle: "10:30 AM - 45m",
    action: "Prepare for Meeting",
  },
  {
    id: "market",
    iconBg: "bg-emerald-100",
    iconClass: "i-lucide-trending-up text-emerald-600",
    badge: { label: "+1.2%", color: "text-emerald-500" },
    title: "Market Update",
    subtitle: "S&P 500 trending up amid tech earnings reports.",
    action: "Full Report",
  },
  {
    id: "compliance",
    iconBg: "bg-red-100",
    iconClass: "i-lucide-alert-circle text-red-600",
    badge: { label: "Priority", color: "text-red-500" },
    title: "Compliance Alert",
    subtitle: "2 accounts require RMD review before Friday.",
    action: "Review Now",
  },
  {
    id: "performance",
    iconBg: "bg-purple-100",
    iconClass: "i-lucide-file-pen-line text-purple-600",
    badge: { label: "Draft", color: "text-blue-500" },
    title: "Q3 Performance",
    subtitle: "Draft email ready for top 20 clients.",
    action: "Open Draft",
  },
]

const currentDateTime = computed(() => {
  const now = new Date()
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const day = days[now.getDay()]
  const time = now
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase()
  return `${day}, ${time}`
})
</script>

