import { Card } from '../components/ui/Card'
import type { Place } from '../data/places'
import type { PlaceId } from '../data/observationMissions'
import './placePick.css'

const PLACE_ICONS: Record<string, string> = {
  kitchen: '/img/places/kitchen.png',
  bathroom: '/img/places/bathroom.png',
  classroom: '/img/places/class.png',
  street: '/img/places/street.png',
  bedroom: '/img/places/badroom.png',
}

type Props = {
  places: Place[]
  onPick: (placeId: PlaceId) => void
}

export default function PlacePickScreen({ places, onPick }: Props) {
  return (
    <div className="placePickPage">
      {/* TOP BAR */}
      

      {/* HERO */}
      <div className="placePickHero">
        <div className="placePickHeroLeft">
          <div className="placePickHeroTitle">Наблюдение</div>
          <div className="placePickHeroSub">
            Выбери место и оцени <br />
            чистоту по пунктам.
          </div>
        </div>

       
        {/* bubbles */}
        <img className="placePickBubble b1" src="/img/home/bubble.png" alt="" />
        <img className="placePickBubble b2" src="/img/home/bubble.png" alt="" />
        <img className="placePickBubble b3" src="/img/home/bubble.png" alt="" />
      </div>

      {/* FRAME */}
      <div className="placePickListWrap">
        <Card className="placePickFrame">
          <div className="placePickList">
            {places.map((p) => (
              <button
                key={p.id}
                type="button"
                className="placePickItem"
                onClick={() => onPick(p.id as PlaceId)}
              >
                <div className="placePickIcon">
                  <img src={PLACE_ICONS[p.id] ?? '/img/places/home.png'} alt="" />
                </div>

                <div className="placePickText">
                  <div className="placePickName">{p.title}</div>
                  <div className="placePickHint">Оцени место и получи советы.</div>
                </div>

                <div className="placePickArrow" aria-hidden="true" />
              </button>
            ))}
          </div>

          <div className="placePickDots" aria-hidden="true">
            <span />
            <span />
            <span className="active" />
            <span />
            <span />
          </div>
        </Card>
      </div>
    </div>
  )
}