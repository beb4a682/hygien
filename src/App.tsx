import { useMemo, useState } from 'react'

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestsScreen from './screens/TestsScreen'
import LectureViewScreen from './screens/LectureViewScreen'
import LectureDoneScreen from './screens/LectureDoneScreen'
import PlacePickScreen from './screens/PlacePickScreen'
import PlaceObservationScreen from './screens/PlaceObservationScreen'
import PlaceResultScreen from './screens/PlaceResultScreen'


type Screen =
  | 'home'
  | 'profile'
  | 'lectures'
  | 'tests'
  | 'lectureView'
  | 'lectureDone'
  | 'placePick'
  | 'placeObservation'
  | 'placeResult'


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
// ===== Наблюдение места: данные и критерии =====
type Place = { id: string; title: string; hint: string }
type Criterion = { id: string; text: string; help: string; weight: 1 | 2 | 3 }

const PLACES: Place[] = [
  { id: 'kitchen', title: 'Кухня', hint: 'Где готовят и едят.' },
  { id: 'bathroom', title: 'Ванная', hint: 'Где моют руки и чистят зубы.' },
  { id: 'classroom', title: 'Класс', hint: 'Парта, стул, вокруг.' },
  { id: 'street', title: 'Улица / двор', hint: 'Лавочка, площадка, подъезд.' },
]

const PLACE_CRITERIA: Record<string, Criterion[]> = {
  kitchen: [
    { id: 'k1', text: 'Поверхности выглядят чистыми', help: 'Стол/столешница без липкости и пятен.', weight: 3 },
    { id: 'k2', text: 'Нет мусора на виду', help: 'Убраны крошки, упаковки, остатки еды.', weight: 2 },
    { id: 'k3', text: 'Есть мыло и вода рядом', help: 'Можно быстро помыть руки перед едой.', weight: 3 },
    { id: 'k4', text: 'Нет неприятного запаха', help: 'Если пахнет плохо — нужна уборка/проветривание.', weight: 2 },
    { id: 'k5', text: 'Посуда/салфетки выглядят опрятно', help: 'Нет явно грязных предметов рядом.', weight: 1 },
  ],
  bathroom: [
    { id: 'b1', text: 'Раковина выглядит чистой', help: 'Нет заметной грязи/налёта на виду.', weight: 3 },
    { id: 'b2', text: 'Есть мыло', help: 'Жидкое/твёрдое — не важно, главное есть.', weight: 3 },
    { id: 'b3', text: 'Есть чистое полотенце/салфетки', help: 'Вытирать руки — тоже часть гигиены.', weight: 2 },
    { id: 'b4', text: 'Пол не мокрый и не грязный', help: 'Чтобы не поскользнуться и не тащить грязь.', weight: 2 },
    { id: 'b5', text: 'Нет резкого неприятного запаха', help: 'Если есть — нужно проветрить/убрать.', weight: 1 },
  ],
  classroom: [
    { id: 'c1', text: 'Парта чистая', help: 'Нет липких пятен, следов еды, крошек.', weight: 3 },
    { id: 'c2', text: 'Вокруг нет мусора', help: 'Бумажки/обёртки лучше убрать.', weight: 2 },
    { id: 'c3', text: 'Руки выглядят чистыми', help: 'После улицы — лучше помыть/протереть.', weight: 2 },
    { id: 'c4', text: 'Можно проветрить', help: 'Свежий воздух помогает и чистоте, и вниманию.', weight: 1 },
    { id: 'c5', text: 'Вещи лежат аккуратно', help: 'Бардак = сложнее поддерживать чистоту.', weight: 1 },
  ],
  street: [
    { id: 's1', text: 'Нет мусора рядом', help: 'Чистота места = меньше грязи на руках.', weight: 3 },
    { id: 's2', text: 'Скамейка/поверхность без явной грязи', help: 'Если грязно — лучше не трогать.', weight: 2 },
    { id: 's3', text: 'После места можно помыть/протереть руки', help: 'Салфетки/санитайзер/вода рядом — плюс.', weight: 2 },
    { id: 's4', text: 'Нет сильной вони/дыма', help: 'Если есть — лучше уйти в другое место.', weight: 2 },
    { id: 's5', text: 'Безопасно стоять/сидеть', help: 'Нет стекла, острых предметов, луж.', weight: 3 },
  ],
}


function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [placeScore, setPlaceScore] = useState<{ score: number; max: number } | null>(null)

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
            onGoPlaceObservation={() => setScreen('placePick')}
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
            onDone={() => setScreen('lectureDone')}
          />
        )}

        {screen === 'lectureDone' && selectedLecture && (
          <LectureDoneScreen
            title={selectedLecture.title}
            onGoHome={() => {
              setScreen('home')
              setSelectedLectureId(null)
            }}
            onBackToLectures={() => setScreen('lectures')}
          />
        )}


        {screen === 'tests' && <TestsScreen />}
        {screen === 'placePick' && (
          <PlacePickScreen
            places={PLACES}
            onPick={(placeId) => {
              setSelectedPlaceId(placeId)
              setPlaceScore(null)
              setScreen('placeObservation')
            }}
          />
        )}

        {screen === 'placeObservation' && selectedPlaceId && (
          <PlaceObservationScreen
            placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
            criteria={PLACE_CRITERIA[selectedPlaceId] ?? []}
            onBack={() => setScreen('placePick')}
            onSubmit={(score, maxScore) => {
              setPlaceScore({ score, max: maxScore })
              setScreen('placeResult')
            }}
          />
        )}

        {screen === 'placeResult' && selectedPlaceId && placeScore && (
          <PlaceResultScreen
            placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
            score={placeScore.score}
            maxScore={placeScore.max}
            onTryAgain={() => setScreen('placeObservation')}
            onGoHome={() => {
              setScreen('home')
              setSelectedPlaceId(null)
              setPlaceScore(null)
            }}
          />
        )}

      </div>
    </div>
  )
}

export default App
