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


export const LECTURES: Lecture[] = [
  {
    id: 'hands',
    title: 'Чистые руки',
    description: 'Когда и как мыть руки, чтобы не занести микробы.',
    tag: 'база',
    minutes: 3,
    status: 'available',
    testId: 'hands-test',
  },
  {
    id: 'teeth',
    title: 'Зубы и улыбка',
    description: 'Как ухаживать за зубами каждый день.',
    tag: 'ежедневно',
    minutes: 4,
    status: 'locked',
    testId: 'teeth-test',
  },
  {
    id: 'shower',
    title: 'Чистота тела',
    description: 'Зачем нужен душ и как заботиться о коже.',
    tag: 'гигиена',
    minutes: 4,
    status: 'locked',
    testId: 'shower-test',
  },
  {
    id: 'clothes',
    title: 'Опрятная одежда',
    description: 'Почему важно менять одежду и следить за чистотой.',
    tag: 'порядок',
    minutes: 3,
    status: 'locked',
    testId: 'clothes-test',
  },
]

