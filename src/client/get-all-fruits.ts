export interface Fruit {
  id: number
  name: string
  family: string
  genus: string
  order: string
  nutritions: {
    fat: number
    sugar: number
    carbohydrates: number
    protein: number
  }
}

export const getAllFruits = async (): Promise<Fruit[]> => {
  const response = await fetch('/api/api/fruit/all', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar frutas: ${response.statusText}`)
  }

  return response.json()
}
