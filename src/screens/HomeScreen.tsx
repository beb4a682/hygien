type HomeScreenProps = {
  onGoLectures: () => void
  onGoTests: () => void
  onGoPlaceObservation: () => void

  missionText: string | null
  missionStatus: 'none' | 'active' | 'accepted' | 'done'

  onAcceptMission: () => void
  onCompleteMission: () => void
  onPostponeMission: () => void
}

function HomeScreen({
  onGoLectures,
  onGoTests,
  onGoPlaceObservation,
  missionText,
  missionStatus,
  onAcceptMission,
  onCompleteMission,
  onPostponeMission,
}: HomeScreenProps) {
  return (
    <div>
      <h1>Hygiene Level Up</h1>

      {/* Блок "Кто я сейчас?" */}
      <section>
        <p>Привет, герой чистоты! 🐷</p>

        <div style={{ marginTop: 12 }}>
          <strong>Твоя роль:</strong> Хрю-гость
        </div>

        <div style={{ marginTop: 8 }}>
          <strong>Уровень:</strong> 1
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Прогресс до следующей роли</div>

          <div
            style={{
              background: '#eee',
              height: 10,
              borderRadius: 999,
              overflow: 'hidden',
              marginTop: 6,
            }}
          >
            <div
              style={{
                width: '25%',
                height: '100%',
                background: '#999',
              }}
            />
          </div>

          <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}>25 / 100 XP</div>
        </div>
      </section>

      {/* Кнопки быстрого доступа */}
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <button onClick={onGoLectures}>Открыть лекции</button>
        <button onClick={onGoTests}>Открыть тесты</button>
        <button onClick={onGoPlaceObservation}>Наблюдение места</button>
      </div>

      {/* Главный CTA */}
      <div style={{ marginTop: 16 }}>
        <h2>Что дальше?</h2>
        <button onClick={onGoLectures}>Продолжить путь</button>
      </div>

      {/* Миссия дня */}
      <section style={{ marginTop: 24 }}>
        <h2>Миссия дня</h2>

        <div
          style={{
            marginTop: 8,
            padding: 12,
            borderRadius: 12,
            background: '#f5f5f5',
          }}
        >
          {missionText ? (
            <>
              <p style={{ marginBottom: 8 }}>Сегодня попробуй:</p>
              <strong>{missionText}</strong>

              {missionStatus === 'active' && (
                <>
                  <div style={{ marginTop: 12 }}>
                    <button onClick={onAcceptMission}>Я сделаю</button>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <button onClick={onPostponeMission}>Позже</button>
                  </div>
                </>
              )}

              {missionStatus === 'accepted' && (
                <div style={{ marginTop: 12 }}>
                  <button onClick={onCompleteMission}>Выполнил ✅</button>
                </div>
              )}
            </>
          ) : (
            <p style={{ margin: 0, opacity: 0.85 }}>
              Пока нет миссии. Пройди лекцию — и появится задание на день.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomeScreen
