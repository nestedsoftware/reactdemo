import { Link } from 'react-router'
import { cn } from '../lib/cn'
import Button from '../components/Button'

import { quizzes } from '../data/quizzes'

import { useQuizStore } from '../store/QuizStore'

function QuizListPage() {
  const searchQuery = useQuizStore((state) => state.searchQuery)
  const setSearchQuery = useQuizStore((state) => state.setSearchQuery)
  return (
    <div>
      <h1>Quizzes</h1>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search quizzes..."
      />
      <ul>
        {quizzes.map((quiz) => (
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
