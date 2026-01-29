type LectureStatus = 'locked' | 'available' | 'done'

type Lecture = {
  id: string
  title: string
  description: string
  status: LectureStatus
}

type LecturesScreenProps = {
  lectures: Lecture[]
  onOpenLecture: (id: string) => void
}

function statusBadge(status: LectureStatus) {
  if (status === 'done') return '✅ Пройдено'
  if (status === 'available') return '▶ Доступно'
  return '🔒 Закрыто'
}

function LecturesScreen({ lectures, onOpenLecture }: LecturesScreenProps) {
  return (
    <div>
      <h1>Лекции</h1>
      <p>Выбирай тему и проходи шаг за шагом.</p>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {lectures.map((l) => (
          <div
            key={l.id}
            style={{
              borderRadius: 12,
              padding: 12,
              background: '#f5f5f5',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontWeight: 700 }}>{l.title}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{statusBadge(l.status)}</div>
            </div>

            <div style={{ marginTop: 8, opacity: 0.9 }}>{l.description}</div>

            <div style={{ marginTop: 12 }}>
              <button
                disabled={l.status === 'locked'}
                onClick={() => onOpenLecture(l.id)}
              >
                Открыть
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LecturesScreen
