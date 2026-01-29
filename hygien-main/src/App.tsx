import { useMemo, useState } from 'react'

import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestsScreen from './screens/TestsScreen'
import TestResultScreen from './screens/TestResultScreen'
import LectureViewScreen from './screens/LectureViewScreen'
import LectureDoneScreen from './screens/LectureDoneScreen'
import PlacePickScreen from './screens/PlacePickScreen'
import PlaceObservationScreen from './screens/PlaceObservationScreen'
import PlaceResultScreen from './screens/PlaceResultScreen'
import LectureCardsScreen from './screens/LectureCardsScreen'
import { LECTURE_CARDS } from './data/lectureCards'
import { LECTURES } from './data/lectures'
import { LECTURE_TEXT } from './data/lectureText'
import { PLACES } from './data/places'
import { PLACE_CRITERIA } from './data/placeCriteria'


type Screen =
  | 'home'
  | 'profile'
  | 'lectures'
  | 'tests'
  | 'testResult'
  | 'lectureView'
  | 'lectureDone'
  | 'placePick'
  | 'placeObservation'
  | 'placeResult'
function App() {
  const [activeTestId, setActiveTestId] = useState<string>('hands-test')
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)
  const [dailyMission, setDailyMission] = useState<string | null>(null)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [placeScore, setPlaceScore] = useState<{ score: number; max: number } | null>(null)
  const [testScore, setTestScore] = useState<{ score: number; max: number } | null>(null)
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
      : screen === 'tests' || screen === 'testResult'
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
          onGoTests={() => {
            setTestScore(null)
            setActiveTestId('hands-test')
            setScreen('tests')
          }}

          onGoPlaceObservation={() => setScreen('placePick')}
          missionText={dailyMission}
          onAcceptMission={() => {
            // пока просто подтверждение, позже дадим XP/галочку
            // можно добавить alert или тост, но пока оставим пустым
          }}
          onPostponeMission={() => {
            // можно оставить миссию, просто закрыть действие
          }}
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
          <LectureCardsScreen
            title={selectedLecture.title}
            cards={LECTURE_CARDS[selectedLecture.id] ?? []}
            onBack={() => setScreen('lectures')}
            onDone={() => {
              setDailyMission(selectedLecture.mission)
              setScreen('lectureDone')
            }}

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
            onGoTest={() => {
              setTestScore(null)
              setActiveTestId(selectedLecture.testId)
              setScreen('tests')
            }}
          />
        )}


        {screen === 'tests' && (
          <TestsScreen
            testId={activeTestId}
            onSubmit={(score, maxScore) => {
              setTestScore({ score, max: maxScore })
              setScreen('testResult')
            }}
          />
        )}


        {screen === 'testResult' && testScore && (
          <TestResultScreen
            score={testScore.score}
            maxScore={testScore.max}
            onTryAgain={() => {
              setTestScore(null)
              setScreen('tests')
            }}
            onGoHome={() => {
              setTestScore(null)
              setScreen('home')
            }}
          />
        )}
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
