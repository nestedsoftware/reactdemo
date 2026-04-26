import { Link, Outlet } from 'react-router'
import { useQuizContext } from '../context/QuizContext'

function Layout() {
  const { completedIds } = useQuizContext()
  console.log('Layout rendered', completedIds)
  return (
    <div>
      <nav>
        <Link to="/">Quiz App</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
