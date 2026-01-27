type HomeScreenProps = {
  onGoLectures: () => void
  onGoTests: () => void
}

function HomeScreen({ onGoLectures, onGoTests }: HomeScreenProps) {
  return (
    <div>
      <h1>Hygiene Level Up</h1>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={onGoLectures}>Открыть лекции</button>
        <button onClick={onGoTests}>Открыть тесты</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <h2>Что дальше?</h2>
        <button onClick={onGoLectures}>Продолжить путь</button>
      </div>
    </div>
  )
}

export default HomeScreen
