import { http, HttpResponse } from 'msw'
import { quizzes } from '../data/quizzes'

export const handlers = [
  http.get('/api/quizzes', () => {
    return HttpResponse.json(quizzes)
  }),
  http.get('/api/quizzes/:id', ({ params }) => {
    const quiz = quizzes.find((q) => q.id === params.id)
    if (!quiz) {
      return new HttpResponse(null, { status: 404 })
    }
    return HttpResponse.json(quiz)
  }),
]
