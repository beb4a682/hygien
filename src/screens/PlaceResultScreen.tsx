import { useMemo } from 'react'
import { Card, CardTitle, CardText } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import type { PlaceId } from '../data/observationMissions'

import badImg from '../assets/result-bad.png'
import midImg from '../assets/result-mid.png'
import goodImg from '../assets/result-good.png'

type Props = {
  placeId: PlaceId
  placeTitle: string
  values: Record<string, number>
  onBack: () => void
}

function getResult(avg: number) {
  if (avg >= 4.5)
    return {
      img: goodImg,
      title: 'Отлично!',
      text: 'Здесь очень чисто и аккуратно. Так держать!',
    }
  if (avg >= 3.5)
    return {
      img: goodImg,
      title: 'Хорошо',
      text: 'В целом всё неплохо, но есть что улучшить.',
    }
  if (avg >= 2.5)
    return {
      img: midImg,
      title: 'Можно лучше',
      text: 'Обрати внимание на порядок и чистоту.',
    }
  return {
    img: badImg,
    title: 'Нужно постараться',
    text: 'Стоит навести порядок и улучшить гигиену.',
    }
}

function pickOne<T>(arr: T[]) {
  if (!arr || arr.length === 0) return null
  const i = Math.floor(Math.random() * arr.length)
  return arr[i]
}

/**
 * Советы завязаны на placeTitle (быстро и без зависимостей от PlaceId).
 * Если хочешь строго по PlaceId — скажи реальные значения PlaceId и я перепривяжу.
 */
function getTipsByTitle(placeTitle: string) {
  const t = placeTitle.toLowerCase()

  if (t.includes('кух')) {
    return [
      'Чтобы кухня всегда была в чистоте — протирай стол после каждого приёма еды.',
      'Сразу убирай грязную посуду: так беспорядок не накапливается.',
      'Раз в день быстро протри плиту — жир не успеет “прилипнуть”.',
      'Выноси мусор, когда пакет заполнен на 2/3 — так не появляется запах.',
      'Губку и тряпку промывай и отжимай после уборки — тогда они не будут пахнуть.',
    ]
  }

  if (t.includes('ванн') || t.includes('туалет') || t.includes('санузел')) {
    return [
      'Чтобы в ванной было свежо — протирай раковину после умывания (30 секунд).',
      'После душа проветривай комнату — так меньше сырости и запаха.',
      'Полотенце вешай сушиться ровно — оно дольше остаётся чистым.',
      'Раз в несколько дней протирай кран и плитку от капель — будет аккуратно.',
      'Старайся не оставлять на полу воду — тогда не будет скользко и грязно.',
    ]
  }

  if (t.includes('класс') || t.includes('кабинет')) {
    return [
      'Чтобы класс выглядел аккуратно — убирай за собой мусор сразу, не откладывая.',
      'Держи ручки и карандаши в пенале — на парте будет больше порядка.',
      'После урока проверь: нет ли бумаги и крошек возле твоего места.',
      'Не ставь вещи на проход — так в классе безопаснее и чище.',
      'Разложи учебники стопкой — это быстро делает рабочее место аккуратным.',
    ]
  }

  if (t.includes('спальн') || t.includes('комнат')) {
    return [
      'Чтобы спальня всегда была в чистоте — делай мини-уборку по 5 минут каждый день.',
      'Заправляй кровать утром — комната сразу выглядит аккуратнее.',
      'Одежду сразу клади в шкаф или корзину для стирки — не на стул.',
      'Раз в пару дней протирай пыль с тумбочки — это занимает меньше минуты.',
      'У каждой вещи должно быть своё место — так порядок держится легко.',
    ]
  }

  if (t.includes('улиц') || t.includes('двор') || t.includes('площад')) {
    return [
      'Чтобы вокруг было чище — донеси фантик до урны, даже если она далеко.',
      'После прогулки вытряхни песок с обуви у входа — дома будет чище.',
      'Старайся ходить по дорожкам — обувь меньше пачкается.',
      'Если видишь мусор рядом — подними один маленький предмет: это уже помощь.',
      'Не наступай специально в лужи и грязь — меньше грязи будет дома.',
    ]
  }

  return [
    'Делай маленькие шаги: 1–2 минуты уборки уже помогают.',
    'Старайся убирать сразу после себя — так грязь не копится.',
    'Если что-то пролилось — лучше вытереть сразу.',
    'Держи вещи по местам — так порядок поддерживается легче.',
    'Проверь вокруг: крошки, мусор, лишние предметы — и станет аккуратнее.',
  ]
}

export default function PlaceResultScreen({
  placeTitle,
  values,
  onBack,
}: Props) {
  const avg = useMemo(() => {
    const nums = Object.values(values)
    if (nums.length === 0) return 0
    return nums.reduce((a, b) => a + b, 0) / nums.length
  }, [values])

  const result = getResult(avg)

  const tip = useMemo(() => {
    const list = getTipsByTitle(placeTitle)
    return pickOne(list) ?? ''
  }, [placeTitle])

  return (
    <div>
      {/* 1) Название места + подпись */}
      <div className="pageHead">
        <div>
          <h1>{placeTitle}</h1>
          <p>Результат наблюдения</p>
        </div>

       
      </div>

      {/* 2) Карточка с картинкой (сделал побольше) */}
      <Card
        className="mtop soft"
        style={{
          textAlign: 'center',
          padding: 18,
        }}
      >
        <img
          src={result.img}
          alt=""
          style={{
            width: 250,
            height: 350,
            objectFit: 'contain',
            display: 'block',
            margin: '2px auto 0',
          }}
        />

        <div style={{ marginTop: 10 }}>
          <CardTitle>{result.title}</CardTitle>
        </div>

        <div style={{ marginTop: 8 }}>
          <CardText>{result.text}</CardText>
        </div>
      </Card>

      {/* 3) Карточка с советом (поменьше, компактная, желтоватая) */}
      {tip && (
        <Card
          className="mtop"
          style={{
            padding: '10px 12px',
            background: 'rgba(255, 223, 128, 0.22)',
            border: '1px solid rgba(255, 190, 64, 0.38)',
          }}
        >
          <div
            style={{
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span aria-hidden>💡</span>
            <span>Совет</span>
          </div>

          <div style={{ lineHeight: 1.35, opacity: 0.92, fontSize: 14 }}>
            {tip}
          </div>
        </Card>
      )}

      <div className="row mtop" style={{ justifyContent: 'center' }}>
        <Button onClick={onBack}>На главную</Button>
      </div>
    </div>
  )
}