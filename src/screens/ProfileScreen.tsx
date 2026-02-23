import { useMemo, useState } from 'react'
import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { ProfileState } from '../data/progression'
import { roleTitle, xpProgress } from '../data/progression'

type Props = {
  profile: ProfileState
  onChangeName: (name: string) => void
  onReset: () => void
}

export default function ProfileScreen({ profile, onChangeName, onReset }: Props) {
  const progress = xpProgress(profile)
  const percent =
    profile.roleLevel >= 10 ? 100 : Math.min(100, (progress.value / progress.need) * 100)

  const [draftName, setDraftName] = useState(profile.name)

  const isNameChanged = useMemo(
    () => draftName.trim() !== profile.name.trim(),
    [draftName, profile.name]
  )
  const canSave = draftName.trim().length >= 2 && isNameChanged

  return (
    <div>
      <div className="row" style={{ gap: 12, alignItems: 'center' }}>
        <img
  src="/mascot-pig.png"
  width={60}
  height={60}
  alt=""
  style={{
    objectFit: 'contain',
    filter: `
      drop-shadow(0 8px 16px rgba(93,169,233,0.28))
      drop-shadow(0 0 18px rgba(93,169,233,0.2))
    `,
  }}
/>
        <div>
          <h1>Профиль</h1>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 800, marginTop: 4 }}>
            Твой “паспорт героя” и настройки 💙
          </div>
        </div>
      </div>

      {/* HERO */}
      <Card className="mtop soft">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 950, letterSpacing: '-0.02em', fontSize: 18 }}>
              {profile.name || 'Без имени'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted2)', fontWeight: 900, marginTop: 4 }}>
              {roleTitle(profile.roleLevel)} · уровень {profile.roleLevel}
            </div>
          </div>

          <div className="badge success">+5 XP</div>
        </div>

        <div style={{ marginTop: 14 }}>
          <div className="sectionLabel">XP</div>

          <div className="progress" style={{ marginTop: 8 }}>
            <div className="progressFill" style={{ width: `${percent}%` }} />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              gap: 10,
            }}
          >
            <div className="xpChip">
              <span className="xpDot" />
              {profile.roleLevel >= 10 ? 'MAX' : `${progress.value} / ${progress.need} XP`}
            </div>

            <div style={{ fontSize: 12, color: 'var(--muted2)', fontWeight: 950 }}>
              {Math.round(percent)}%
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <div className="miniCard">
            <div className="sectionLabel">Уровень</div>
            <div style={{ fontWeight: 950, marginTop: 6 }}>{profile.roleLevel}</div>
          </div>

          <div className="miniCard">
            <div className="sectionLabel">Роль</div>
            <div style={{ fontWeight: 950, marginTop: 6 }}>{roleTitle(profile.roleLevel)}</div>
          </div>

          <div className="miniCard soft" style={{ gridColumn: '1 / -1' }}>
            <div className="sectionLabel">Подсказка</div>
            <div style={{ fontWeight: 950, marginTop: 6 }}>
              Делай миссии — +5 XP за каждую ✅
            </div>
          </div>
        </div>
      </Card>

      {/* NAME */}
      <Card className="mtop">
        <CardTitle>Имя</CardTitle>
        <CardText>Можно поменять в любой момент.</CardText>

        <div style={{ marginTop: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            placeholder="Введи имя"
            style={{
              flex: 1,
              height: 44,
              borderRadius: 16,
              border: '1px solid rgba(93,169,233,0.18)',
              background: 'rgba(255,255,255,0.92)',
              padding: '0 12px',
              outline: 'none',
              boxShadow: 'var(--shadowSm)',
              fontWeight: 800,
              color: 'var(--text)',
            }}
          />

          <Button disabled={!canSave} onClick={() => onChangeName(draftName.trim())}>
            Сохранить
          </Button>
        </div>

        <div style={{ fontSize: 12, color: 'var(--muted2)', marginTop: 10 }}>
          Минимум 2 символа. Можно поставить ник.
        </div>
      </Card>

      {/* RESET */}
      <Card className="mtop accent">
        <CardTitle>Сброс прогресса</CardTitle>
        <CardText>Это удалит прогресс и начнёт заново.</CardText>

        <div className="row" style={{ marginTop: 12 }}>
          <Button variant="ghost" onClick={onReset}>
            Сбросить
          </Button>
        </div>
      </Card>
    </div>
  )
}