# Projeto Pine - Documentação

## Visão Geral

O Projeto Pine é uma aplicação web desenvolvida com Vue 3, focada na exibição de informações sobre frutas através de uma API externa. A aplicação utiliza tecnologias modernas como Vue 3 Composition API, Vue Router, TanStack Query (Vue Query), Tailwind CSS e componentes UI do shadcn.

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript progressivo para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **unplugin-vue-router**: Sistema de roteamento baseado em arquivos para Vue.js
- **TanStack Query (Vue Query)**: Gerenciamento de estado e cache para dados assíncronos
- **Tailwind CSS**: Framework CSS utility-first
- **shadcn/ui**: Componentes UI reutilizáveis
- **Bun**: Runtime JavaScript e gerenciador de pacotes
- **Vite.js**: Build tool e servidor de desenvolvimento

## Estrutura do Projeto

```
src/
├── assets/
├── client/
│   ├── get-all-fruits.ts
│   └── get-fruit-by-name.ts
├── components/
│   └── ui/
│       ├── button/
│       ├── card/
│       ├── dropdown-menu/
│       ├── tabs/
│       ├── navigation.vue
│       └── toggle-theme.vue
├── lib/
├── loaders/
│   └── fruits.ts
├── pages/
│   ├── fruits/
│   │   ├── [name].vue
│   │   └── index.vue
│   └── index.vue
├── app.vue
├── main.ts
└── router.ts
```

## Principais Funcionalidades

### 1. Sistema de Navegação

A aplicação possui um sistema de navegação principal com duas rotas:

- **Início**: Página inicial com informações do projeto
- **Conexão API**: Catálogo de frutas obtidas através da API

### 2. Tema Claro/Escuro

Implementação de alternância de tema (claro/escuro) através do componente `ToggleTheme.vue`.

### 3. Catálogo de Frutas

Exibe uma lista de frutas com:

- Nome da fruta
- Família e gênero botânicos
- Informações nutricionais (açúcar, proteína, carboidratos, gordura)
- Botão para visualizar detalhes

### 4. Página de Detalhes da Fruta

Mostra informações detalhadas sobre uma fruta específica:

- Classificação botânica completa (família, gênero, ordem, ID)
- Informações nutricionais com visualização em barras de progresso
- Botão para retornar à lista

## Componentes Principais

### App.vue

Componente raiz que define a estrutura básica da aplicação:

- Header com navegação
- Conteúdo principal com `RouterView` e `Suspense` para carregamento assíncrono
- Footer com informações de copyright

### Páginas

#### 1. Index.vue (Página Inicial)

Página de boas-vindas com:

- Card informativo sobre o projeto
- Contador de dias para o projeto
- Botão interativo para decrementar o contador

#### 2. Fruits/Index.vue (Catálogo)

Lista de frutas com:

- Estado de carregamento
- Tratamento de erros
- Grid responsivo de cards para cada fruta
- Navegação para detalhes

#### 3. Fruits/[name].vue (Detalhes)

Página dinâmica que exibe detalhes específicos de uma fruta:

- Utiliza VueQueryPlugin (`useQuery`) para buscar dados da fruta pelo nome
- Configura opções de cache (`staleTime: 1000 * 60 * 5`) e otimizações (`refetchOnWindowFocus: false`)
- Tratamento de estados de carregamento (`isLoading`, `isFetching`) e erros
- Informações botânicas em grid
- Barras de progresso para visualização nutricional
- Botão para retornar à lista

## Gerenciamento de Dados

### Loaders

Utiliza `unplugin-vue-router/data-loaders` para integração de carregamento de dados com o roteamento baseado em arquivos:

- `useFruitsData`: Carrega todas as frutas através do `defineBasicLoader`
- Permite carregamento declarativo que se integra com o sistema de roteamento

### Clients

Funções para comunicação com API integradas com TanStack Query:

- `getAllFruits`: Busca todas as frutas
- `fetchFruitByName`: Busca uma fruta específica pelo nome, usado com `useQuery` na página de detalhes

## Tipos de Dados

```typescript
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
```

## Configuração e Inicialização

### main.ts

Inicializa a aplicação Vue com os plugins necessários:

- VueQueryPlugin: Para gerenciamento de consultas assíncronas
- DataLoaderPlugin: Para carregamento de dados declarativo
- Router: Para navegação entre páginas

### router.ts

Configura o Vue Router utilizando o unplugin-vue-router para roteamento baseado em arquivos:

- Utiliza `createWebHistory` para URLs limpas
- Importa rotas geradas automaticamente por `unplugin-vue-router` através de `vue-router/auto-routes`
- Implementa roteamento baseado na estrutura de arquivos do diretório `pages/`

## Estilização

A aplicação utiliza:

- Tailwind CSS para estilização utility-first
- Componentes shadcn/ui para UI consistente
- Classes utilitárias para layout responsivo
- Sistema de tema claro/escuro

## Considerações de Performance

- Utiliza Suspense API para melhor UX durante carregamentos
- Implementa cache com TanStack Query:
  - `staleTime: 1000 * 60 * 5` (5 minutos) na página de detalhes da fruta
  - `refetchOnWindowFocus: false` para evitar solicitações desnecessárias
  - Gerenciamento otimizado de estados de carregamento (`isLoading`, `isFetching`)
  - Função de `refetch` para recarregamento manual quando necessário
- Lazy loading de componentes através do unplugin-vue-router
