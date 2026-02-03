import { useEffect, useMemo, useState } from 'react'

import { MISSIONS } from './data/missions'
import { PHRASES, pickPhrase } from './data/mascotPhrases'
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
import Notification from './components/Notification'
import { loadJSON, saveJSON } from './utils/storage'
import {
  addXp,
  normalizeProfile,
  unlockAchievements,
  incTests,
  incLectures,
  incObservations,
  incMissions,
  type ProfileState,
} from './data/progression'


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
  type MissionStatus = 'none' | 'active' | 'accepted' | 'done'

    type AppNotification = {
      text: string
      actionLabel?: string
      onAction?: () => void
    } | null

function App() {
  const [missionStatus, setMissionStatus] = useState<MissionStatus>('none')
  const [notification, setNotification] = useState<AppNotification>(null)

  const [activeTestId, setActiveTestId] = useState<string>('hands-test')
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)
  const [dailyMission, setDailyMission] = useState<string | null>(null)
  const [dailyMissionId, setDailyMissionId] = useState<string | null>(null)
  const [missionDate, setMissionDate] = useState<string | null>(null)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [placeValues, setPlaceValues] = useState<Record<string, number> | null>(null)
  const [testScore, setTestScore] = useState<{ score: number; max: number } | null>(null)
  const [profile, setProfile] = useState<ProfileState>(() => {
  const raw = loadJSON<any>('profile', null)
  return normalizeProfile(raw)
})

useEffect(() => {
  saveJSON('profile', profile)
}, [profile])
 const updateProfile = (fn: (p: ProfileState) => ProfileState) => {
  setProfile((prev) => unlockAchievements(fn(prev)))
}

  const selectedLecture = useMemo(() => {
    if (!selectedLectureId) return null
    return LECTURES.find((l) => l.id === selectedLectureId) ?? null
  }, [selectedLectureId])
 const giveRandomMission = () => {
  const pool = MISSIONS
  if (pool.length === 0) return
  useEffect(() => {
  const today = new Date().toISOString().slice(0, 10)
  if (missionDate && missionDate !== today) {
    // новый день — старая миссия уходит
    setDailyMission(null)
    setDailyMissionId(null)
    setMissionStatus('none')
    setMissionDate(null)
  }
}, [missionDate])

  // чтобы не повторять сразу ту же миссию
  const candidates = dailyMissionId ? pool.filter((m) => m.id !== dailyMissionId) : pool
  const picked = candidates[Math.floor(Math.random() * candidates.length)]

  setDailyMissionId(picked.id)
  setDailyMission(picked.text)
  setMissionStatus('active')

  setNotification({
    text: pickPhrase(PHRASES.mission_new),
    actionLabel: 'Ок',
    onAction: () => setNotification(null),
  })
}

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
  <div className="appShell">
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

    <main className="appMain">
  {screen === 'home' && (
  <HomeScreen
    onGoLectures={() => setScreen('lectures')}
    onGoTests={() => {
      setTestScore(null)
      setScreen('tests')
    }}
    onGoPlaceObservation={() => setScreen('placePick')}
    profile={profile}
    missionText={dailyMission}
    missionStatus={missionStatus}
    onAcceptMission={() => {
      setMissionStatus('accepted')
      setNotification({
        text: pickPhrase(PHRASES.mission_accept),
        actionLabel: 'Ок',
        onAction: () => setNotification(null),
      })
    }}
    onCompleteMission={() => {
      setMissionStatus('done')
      updateProfile((p) => addXp(incMissions(p), 8))
      setNotification({
        text: pickPhrase(PHRASES.mission_done),
        actionLabel: 'Ок',
        onAction: () => setNotification(null),
      })
    }}
    onPostponeMission={() => {
      setNotification({
        text: pickPhrase(PHRASES.mission_later),
        actionLabel: 'Ок',
        onAction: () => setNotification(null),
      })
    }}
  />
)}



 {screen === 'profile' && <ProfileScreen profile={profile} />}


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
        updateProfile((p) => addXp(incLectures(p), 10))

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
        setScreen('tests')
      }}
    />
  )}


  {screen === 'tests' && (
  <TestsScreen
    testId={activeTestId}
    onSubmit={(score, maxScore) => {
      setTestScore({ score, max: maxScore })
      const ratio = maxScore === 0 ? 0 : score / maxScore
      const xpAward =
        ratio >= 1 ? 18 :
        ratio >= 0.8 ? 12 :
        ratio >= 0.6 ? 3 :
        0

      updateProfile((p) => addXp(incTests(p), xpAward))



      // создаём миссию после прохождения теста
      giveRandomMission()


      // показываем уведомление
      setNotification({
        text: '🎉 Открыта новая миссия!',
        actionLabel: 'Перейти',
        onAction: () => {
          setScreen('home')
          setNotification(null)
        },
      })

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
        setScreen('placeObservation')
      }}
    />
  )}

 {screen === 'placeObservation' && selectedPlaceId && (
  <PlaceObservationScreen
    placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
    criteria={PLACE_CRITERIA[selectedPlaceId] ?? []}
    onBack={() => setScreen('placePick')}
    onSubmit={(values, score, maxScore) => {
      setPlaceValues(values)
      updateProfile((p) => addXp(incObservations(p), 12))

      setScreen('placeResult')
    }}
  />
)}


{screen === 'placeResult' && selectedPlaceId && placeValues && (
  <PlaceResultScreen
    placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
    values={placeValues}
    onGoHome={() => {
      setScreen('home')
      setSelectedPlaceId(null)
      setPlaceValues(null)
    }}
    onMakeMission={() => {
      const title = PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'место'
      setDailyMission(`Проведи мини-наблюдение чистоты: ${title}`)
      setMissionStatus('active')
      setScreen('home')
    }}
  />
)}

</main>
{notification && (
  <Notification
    text={notification.text}
    actionLabel={notification.actionLabel}
    onAction={notification.onAction}
    onClose={() => setNotification(null)}
  />
)}

  </div>
)

}

export default App
