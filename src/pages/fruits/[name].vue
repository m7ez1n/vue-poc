<script setup lang="ts">
import { fetchFruitByName } from '@/client/get-fruit-by-name'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/vue-query'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const fruitName = route.params.name as string

const {
  data: fruit,
  isLoading,
  isFetching,
  error,
  refetch: reload,
} = useQuery({
  queryKey: ['fruit', fruitName],
  queryFn: () => fetchFruitByName({ name: fruitName }),
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
})

function goBack() {
  router.push('/fruits')
}
</script>

<template>
  <div class="container py-8">
    <Button variant="ghost" class="mb-6" @click="goBack"> ← Voltar para lista </Button>

    <div v-if="isLoading || isFetching" class="flex justify-center my-12">
      <div class="w-12 h-12 border-b-2 rounded-full animate-spin border-primary"></div>
    </div>

    <div v-else-if="error" class="p-4 rounded-md bg-destructive/10 text-destructive">
      <h3 class="font-medium">Erro ao carregar dados da fruta</h3>
      <p>{{ error.message }}</p>
      <Button @click="reload" variant="outline" class="mt-4">Tentar novamente</Button>
    </div>

    <div v-else-if="fruit" class="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle class="text-3xl capitalize">{{ fruitName }}</CardTitle>
          <CardDescription class="text-lg"> {{ fruit.genus }} {{ fruit.family }} </CardDescription>
        </CardHeader>

        <CardContent>
          <div class="space-y-6">
            <div>
              <h3 class="mb-3 text-xl font-medium">Classificação Botânica</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-3 rounded-md bg-muted/50">
                  <span class="text-sm text-muted-foreground">Família</span>
                  <p class="font-medium">{{ fruit.family }}</p>
                </div>
                <div class="p-3 rounded-md bg-muted/50">
                  <span class="text-sm text-muted-foreground">Gênero</span>
                  <p class="font-medium">{{ fruit.genus }}</p>
                </div>
                <div class="p-3 rounded-md bg-muted/50">
                  <span class="text-sm text-muted-foreground">Ordem</span>
                  <p class="font-medium">{{ fruit.order }}</p>
                </div>
                <div class="p-3 rounded-md bg-muted/50">
                  <span class="text-sm text-muted-foreground">ID</span>
                  <p class="font-medium">{{ fruit.id }}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="mb-3 text-xl font-medium">Informações Nutricionais</h3>
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-full h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      class="h-full bg-amber-500"
                      :style="`width: ${Math.min(fruit.nutritions.carbohydrates * 3, 100)}%`"
                    ></div>
                  </div>
                  <span class="w-24 text-sm">
                    Carboidratos: {{ fruit.nutritions.carbohydrates }}g
                  </span>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-full h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      class="h-full bg-rose-500"
                      :style="`width: ${Math.min(fruit.nutritions.sugar * 5, 100)}%`"
                    ></div>
                  </div>
                  <span class="w-24 text-sm"> Açúcar: {{ fruit.nutritions.sugar }}g </span>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-full h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      class="h-full bg-blue-500"
                      :style="`width: ${Math.min(fruit.nutritions.protein * 12, 100)}%`"
                    ></div>
                  </div>
                  <span class="w-24 text-sm"> Proteína: {{ fruit.nutritions.protein }}g </span>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-full h-4 overflow-hidden rounded-full bg-muted">
                    <div
                      class="h-full bg-yellow-500"
                      :style="`width: ${Math.min(fruit.nutritions.fat * 10, 100)}%`"
                    ></div>
                  </div>
                  <span class="w-24 text-sm"> Gordura: {{ fruit.nutritions.fat }}g </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div class="flex justify-center mt-8">
        <Button @click="reload" variant="outline">Atualizar dados</Button>
      </div>
    </div>
  </div>
</template>
