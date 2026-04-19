export type Quiz = {
  id: string
  name: string
  description: string
  featured?: boolean
}

export const quizzes: Quiz[] = [
  {
    id: '1',
    name: 'JavaScript Basics',
    description: 'Test your JS knowledge.',
    featured: true,
  },
  { id: '2', name: 'React Fundamentals', description: 'Core React concepts.' },
  {
    id: '3',
    name: 'TypeScript Essentials',
    description: 'Types, interfaces, and more.',
  },
]
