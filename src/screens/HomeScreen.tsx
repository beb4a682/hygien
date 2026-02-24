import { useMemo, useState } from 'react'
import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import {
  type AchievementId,
  type ProfileState,
  xpProgress,
  roleTitle,
} from '../data/progression'
import type { TodayMission } from '../App'
import './home.css'

type HomeScreenProps = {
  onGoLectures: () => void
  onGoTests: () => void
  onGoPlaceObservation: () => void

  profile: ProfileState

  dailyMission: TodayMission | null
  eventMissions: TodayMission[]
  onCompleteMission: (uid: string) => void

  achievements: AchievementId[] // оставляем в пропсах, но на главной НЕ показываем
  onOpenAchievement: (id: AchievementId) => void // тоже не используем на главной
}

export default function HomeScreen({
  onGoLectures,
  onGoTests,
  onGoPlaceObservation,
  profile,
  dailyMission,
  eventMissions,
  onCompleteMission,
}: HomeScreenProps) {
 const { value, need } = xpProgress(profile)

// у тебя уровень — roleLevel, и MAX после 10
const percent = profile.roleLevel >= 10 ? 100 : Math.min(100, Math.round((value / Math.max(1, need)) * 100))

const role = useMemo(() => roleTitle(profile.roleLevel), [profile.roleLevel])
  // “подсветка при тапе” как на макете
  const [pressed, setPressed] = useState<null | 'lectures' | 'tests' | 'obs'>(null)

  const tap = (key: 'lectures' | 'tests' | 'obs', fn: () => void) => {
    setPressed(key)
    // чтобы успела отрисоваться активная заливка, потом переход
    requestAnimationFrame(() => fn())
    // если пользователь вернётся назад — не держим активной
    setTimeout(() => setPressed(null), 300)
  }

  return (
    <div className="home">
      {/* HERO */}
      <div className="hero">
        {/* сюда вставишь PNG со свинкой/пузыриками */}
        {/* ВАРИАНТ 1: фон-баннер */}
        {/* <img className="hero-bg" src="/img/home/hero.png" alt="" /> */}

        <div className="hero-left">
          {/* PNG свинки слева */}
          <img className="hero-mascot" src="/img/home/pig-hero.png" alt="Маскот" />
        </div>

        <div className="hero-right">
          <div className="hero-title">Hygiene Level Up</div>
          <div className="hero-subtitle">Давай сделаем день чище ✨</div>
        </div>

        {/* пузыри декоративно (по желанию) */}
        <img className="hero-bubble b1" src="/img/home/bubble.png" alt="" />
        <img className="hero-bubble b2" src="/img/home/bubble.png" alt="" />
      </div>

      {/* ПРОГРЕСС */}
      <Card className="home-card">
        <CardTitle>Твой прогресс</CardTitle>

        <div className="progress-grid">
          <div className="progress-col">
            <div className="label">РОЛЬ</div>
            <div className="value">{role}</div>

            <div className="label" style={{ marginTop: 10 }}>
              УРОВЕНЬ
            </div>
            <div className="value">{profile.roleLevel}</div>
          </div>

          <div className="progress-bar-wrap">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
            </div>

            <div className="progress-bottom">
              <div className="xp-pill">
                <span className="dot" />
                {value} / {need} XP
              </div>
              <div className="percent">{percent}%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* НАВИГАЦИЯ-КНОПКИ */}
<div className="nav-pills">
  <button
    className={`pill ${pressed === 'lectures' ? 'active' : ''}`}
    onMouseDown={() => setPressed('lectures')}
    onTouchStart={() => setPressed('lectures')}
    onClick={() => tap('lectures', onGoLectures)}
    type="button"
  >
    <img className="pill-ic" src="/img/home/ic-lectures.png" alt="" />
    Лекции
  </button>

  <button
    className={`pill ${pressed === 'tests' ? 'active' : ''}`}
    onMouseDown={() => setPressed('tests')}
    onTouchStart={() => setPressed('tests')}
    onClick={() => tap('tests', onGoTests)}
    type="button"
  >
    <img className="pill-ic" src="/img/home/ic-tests.png" alt="" />
    Тесты
  </button>
</div>

<div className="nav-obs">
  <button
    className={`pill pill-obs ${pressed === 'obs' ? 'active' : ''}`}
    onMouseDown={() => setPressed('obs')}
    onTouchStart={() => setPressed('obs')}
    onClick={() => tap('obs', onGoPlaceObservation)}
    type="button"
  >
    <img className="pill-ic" src="/img/home/ic-obs.png" alt="" />
    Наблюдение
  </button>
</div>

      {/* МИССИИ */}
      <Card className="home-card">
        <CardTitle>Миссии</CardTitle>

        {/* ДНЕВНАЯ */}
        <div className="missions-section">
          <div className="section-label">ДНЕВНАЯ</div>

          {dailyMission ? (
            <div className="mission-big">
              <img
                className="mission-big-img"
                src="/img/missions/ишп.png"
                alt=""
              />

              <div className="mission-big-body">
                <div className="mission-big-title">{dailyMission.text}</div>

                <Button
                  className="mission-btn"
                  disabled={dailyMission.done}
                  onClick={() => onCompleteMission(dailyMission.uid)}
                >
                  {dailyMission.done ? 'Выполнено ✅' : 'Выполнил (+5 XP)'}
                </Button>
              </div>
            </div>
          ) : (
            // как у тебя было в коде — оставляем заглушку если миссии нет
           <CardText>
            <span className="muted">Сегодня дневной миссии пока нет 🙂</span>
          </CardText>
          )}
        </div>

        {/* ПОСЛЕ ДЕЙСТВИЙ */}
        <div className="missions-section" style={{ marginTop: 14 }}>
          <div className="section-label">ПОСЛЕ ДЕЙСТВИЙ</div>

          {eventMissions?.length ? (
            <div className="missionsGrid">
              {eventMissions.slice(0, 4).map((m, idx) => (
                <button
                  key={m.uid}
                  className="mission-small"
                  onClick={() => onCompleteMission(m.uid)}
                  type="button"
                  disabled={m.done}
                  style={{ opacity: m.done ? 0.65 : 1 }}
                >
                  <div className="mission-small-title">{m.text}</div>

                  <div className="mission-small-bottom">
                    <div className="mission-small-pill">{m.done ? 'Выполнено ✅' : 'Выполнил (+5 XP)'}</div>

                    {/* картинка справа — под каждую можешь сделать отдельную,
                        или одну общую, или по idx выбирать */}
                    <img
                      className="mission-small-img"
                      src={`/img/missions/after.png`}
                      alt=""
                    />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // если нет — оставляем как раньше (или короткая заглушка)
            <CardText>
              <span className="muted">Пока нет миссий после действий.</span>
            </CardText>
          )}
        </div>
      </Card>
    </div>
  )
}