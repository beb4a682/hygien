import { useEffect, useMemo, useRef, useState } from 'react'

import { MISSIONS } from './data/missions'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LecturesScreen from './screens/LecturesScreen'
import TestResultScreen from './screens/TestResultScreen'
import LectureDoneScreen from './screens/LectureDoneScreen'
import PlacePickScreen from './screens/PlacePickScreen'
import PlaceObservationScreen from './screens/PlaceObservationScreen'
import PlaceResultScreen from './screens/PlaceResultScreen'
import LectureCardsScreen from './screens/LectureCardsScreen'

import TestsSpisocScreen from './screens/TestsSpisocScreen'
import TestViewScreen from './screens/TestViewScreen'

import { LECTURE_CARDS } from './data/lectureCards'
import { LECTURES, type Lecture } from './data/lectures'
import type { PlaceId } from './data/observationMissions'
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
  markLectureDone,
  type ProfileState,
  type AchievementId,
  ACHIEVEMENTS,
} from './data/progression'
import { TESTS } from './data/tests'

type Screen =
  | 'home'
  | 'profile'
  | 'lectures'
  | 'lectureView'
  | 'lectureDone'
  | 'testsList'
  | 'testView'
  | 'testResult'
  | 'placePick'
  | 'placeObservation'
  | 'placeResult'

type AppNotification = {
  text: string
  actionLabel?: string
  onAction?: () => void
} | null

type MissionSource = 'daily' | 'lecture' | 'test' | 'observation'

export type TodayMission = {
  uid: string
  baseId: string
  text: string
  source: MissionSource
  done: boolean
  createdAt: number
}

const achievementTitle = (id: string) =>
  ACHIEVEMENTS.find((a) => a.id === id)?.title ?? id

const todayStr = () => new Date().toISOString().slice(0, 10)

