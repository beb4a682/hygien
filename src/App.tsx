import { useEffect, useMemo, useState } from 'react'

import { MISSIONS } from './data/missions'
import { PHRASES, pickPhrase } from './data/mascotPhrases'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestsScreen from './screens/TestsScreen'
import TestResultScreen from './screens/TestResultScreen'
import LectureDoneScreen from './screens/LectureDoneScreen'
import PlacePickScreen from './screens/PlacePickScreen'
import PlaceObservationScreen from './screens/PlaceObservationScreen'
import PlaceResultScreen from './screens/PlaceResultScreen'
import LectureCardsScreen from './screens/LectureCardsScreen'
import { LECTURE_CARDS } from './data/lectureCards'
import { LECTURES } from './data/lectures'
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
  ACHIEVEMENTS,
} from './data/progression'

import type { PlaceId } from './data/observationMissions'
import {
  getWeakCriterionIds,
  pickMissionsForWeakCriteria,
  type ObservationValues,
} from './utils/pickObservationMissions'

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

const achievementTitle = (id: string) =>
  ACHIEVEMENTS.find((a) => a.id === id)?.title ?? id

function App() {
  const [missionStatus, setMissionStatus] = useState<MissionStatus>('none')
  const [notification, setNotification] = useState<AppNotification>(null)

  const [activeTestId] = useState<string>('hands-test')
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)

  const [dailyMission, setDailyMission] = useState<string | null>(null)
  const [dailyMissionId, setDailyMissionId] = useState<string | null>(null)
  const [missionDate, setMissionDate] = useState<string | null>(null)

  // ✅ миссия из наблюдения какого места (kitchen/bathroom/classroom/street)
  const [dailyMissionPlaceId, setDailyMissionPlaceId] = useState<PlaceId | null>(null)

  // ✅ чеклист мини-миссии (ключи = названия шагов, чтобы детям было понятно)
  const [miniChecklist, setMiniChecklist] = useState<Record<string, boolean>>({})

  const [selectedPlaceId, setSelectedPlaceId] = useState<PlaceId | null>(null)
  const [placeValues, setPlaceValues] = useState<Record<string, number> | null>(null)
  const [testScore, setTestScore] = useState<{ score: number; max: number } | null>(null)

  const [profile, setProfile] = useState<ProfileState>(() => {
    const raw = loadJSON<any>('profile', null)
    return normalizeProfile(raw)
  })

  useEffect(() => {
    saveJSON('profile', profile)
  }, [profile])

  // ✅ загрузка чеклиста 1 раз
  useEffect(() => {
    const raw = loadJSON<Record<string, boolean>>('miniChecklist', {})
    setMiniChecklist(raw ?? {})
  }, [])

  // ✅ сохранение чеклиста
  useEffect(() => {
    saveJSON('miniChecklist', miniChecklist)
  }, [miniChecklist])

  const updateProfile = (fn: (p: ProfileState) => ProfileState) => {
    setProfile((prev) => {
      const before = prev
      const after = unlockAchievements(fn(prev))

      const beforeSet = new Set(before.achievements)
      const newlyUnlocked = after.achievements.filter((id) => !beforeSet.has(id))

      if (newlyUnlocked.length > 0) {
        const first = newlyUnlocked[0]
        queueMicrotask(() => {
          setNotification((prevNotif) => {
            if (prevNotif) return prevNotif
            return {
              text: `🏆 Открыто достижение: ${achievementTitle(first)}`,
              actionLabel: 'Круто',
              onAction: () => setNotification(null),
            }
          })
        })
      }

      return after
    })
  }

  // ✅ XP за миссию: если нет чеклиста — 5 XP
  // ✅ если чеклист есть — зависит от процента выполненного
  const calcMissionXp = () => {
    if (!dailyMissionPlaceId) return 5

    const total = Object.keys(miniChecklist).length
    const checked = Object.values(miniChecklist).filter(Boolean).length
    if (total === 0) return 0

    // 100% = 10 XP
    if (checked === total) return 10

    // >= 75% = 5 XP
    if (checked / total >= 0.75) return 5

    // иначе 0 XP (пусть добивает)
    return 0
  }

  // ✅ очистка миссии (чтобы пропадала)
  const clearMission = () => {
    setDailyMission(null)
    setDailyMissionId(null)
    setDailyMissionPlaceId(null)
    setMissionStatus('none')

    setMiniChecklist({})
    saveJSON('miniChecklist', {})
  }

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10)
    if (missionDate && missionDate !== today) {
      // новый день — старая миссия уходит
      setDailyMission(null)
      setDailyMissionId(null)
      setMissionStatus('none')
      setMissionDate(null)

      // ✅ сброс мини-миссии
      setDailyMissionPlaceId(null)
      setMiniChecklist({})
      saveJSON('miniChecklist', {})
    }
  }, [missionDate])

  const selectedLecture = useMemo(() => {
    if (!selectedLectureId) return null
    return LECTURES.find((l) => l.id === selectedLectureId) ?? null
  }, [selectedLectureId])

  const giveRandomMission = () => {
    const pool = MISSIONS
    if (pool.length === 0) return

    const candidates = dailyMissionId ? pool.filter((m) => m.id !== dailyMissionId) : pool
    const picked = candidates[Math.floor(Math.random() * candidates.length)]

    const today = new Date().toISOString().slice(0, 10)
    setMissionDate(today)

    setDailyMissionId(picked.id)
    setDailyMission(picked.text)
    setMissionStatus('active')

    // ✅ если это НЕ миссия из наблюдения — сбрасываем mini-часть
    setDailyMissionPlaceId(null)
    setMiniChecklist({})
    saveJSON('miniChecklist', {})

    setNotification({
      text: pickPhrase(PHRASES.mission_new),
      actionLabel: 'Ок',
      onAction: () => setNotification(null),
    })
  }

  // ✅ СОЗДАНИЕ МИССИИ ИЗ НАБЛЮДЕНИЯ (главное)
  const makeMissionFromObservation = (placeId: PlaceId, values: ObservationValues) => {
    const criteria = PLACE_CRITERIA[placeId] ?? []

    // берём 2 самых слабых критерия
    const weakIds = getWeakCriterionIds(placeId, criteria, values, 2)

    // подбираем 2 мини-миссии под слабые места
    const missions = pickMissionsForWeakCriteria(placeId, weakIds, 2)

    // если почему-то не нашли — дадим простой универсальный чеклист
    const steps =
      missions.length > 0
        ? missions.map((m) => m.title) // ✅ ключи = понятные названия
        : ['Быстро убери мусор', 'Протри одну поверхность']

    const checklist: Record<string, boolean> = {}
    steps.forEach((t) => (checklist[t] = false))

    const placeTitle = PLACES.find((p) => p.id === placeId)?.title ?? 'место'
    const today = new Date().toISOString().slice(0, 10)

    setMissionDate(today)
    setDailyMissionPlaceId(placeId)
    setMiniChecklist(checklist)
    saveJSON('miniChecklist', checklist)

    // сам текст миссии (коротко и понятно)
    setDailyMission(`Мини-миссия для места: ${placeTitle}`)
    setDailyMissionId(`obs_${placeId}_${today}`)
    setMissionStatus('active')

    setNotification({
      text: '✅ Мини-миссия создана по твоему наблюдению!',
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
      : screen === 'placePick' || screen === 'placeObservation' || screen === 'placeResult'
      ? 'Наблюдение'
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
              const xp = calcMissionXp()

              // ✅ если миссия-мини и XP = 0, не даём закрыть (пусть доделает)
              if (dailyMissionPlaceId && xp === 0) {
                setNotification({
                  text: 'Пока мало выполнено 😅 Сделай ещё пару шагов чеклиста!',
                  actionLabel: 'Ок',
                  onAction: () => setNotification(null),
                })
                return
              }

              setMissionStatus('done')
              updateProfile((p) => addXp(incMissions(p), xp))

              setNotification({
                text: xp >= 10 ? '🔥 Миссия выполнена идеально! +10 XP' : '✅ Миссия выполнена! +5 XP',
                actionLabel: 'Ок',
                onAction: () => setNotification(null),
              })

              // ✅ миссия пропадает
              clearMission()
            }}
            onPostponeMission={() => {
              setNotification({
                text: pickPhrase(PHRASES.mission_later),
                actionLabel: 'Ок',
                onAction: () => setNotification(null),
              })
            }}
            achievements={profile.achievements}
            onOpenAchievement={(id) => {
              const a = ACHIEVEMENTS.find((x) => x.id === id)
              if (!a) return
              setNotification({
                text: `🏆 ${a.title}\n${a.desc}`,
                actionLabel: 'Ок',
                onAction: () => setNotification(null),
              })
            }}
            missionPlaceId={dailyMissionPlaceId}
            miniChecklist={miniChecklist}
            onToggleMiniStep={(id, value) => {
              setMiniChecklist((prev) => ({ ...prev, [id]: value }))
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
              const xpAward = ratio >= 1 ? 18 : ratio >= 0.8 ? 12 : ratio >= 0.6 ? 3 : 0

              updateProfile((p) => addXp(incTests(p), xpAward))

              giveRandomMission()

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
              setSelectedPlaceId(placeId as PlaceId)
              setScreen('placeObservation')
            }}
          />
        )}

        {screen === 'placeObservation' && selectedPlaceId && (
          <PlaceObservationScreen
            placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
            criteria={PLACE_CRITERIA[selectedPlaceId] ?? []}
            onBack={() => setScreen('placePick')}
            onSubmit={(values) => {
              setPlaceValues(values)
              updateProfile((p) => addXp(incObservations(p), 12))
              setScreen('placeResult')
            }}
          />
        )}

        {screen === 'placeResult' && selectedPlaceId && placeValues && (
          <PlaceResultScreen
            placeId={selectedPlaceId as any}
            placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
            values={placeValues}
            onBack={() => {
              setScreen('placePick')
            }}
            onAddMissions={(missionIds) => {
              // пока просто добавим ОДНУ миссию "5 минут чистоты"
              const title = PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'место'
              setDailyMission(`5 минут чистоты: ${title}`)
              setDailyMissionPlaceId(selectedPlaceId)
              setScreen('home')
              setSelectedPlaceId(null)
              setPlaceValues(null)
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
