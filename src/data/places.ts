export type Place = {
  id: string
  title: string
  hint: string
}

export const PLACES: Place[] = [
  { id: 'kitchen', title: 'Кухня', hint: 'Где готовят и едят.' },
  { id: 'bathroom', title: 'Ванная', hint: 'Где моют руки и чистят зубы.' },
  { id: 'classroom', title: 'Класс', hint: 'Парта, стул, вокруг.' },
  { id: 'street', title: 'Улица / двор', hint: 'Лавочка, площадка, подъезд.' },
]
