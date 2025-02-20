import { getAllFruits } from '@/client/get-all-fruits'
import { defineBasicLoader } from 'unplugin-vue-router/data-loaders/basic'

export const useFruitsData = defineBasicLoader('/fruits', async () => getAllFruits(), {
  key: 'fetch-all-fruits',
})
