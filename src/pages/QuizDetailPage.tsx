import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { quizzes } from '../data/quizzes'

function QuizDetailPage() {
  const { id } = useParams()
  const quiz = quizzes.find((q) => q.id === id)
  const [completed, setCompleted] = useState(false)

  if (!quiz) {
    return <p>Quiz not found.</p>
  }

  return (
    <div>
      <Link to="/">← Back to quizzes</Link>
      <h1 className="text-3xl font-bold text-blue-600">{quiz.name}</h1>
      <p>{quiz.description}</p>
      <button onClick={() => setCompleted(!completed)}>
        {completed ? '✓ Completed' : 'Mark as completed'}
      </button>
    </div>
  )
}

export default QuizDetailPage
