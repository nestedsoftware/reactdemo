import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import QuizListPage from './pages/QuizListPage'
import QuizDetailPage from './pages/QuizDetailPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<QuizListPage />} />
          <Route path="quizzes/:id" element={<QuizDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
