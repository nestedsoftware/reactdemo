import { createContext, useContext, useState } from 'react'

type QuizContextType = {
  completedIds: string[]
  toggleCompleted: (id: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const QuizContext = createContext<QuizContextType | null>(null)

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  function toggleCompleted(id: string) {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <QuizContext.Provider
      value={{ completedIds, toggleCompleted, searchQuery, setSearchQuery }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuizContext() {
  const ctx = useContext(QuizContext)
  if (!ctx) {
    throw new Error('UseQuizContext must be used within a QuizProvider')
  }
  return ctx
}
