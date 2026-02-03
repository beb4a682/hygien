type Place = {
  id: string
  title: string
  description?: string
}

type Props = {
  places: Place[]
  onPick: (placeId: string) => void
}

export default function PlacePickScreen({ places, onPick }: Props) {
  return (
    <div>
      <h1>Выбери место</h1>
      <p style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
        Сейчас мы будем наблюдать чистоту. Это не экзамен 🙂
      </p>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {places.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onPick(p.id)}
            style={{
              textAlign: 'left',
              padding: 14,
              borderRadius: 16,
              border: '1px solid rgba(0,0,0,0.08)',
              background: '#fff',
              cursor: 'pointer',
              boxShadow: '0 10px 28px rgba(0,0,0,0.08)',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 16 }}>{p.title}</div>
            {p.description && (
              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>
                {p.description}
              </div>
            )}
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
              Нажми, чтобы начать →
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
