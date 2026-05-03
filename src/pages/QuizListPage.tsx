import { Link } from 'react-router'
import { cn } from '../lib/cn'
import Button from '../components/Button'

import { useQuizStore } from '../store/QuizStore'

import { useQuery } from '@tanstack/react-query'
import { type Quiz } from '../data/quizzes'

function QuizListPage() {
  const searchQuery = useQuizStore((state) => state.searchQuery)
  const setSearchQuery = useQuizStore((state) => state.setSearchQuery)

  const {
    data: quizzes = [],
    isLoading,
    isError,
  } = useQuery<Quiz[]>({
    queryKey: ['quizzes'],
    queryFn: () => fetch('/api/quizzes').then((res) => res.json()),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading quiz.</p>
  }

  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <h1>Quizzes</h1>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search quizzes..."
      />

      <ul>
        {filteredQuizzes.map((quiz) => (
          <li
            key={quiz.id}
            className={cn(
              'p-2 rounded',
              quiz.featured ? 'bg-yellow-100 font-bold' : 'bg-teal-100'
            )}
          >
            {quiz.name}

            <Link to={`/quizzes/${quiz.id}`}>
              <Button className="bg-red-500">View</Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default QuizListPage
