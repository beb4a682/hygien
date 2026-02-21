export type LectureStatus = 'locked' | 'available' | 'done'

export type Lecture = {
  id: string
  title: string
  description: string
  tag: string
  minutes: number
  status: LectureStatus
  testId: string
}

// база (без status)
export type LectureBase = Omit<Lecture, 'status'>

// ✅ оставляем имя LECTURES чтобы твой App не падал на импорте
export const LECTURES: LectureBase[] = [
  {
    id: 'hands',
    title: 'Чистые руки',
    description: 'Когда и как мыть руки, чтобы не занести микробы.',
    tag: 'база',
    minutes: 3,
    testId: 'hands-test',
  },
  {
    id: 'teeth',
    title: 'Зубы и улыбка',
    description: 'Как ухаживать за зубами каждый день.',
    tag: 'ежедневно',
    minutes: 4,
    testId: 'teeth-test',
  },
  {
    id: 'shower',
    title: 'Чистота тела',
    description: 'Зачем нужен душ и как заботиться о коже.',
    tag: 'гигиена',
    minutes: 4,
    testId: 'shower-test',
  },
  {
    id: 'clothes',
    title: 'Опрятная одежда',
    description: 'Почему важно менять одежду и следить за чистотой.',
    tag: 'порядок',
    minutes: 3,
    testId: 'clothes-test',
  },
]