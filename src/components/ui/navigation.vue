<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const route = useRoute()
const currentPath = computed(() => route.path)

// Lista de navegação - adicione/remova rotas conforme necessário
const navigationItems = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/about' },
]
</script>

<template>
  <div class="w-full border-b pb-2 mb-6 flex flex-row items-center justify-between">
    <Tabs :default-value="currentPath" class="w-full">
      <TabsList class="w-full sm:w-auto">
        <RouterLink v-for="item in navigationItems" :key="item.path" :to="item.path">
          <TabsTrigger
            :value="item.path"
            class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {{ item.name }}
          </TabsTrigger>
        </RouterLink>
      </TabsList>
    </Tabs>
  </div>
</template>
