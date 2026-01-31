export type LectureStatus = 'locked' | 'available' | 'done'

export type Lecture = {
  id: string
  title: string
  description: string
  tag: string
  minutes: number
  status: LectureStatus
  testId: string
  mission: string
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
    mission: 'Помой руки перед едой и после улицы.',
  },
  {
    id: 'teeth',
    title: 'Зубы и улыбка',
    description: 'Как ухаживать за зубами каждый день.',
    tag: 'ежедневно',
    minutes: 4,
    status: 'locked',
    testId: 'teeth-test',
    mission: 'Почисти зубы утром и вечером.',
  },
  {
    id: 'shower',
    title: 'Чистота тела',
    description: 'Зачем нужен душ и как заботиться о коже.',
    tag: 'гигиена',
    minutes: 4,
    status: 'locked',
    testId: 'shower-test',
    mission: 'Прими душ или умойся перед сном.',
  },
  {
    id: 'clothes',
    title: 'Опрятная одежда',
    description: 'Почему важно менять одежду и следить за чистотой.',
    tag: 'порядок',
    minutes: 3,
    status: 'locked',
    testId: 'clothes-test',
    mission: 'Надень чистую одежду на следующий день.',
  },
]

