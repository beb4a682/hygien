type HomeScreenProps = {
  onGoLectures: () => void
  onGoTests: () => void
  onGoPlaceObservation: () => void
}


function HomeScreen({ onGoLectures, onGoTests, onGoPlaceObservation }: HomeScreenProps) {
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
        <div style={{ fontSize: 12, opacity: 0.8 }}>
          Прогресс до следующей роли
        </div>

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

        <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}>
          25 / 100 XP
        </div>
      </div>
    </section>

    {/* Кнопки быстрого доступа (временные) */}
    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
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
    <p style={{ marginBottom: 8 }}>
      Сегодня попробуй:
    </p>

    <strong>Помыть руки перед едой</strong>

    <div style={{ marginTop: 12 }}>
      <button>Я попробую</button>
    </div>
    <div style={{ marginTop: 12 }}>
      <button>Позже</button>
    </div>
  </div>
</section>

  </div>
)

}

export default HomeScreen
