import { Link } from 'react-router'
import { cn } from '../lib/cn'
import Button from '../components/Button'

import { quizzes } from '../data/quizzes'

function QuizListPage() {
  return (
    <div>
      <h1>Quizzes</h1>
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
