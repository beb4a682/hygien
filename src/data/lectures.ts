export type LectureStatus = 'locked' | 'available' | 'done'

export type Lecture = {
  id: string
  title: string
  description: string
  tag: string
  minutes: number
  status: LectureStatus
  testId: string
  image: string
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
    image: '/img/lectures/hands.png'
  },
  {
    id: 'teeth',
    title: 'Зубы и улыбка',
    description: 'Как ухаживать за зубами каждый день.',
    tag: 'ежедневно',
    minutes: 4,
    testId: 'teeth',
     image: '/img/lectures/teeth.png'
  },
  {
    id: 'shower',
    title: 'Чистота тела',
    description: 'Зачем нужен душ и как заботиться о коже.',
    tag: 'гигиена',
    minutes: 4,
    testId: 'shower',
     image: '/img/lectures/shower.png'
  },
  {
    id: 'clothes',
    title: 'Опрятная одежда',
    description: 'Почему важно менять одежду и следить за чистотой.',
    tag: 'порядок',
    minutes: 3,
    testId: 'clothes',
     image: '/img/lectures/clothes.png'
  },
  {
  id: 'food',
  title: 'Гигиена еды',
  description: 'Почему важно мыть руки, продукты и есть в чистоте.',
  tag: 'еда',
  minutes: 4,
  testId: 'food',
  image: '/img/lectures/food.png'
},
{
  id: 'sleep',
  title: 'Здоровый сон',
  description: 'Как сон помогает организму и как правильно готовиться ко сну.',
  tag: 'сон',
  minutes: 4,
  testId: 'sleep',
  image: '/img/lectures/sleep.png'
}
]