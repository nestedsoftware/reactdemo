import { useQuizStore } from '../store/QuizStore'
import { Link, useParams } from 'react-router'
import { quizzes } from '../data/quizzes'

function QuizDetailPage() {
  const { id } = useParams()
  const completedIds = useQuizStore((state) => state.completedIds)
  const toggleCompleted = useQuizStore((state) => state.toggleCompleted)

  const completed = completedIds.includes(id!)

  const quiz = quizzes.find((q) => q.id === id)
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
