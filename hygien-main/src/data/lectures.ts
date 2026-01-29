export type LectureStatus = 'locked' | 'available' | 'done'

export type Lecture = {
  id: string
  title: string
  description: string
  status: LectureStatus
}

export const LECTURES: Lecture[] = [
  {
    id: 'hands',
    title: 'Чистые руки',
    description: 'Когда мыть руки и как делать это правильно.',
    status: 'available',
  },
  {
    id: 'teeth',
    title: 'Зубы и улыбка',
    description: 'Как чистить зубы, чтобы они были здоровыми.',
    status: 'locked',
  },
  {
    id: 'shower',
    title: 'Душ и тело',
    description: 'Как заботиться о коже и чистоте тела.',
    status: 'locked',
  },
  {
    id: 'clothes',
    title: 'Одежда и порядок',
    description: 'Почему важно менять одежду и следить за чистотой.',
    status: 'locked',
  },
]
