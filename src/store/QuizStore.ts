import { create } from 'zustand'

type QuizStore = {
  completedIds: string[]
  searchQuery: string
  toggleCompleted: (id: string) => void
  setSearchQuery: (query: string) => void
}

export const useQuizStore = create<QuizStore>((set) => ({
  completedIds: [],
  searchQuery: '',
  toggleCompleted: (id) =>
    set((state) => ({
      completedIds: state.completedIds.includes(id)
        ? state.completedIds.filter((completedId) => completedId !== id)
        : [...state.completedIds, id],
    })),
  setSearchQuery: (query) =>
    set(() => ({
      searchQuery: query,
    })),
}))
