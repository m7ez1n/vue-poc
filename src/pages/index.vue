<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ref } from 'vue'

const count = ref(180)
</script>

<template>
  <main class="flex flex-col items-center justify-center h-full gap-5">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Projeto pine</CardTitle>
        <CardDescription>Projeto destinado ao banco pine</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-1">
          <p>Card usando shadcn + bun + vitejs + tailwindcss</p>
          <p class="mb-3">
            não usei o rspack por conta de ser muito novo e não ter tanta comunidade ainda
          </p>
          <p>Dias para o projeto {{ count }}</p>
        </div>
      </CardContent>
      <CardFooter class="pt-6 w-full">
        <Button v-on:click="count--" class="w-full">Diminuir um dia</Button>
      </CardFooter>
    </Card>
  </main>
</template>
