import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import QuizListPage from './pages/QuizListPage'
import QuizDetailPage from './pages/QuizDetailPage'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<QuizListPage />} />
            <Route path="quizzes/:id" element={<QuizDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
