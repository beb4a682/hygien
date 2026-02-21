export type ProfileStats = {
  testsDone: number
  lecturesDone: number
  observationsDone: number
  missionsDone: number
}

export type AchievementId =
  | 'first_test'
  | 'first_lecture'
  | 'first_observation'
  | 'first_mission'
  | '10_total_xp'
  | '100_total_xp'

export type ProfileState = {
  name: string
  roleLevel: number
  xpCurrent: number
  xpTotal: number
  stats: ProfileStats
  achievements: AchievementId[]

  doneLectures: string[] // ✅ ДОБАВИТЬ
}

export const MAX_LEVEL = 10

export const XP_TO_NEXT_LEVEL: number[] = [
  0,
  80,  // 1->2
  120, // 2->3
  160, // 3->4
  200, // 4->5
  240, // 5->6
  280, // 6->7
  320, // 7->8
  360, // 8->9
  400, // 9->10
]


export const ROLE_TITLES: string[] = [
  '—',
  'Хрю-гость',
  'Хрю-новичок',
  'Хрю-ученик',
  'Хрю-разведчик',
  'Хрю-практик',
  'Хрю-мастер',
  'Хрю-хранитель',
  'Старший хрю',
  'Правая лапка Чистюли',
  'Чистюля',
]


export function roleTitle(level: number) {
  const safe = Math.max(1, Math.min(MAX_LEVEL, level))
  return ROLE_TITLES[safe]
}

// Нормализация старых сохранений (если в localStorage нет stats/achievements)
export function normalizeProfile(p: Partial<ProfileState> | null | undefined): ProfileState {
  return {
    name: p?.name ?? 'Гость',
    roleLevel: p?.roleLevel ?? 1,
    xpCurrent: p?.xpCurrent ?? 0,
    xpTotal: p?.xpTotal ?? 0,
    stats: {
      testsDone: p?.stats?.testsDone ?? 0,
      lecturesDone: p?.stats?.lecturesDone ?? 0,
      observationsDone: p?.stats?.observationsDone ?? 0,
      missionsDone: p?.stats?.missionsDone ?? 0,
    },
    achievements: (p?.achievements ?? []) as AchievementId[],

    doneLectures: Array.isArray((p as any)?.doneLectures) ? ((p as any).doneLectures as string[]) : [], // ✅ ДОБАВИТЬ
  }
}
export function markLectureDone(profile: ProfileState, lectureId: string): ProfileState {
  const set = new Set(profile.doneLectures)
  if (set.has(lectureId)) return profile
  set.add(lectureId)

  return {
    ...profile,
    doneLectures: Array.from(set),
  }
}

// Добавить XP и при необходимости поднять уровень
export function addXp(profile: ProfileState, amount: number): ProfileState {
  let roleLevel = profile.roleLevel
  let xpCurrent = profile.xpCurrent + amount
  const xpTotal = profile.xpTotal + amount

  while (roleLevel < MAX_LEVEL) {
    const need = XP_TO_NEXT_LEVEL[roleLevel]
    if (xpCurrent < need) break
    xpCurrent -= need
    roleLevel += 1
  }

  return { ...profile, roleLevel, xpCurrent, xpTotal }
}

// Для прогресс-бара
export function xpProgress(profile: ProfileState) {
  if (profile.roleLevel >= MAX_LEVEL) {
    return { value: 1, need: 1, left: 0 }
  }
  const need = XP_TO_NEXT_LEVEL[profile.roleLevel]
  const value = profile.xpCurrent
  const left = Math.max(0, need - value)
  return { value, need, left }
}

// Статистика: инкременты
export function incTests(profile: ProfileState) {
  return { ...profile, stats: { ...profile.stats, testsDone: profile.stats.testsDone + 1 } }
}
export function incLectures(profile: ProfileState) {
  return { ...profile, stats: { ...profile.stats, lecturesDone: profile.stats.lecturesDone + 1 } }
}
export function incObservations(profile: ProfileState) {
  return { ...profile, stats: { ...profile.stats, observationsDone: profile.stats.observationsDone + 1 } }
}
export function incMissions(profile: ProfileState) {
  return { ...profile, stats: { ...profile.stats, missionsDone: profile.stats.missionsDone + 1 } }
}

// Ачивки
export const ACHIEVEMENTS: { id: AchievementId; title: string; desc: string }[] = [
  { id: 'first_test', title: 'Первый тест', desc: 'Пройди первый тест' },
  { id: 'first_lecture', title: 'Первая лекция', desc: 'Заверши первую лекцию' },
  { id: 'first_observation', title: 'Первое наблюдение', desc: 'Заверши первое наблюдение места' },
  { id: 'first_mission', title: 'Первая миссия', desc: 'Выполни первую миссию' },
  { id: '10_total_xp', title: 'Разогрев', desc: 'Набери 10 XP' },
  { id: '100_total_xp', title: 'Уже серьёзно', desc: 'Набери 100 XP' },
]

export function unlockAchievements(profile: ProfileState): ProfileState {
  const have = new Set(profile.achievements)
  const add = (id: AchievementId) => have.add(id)

  if (profile.stats.testsDone >= 1) add('first_test')
  if (profile.stats.lecturesDone >= 1) add('first_lecture')
  if (profile.stats.observationsDone >= 1) add('first_observation')
  if (profile.stats.missionsDone >= 1) add('first_mission')
  if (profile.xpTotal >= 10) add('10_total_xp')
  if (profile.xpTotal >= 100) add('100_total_xp')

  return { ...profile, achievements: Array.from(have) }
}
