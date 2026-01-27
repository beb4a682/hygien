type LectureViewScreenProps = {
  title: string
  text: string
  onBack: () => void
}

function LectureViewScreen({ title, text, onBack }: LectureViewScreenProps) {
  return (
    <div>
      <button onClick={onBack}>← Назад</button>

      <h1 style={{ marginTop: 12 }}>{title}</h1>

      <div style={{ marginTop: 12, lineHeight: 1.6 }}>
        {text}
      </div>
    </div>
  )
}

export default LectureViewScreen
