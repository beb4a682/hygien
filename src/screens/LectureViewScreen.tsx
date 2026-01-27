type LectureViewScreenProps = {
  title: string
  text: string
  onBack: () => void
  onDone: () => void
}

function LectureViewScreen({ title, text, onBack, onDone }: LectureViewScreenProps) {
  return (
    <div>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>{title}</h1>

      <div style={{ marginTop: 12, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
        {text}
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={onDone}>Я понял ✅</button>
      </div>
    </div>
  )
}

export default LectureViewScreen
