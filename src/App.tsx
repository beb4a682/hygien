import { useMemo, useState } from 'react'

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestsScreen from './screens/TestsScreen'
import LectureViewScreen from './screens/LectureViewScreen'

type Screen = 'home' | 'profile' | 'lectures' | 'tests' | 'lectureView'

type LectureStatus = 'locked' | 'available' | 'done'
type Lecture = {
  id: string
  title: string
  description: string
  status: LectureStatus
}

// Временная "база" лекций + текстов (потом заменим на твой контент из прототипа)
const LECTURES: Lecture[] = [
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

const LECTURE_TEXT: Record<string, string> = {
  hands:
    'Мыть руки нужно: перед едой, после туалета, после улицы и после игры с животными.\n\nКак мыть правильно: намочи руки, намыль 20 секунд, потри между пальцами, смой и вытри насухо.',
  teeth:
    'Зубы чистят 2 раза в день: утром и вечером. Движения — мягкие, круговые. Не забывай язык!',
  shower:
    'Душ помогает коже быть чистой. Используй тёплую воду, мягкое мыло и чистое полотенце.',
  clothes:
    'Одежду важно менять, если она грязная или вспотела. Чистая одежда — меньше микробов.',
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)

  const selectedLecture = useMemo(() => {
    if (!selectedLectureId) return null
    return LECTURES.find((l) => l.id === selectedLectureId) ?? null
  }, [selectedLectureId])

  const headerTitle =
    screen === 'home'
      ? 'Главная'
      : screen === 'profile'
      ? 'Профиль'
      : screen === 'lectures'
      ? 'Лекции'
      : screen === 'tests'
      ? 'Тесты'
      : 'Лекция'

  return (
    <div>
      <Header
        onHome={() => {
          setScreen('home')
          setSelectedLectureId(null)
        }}
        onProfile={() => {
          setScreen('profile')
          setSelectedLectureId(null)
        }}
        title={headerTitle}
      />

      <div style={{ padding: 16 }}>
        {screen === 'home' && (
          <HomeScreen
            onGoLectures={() => setScreen('lectures')}
            onGoTests={() => setScreen('tests')}
          />
        )}

        {screen === 'profile' && <ProfileScreen />}

        {screen === 'lectures' && (
          <LecturesScreen
            lectures={LECTURES}
            onOpenLecture={(id) => {
              setSelectedLectureId(id)
              setScreen('lectureView')
            }}
          />
        )}

        {screen === 'lectureView' && selectedLecture && (
          <LectureViewScreen
            title={selectedLecture.title}
            text={LECTURE_TEXT[selectedLecture.id] ?? 'Текст пока не добавлен.'}
            onBack={() => setScreen('lectures')}
          />
        )}

        {screen === 'tests' && <TestsScreen />}
      </div>
    </div>
  )
}

export default App