function makeUid(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function pickRandomMission(excludeBaseIds?: Set<string>) {
  const pool = Array.isArray(MISSIONS) ? MISSIONS : []
  if (pool.length === 0) {
    return { id: makeUid('fallback'), text: 'Сделай маленький шаг к чистоте' }
  }

  const maxTries = pool.length * 3
  let tries = 0

  while (tries < maxTries) {
    tries++
    const m = pool[Math.floor(Math.random() * pool.length)]
    if (!m?.id) continue
    if (excludeBaseIds && excludeBaseIds.has(m.id)) continue
    return { id: m.id, text: (m.text ?? '').trim() || 'Сделай маленький шаг к чистоте' }
  }

  const m = pool[Math.floor(Math.random() * pool.length)]
  return {
    id: m?.id ?? makeUid('m'),
    text: (m?.text ?? '').trim() || 'Сделай маленький шаг к чистоте',
  }
}

function pickRandomMissions(count: number, avoid: Set<string>) {
  const picked: { id: string; text: string }[] = []
  while (picked.length < count) {
    const m = pickRandomMission(avoid)
    avoid.add(m.id)
    picked.push(m)
  }
  return picked
}

function App() {
  const [notification, setNotification] = useState<AppNotification>(null)

  const [screen, setScreen] = useState<Screen>('home')
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null)

  const [selectedPlaceId, setSelectedPlaceId] = useState<PlaceId | null>(null)
  const [placeValues, setPlaceValues] = useState<Record<string, number> | null>(null)

  const [activeTestId, setActiveTestId] = useState<string | null>(null)
  const [testScore, setTestScore] = useState<{ score: number; max: number } | null>(null)

  // ---- profile ----
  const [profile, setProfile] = useState<ProfileState>(() => {
    const raw = loadJSON<any>('profile', null)
    return normalizeProfile(raw)
  })

  useEffect(() => {
    saveJSON('profile', profile)
  }, [profile])

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
              actionLabel: 'Ок',
              onAction: () => setNotification(null),
            }
          })
        })
      }

      return after
    })
  }

  // ✅ ЛЕКЦИИ СО СТАТУСАМИ ИЗ PROFILE
  const lecturesWithStatus: Lecture[] = useMemo(() => {
    const done = new Set(profile.doneLectures)

    return LECTURES.map((l, idx) => {
      const isDone = done.has(l.id)
      const prev = idx > 0 ? LECTURES[idx - 1] : null
      const prevDone = prev ? done.has(prev.id) : true // первая всегда доступна

      const status: Lecture['status'] = isDone ? 'done' : prevDone ? 'available' : 'locked'
      return { ...l, status }
    })
  }, [profile.doneLectures])

  // выбранная лекция — ИЗ lecturesWithStatus
  const selectedLecture: Lecture | null = useMemo(() => {
    if (!selectedLectureId) return null
    return lecturesWithStatus.find((l) => l.id === selectedLectureId) ?? null
  }, [selectedLectureId, lecturesWithStatus])

  // ---------------- МИССИИ ----------------
  const [missionsDate, setMissionsDate] = useState<string>(() =>
    loadJSON<string>('missionsDate', todayStr()) ?? todayStr()
  )

  const [missionsToday, setMissionsToday] = useState<TodayMission[]>(() => {
    const raw = loadJSON<TodayMission[]>('missionsToday', [])
    return Array.isArray(raw) ? raw : []
  })

  useEffect(() => {
    saveJSON('missionsDate', missionsDate)
  }, [missionsDate])

  useEffect(() => {
    saveJSON('missionsToday', missionsToday)
  }, [missionsToday])

  useEffect(() => {
    const t = todayStr()

    const buildDaily = (avoid: Set<string>, count: number) => {
      const base = pickRandomMissions(count, avoid)
      const daily: TodayMission[] = base.map((m) => ({
        uid: makeUid('daily'),
        baseId: m.id,
        text: m.text,
        source: 'daily',
        done: false,
        createdAt: Date.now(),
      }))
      return daily
    }

    const storedDate = loadJSON<string>('missionsDate', todayStr())
    const storedToday = loadJSON<TodayMission[]>('missionsToday', [])
    const storedList = Array.isArray(storedToday) ? storedToday : []

    const storedDailyCount =
      storedDate === t ? storedList.filter((m) => m?.source === 'daily').length : 0

    if (storedDate === t && storedDailyCount >= 3) {
      setMissionsDate(storedDate)
      setMissionsToday(storedList)
      return
    }

    if (storedDate !== t) {
      const avoid = new Set<string>()
      const daily3 = buildDaily(avoid, 3)

      setMissionsDate(t)
      setMissionsToday(daily3)

      saveJSON('missionsDate', t)
      saveJSON('missionsToday', daily3)
      return
    }

    const avoid = new Set<string>(storedList.map((m) => m.baseId))
    const need = Math.max(0, 3 - storedDailyCount)
    const add = need > 0 ? buildDaily(avoid, need) : []

    const merged = [...storedList, ...add]
    setMissionsDate(t)
    setMissionsToday(merged)

    saveJSON('missionsDate', t)
    saveJSON('missionsToday', merged)
  }, [])

  const addEventMissions = (count: number, source: Exclude<MissionSource, 'daily'>) => {
    const avoid = new Set<string>(missionsToday.map((m) => m.baseId))
    const base = pickRandomMissions(count, avoid)

    const add: TodayMission[] = base.map((m) => ({
      uid: makeUid(source),
      baseId: m.id,
      text: m.text,
      source,
      done: false,
      createdAt: Date.now(),
    }))

    setMissionsToday((prev) => [...prev, ...add])
  }

  const completedOnceRef = useRef<Set<string>>(new Set())

  const completeMission = (uid: string) => {
    if (completedOnceRef.current.has(uid)) return
    completedOnceRef.current.add(uid)

    const target = missionsToday.find((m) => m.uid === uid)
    if (!target || target.done) {
      completedOnceRef.current.delete(uid)
      return
    }

    setMissionsToday((prev) => prev.map((m) => (m.uid === uid ? { ...m, done: true } : m)))
    updateProfile((p) => addXp(incMissions(p), 5))

    setNotification({
      text: '✅ Миссия выполнена (+5 XP)',
      actionLabel: 'Ок',
      onAction: () => setNotification(null),
    })
  }

  const dailyActive = useMemo(() => {
    const d = missionsToday
      .filter((m) => m.source === 'daily' && !m.done)
      .sort((a, b) => a.createdAt - b.createdAt)
    return d[0] ?? null
  }, [missionsToday])

  const eventActive = useMemo(() => {
    return missionsToday
      .filter((m) => m.source !== 'daily' && !m.done)
      .sort((a, b) => a.createdAt - b.createdAt)
  }, [missionsToday])

  const headerTitle =
    screen === 'home'
      ? 'Главная'
      : screen === 'profile'
      ? 'Профиль'
      : screen === 'lectures'
      ? 'Лекции'
      : screen === 'testsList' || screen === 'testView' || screen === 'testResult'
      ? 'Тесты'
      : 'Лекция'

  // ---------------- ТЕСТЫ ----------------
  const activeTest = useMemo(() => {
    if (!activeTestId) return null
    return TESTS.find((t) => t.id === activeTestId) ?? null
  }, [activeTestId])

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
              setActiveTestId(null)
              setScreen('testsList')
            }}
            onGoPlaceObservation={() => setScreen('placePick')}
            profile={profile}
            dailyMission={dailyActive}
            eventMissions={eventActive}
            onCompleteMission={completeMission}
            achievements={profile.achievements}
            onOpenAchievement={(id: AchievementId) => {
              const a = ACHIEVEMENTS.find((x) => x.id === id)
              if (!a) return
              setNotification({
                text: `🏆 ${a.title}\n${a.desc}`,
                actionLabel: 'Ок',
                onAction: () => setNotification(null),
              })
            }}
          />
        )}

       {screen === 'profile' && (
  <ProfileScreen
    profile={profile}
    onChangeName={(name) => {
      updateProfile((p) => ({
        ...p,
        name,
      }))
      setNotification({
        text: `✅ Имя сохранено: ${name}`,
        actionLabel: 'Ок',
        onAction: () => setNotification(null),
      })
    }}
    onReset={() => {
      if (!confirm('Сбросить весь прогресс?')) return

      updateProfile(() => normalizeProfile(null))
      setMissionsDate(todayStr())
      setMissionsToday([])

      saveJSON('profile', normalizeProfile(null))
      saveJSON('missionsDate', todayStr())
      saveJSON('missionsToday', [])

      setNotification({
        text: '♻️ Прогресс сброшен',
        actionLabel: 'Ок',
        onAction: () => setNotification(null),
      })

      setScreen('home')
    }}
  />
)}
        {screen === 'lectures' && (
          <LecturesScreen
            lectures={lecturesWithStatus}
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
              // ✅ ставим done в profile
              updateProfile((p) => {
                const firstTime = !p.doneLectures.includes(selectedLecture.id)
                const p1 = markLectureDone(p, selectedLecture.id)
                const p2 = firstTime ? incLectures(p1) : p1
                const p3 = firstTime ? addXp(p2, 10) : p2
                return p3
              })

              addEventMissions(1, 'lecture')
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
              setScreen('testsList')
            }}
          />
        )}

        {screen === 'testsList' && (
          <TestsSpisocScreen
            lectures={lecturesWithStatus}
            tests={TESTS}
            onGoLectures={() => setScreen('lectures')}
            onOpenTest={(testId) => {
              setTestScore(null)
              setActiveTestId(testId)
              setScreen('testView')
            }}
          />
        )}

        {screen === 'testView' && activeTest && (
          <TestViewScreen
            test={activeTest}
            onBack={() => setScreen('testsList')}
            onFinish={(correct, total) => {
              setTestScore({ score: correct, max: total })

              const ratio = total === 0 ? 0 : correct / total
              const xpAward = ratio >= 1 ? 18 : ratio >= 0.8 ? 12 : ratio >= 0.6 ? 3 : 0

              updateProfile((p) => addXp(incTests(p), xpAward))
              addEventMissions(1, 'test')

              setScreen('testResult')
            }}
          />
        )}

        {screen === 'testView' && !activeTest && (
          <div style={{ padding: 16 }}>
            <p>Тест не найден.</p>
            <button onClick={() => setScreen('testsList')}>Назад</button>
          </div>
        )}

        {screen === 'testResult' && testScore && (
          <TestResultScreen
            score={testScore.score}
            maxScore={testScore.max}
            onTryAgain={() => {
              setTestScore(null)
              setScreen('testView')
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
              addEventMissions(2, 'observation')
              setScreen('placeResult')
            }}
          />
        )}

        {screen === 'placeResult' && selectedPlaceId && placeValues && (
          <PlaceResultScreen
            placeId={selectedPlaceId}
            placeTitle={PLACES.find((p) => p.id === selectedPlaceId)?.title ?? 'Место'}
            values={placeValues}
            onBack={() => setScreen('placePick')}
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