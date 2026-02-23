import { Card, CardText, CardTitle } from '../components/ui/Card'

type Place = { id: string; title: string; desc?: string }

type Props = {
  places: Place[]
  onPick: (placeId: string) => void
}

export default function PlacePickScreen({ places, onPick }: Props) {
  return (
    <div>
      <div className="pageHead">
        <div>
          <h1>Наблюдение</h1>
          <p>Выбери место и оцени чистоту по пунктам.</p>
        </div>

        <div className="pageHeadRight">
          <span className="badge">🧼 чек-лист</span>
          <img src="/mascot-pig.png" width={54} height={54} alt="" className="pageMascot" />
        </div>
      </div>

      <div className="stack mtop">
        {places.map((p) => (
          <Card key={p.id} className="accent placePickCard">
            <button
              className="placePickBtn"
              onClick={() => onPick(p.id)}
              style={{ width: '100%', textAlign: 'left' }}
            >
              <div className="placePickRow">
                <div className="placePickBubble" aria-hidden="true">🏠</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <CardTitle>{p.title}</CardTitle>
                  <CardText>{p.desc ?? 'Оцени место и получи советы.'}</CardText>
                </div>

                <div className="placePickArrow">›</div>
              </div>
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}