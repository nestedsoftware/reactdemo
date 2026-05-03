import { useQuizStore } from '../store/QuizStore'
import { Link, useParams } from 'react-router'

import { useQuery } from '@tanstack/react-query'
import { type Quiz } from '../data/quizzes'

function QuizDetailPage() {
  const { id } = useParams()
  const completedIds = useQuizStore((state) => state.completedIds)
  const toggleCompleted = useQuizStore((state) => state.toggleCompleted)

  const completed = completedIds.includes(id!)

  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery<Quiz>({
    queryKey: ['quiz', id],
    queryFn: () => fetch(`/api/quizzes/${id}`).then((res) => res.json()),
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error loading quiz.</p>
  }

  if (!quiz) {
    return <p>Quiz not found.</p>
  }

  return (
    <div>
      <Link to="/">← Back to quizzes</Link>
      <h1 className="text-3xl font-bold text-blue-600">{quiz.name}</h1>
      <p>{quiz.description}</p>
      <button onClick={() => toggleCompleted(id!)}>
        {completed ? '✓ Completed' : 'Mark as completed'}
      </button>
    </div>
  )
}

export default QuizDetailPage
