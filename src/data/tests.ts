export type Answer = { id: string; text: string; isCorrect: boolean }
export type Question = { id: string; text: string; answers: Answer[] }

export const TESTS: Record<string, { title: string; questions: Question[] }> = {
  'hands-test': {
    title: 'Тест: Чистые руки',
    questions: [
      {
        id: 'q1',
        text: 'Когда нужно мыть руки?',
        answers: [
          { id: 'a1', text: 'Перед едой', isCorrect: true },
          { id: 'a2', text: 'Только если они грязные', isCorrect: false },
          { id: 'a3', text: 'Раз в день', isCorrect: false },
        ],
      },
      {
        id: 'q2',
        text: 'Сколько секунд нужно мыть руки?',
        answers: [
          { id: 'a1', text: '5 секунд', isCorrect: false },
          { id: 'a2', text: '20 секунд', isCorrect: true },
          { id: 'a3', text: '1 минуту', isCorrect: false },
        ],
      },
      {
        id: 'q3',
        text: 'Что важно делать при мытье рук?',
        answers: [
          { id: 'a1', text: 'Тереть только ладони', isCorrect: false },
          { id: 'a2', text: 'Тереть между пальцами', isCorrect: true },
          { id: 'a3', text: 'Просто намочить водой', isCorrect: false },
        ],
      },
    ],
  },
}
