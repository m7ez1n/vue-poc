import type { Fruit } from './get-all-fruits'

export const fetchFruitByName = async ({ name }: Pick<Fruit, 'name'>): Promise<Fruit> => {
  const response = await fetch(`/api/api/fruit/${name}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar fruta: ${response.statusText}`)
  }

  return response.json()
}
