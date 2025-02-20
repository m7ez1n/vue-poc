<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ToggleTheme from './components/ui/toggle-theme.vue'

const route = useRoute()
const currentPath = computed(() => route.path)

const navigationItems = [
  { name: 'Início', path: '/' },
  { name: 'Conexão api', path: '/fruits' },
]
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-foreground">
    <header class="mb-24 border-b">
      <div class="container flex flex-row items-center justify-between py-4">
        <Tabs :default-value="currentPath" class="w-full">
          <TabsList class="justify-start w-full sm:w-auto">
            <RouterLink v-for="item in navigationItems" :key="item.path" :to="item.path">
              <TabsTrigger :value="item.path" class="px-4">
                {{ item.name }}
              </TabsTrigger>
            </RouterLink>
          </TabsList>
        </Tabs>

        <div class="flex items-center gap-2">
          <ToggleTheme />
          <img alt="Pine logo" src="./assets/logo.svg" width="40" height="40" />
        </div>
      </div>
    </header>

    <main class="container flex-1 mx-auto">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <component :is="Component" />
            <template #fallback>
              <div class="flex items-center justify-center h-40">
                <div class="w-8 h-8 border-b-2 rounded-full animate-spin border-primary"></div>
              </div>
            </template>
          </Suspense>
        </template>
      </RouterView>
    </main>

    <footer class="py-4 border-t">
      <div class="container mx-auto text-sm text-center text-muted-foreground">
        © {{ new Date().getFullYear() }} Projeto Pine
      </div>
    </footer>
  </div>
</template>
