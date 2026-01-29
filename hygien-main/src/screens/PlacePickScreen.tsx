type Place = {
  id: string
  title: string
  hint: string
}

type PlacePickScreenProps = {
  places: Place[]
  onPick: (placeId: string) => void
}

function PlacePickScreen({ places, onPick }: PlacePickScreenProps) {
  return (
    <div>
      <h1>Наблюдение места</h1>
      <p>Выбери место, которое ты хочешь проверить.</p>

      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {places.map((p) => (
          <button
            key={p.id}
            onClick={() => onPick(p.id)}
            style={{
              textAlign: 'left',
              padding: 12,
              borderRadius: 12,
              background: '#f5f5f5',
            }}
          >
            <div style={{ fontWeight: 700 }}>{p.title}</div>
            <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>{p.hint}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default PlacePickScreen
