export type Mission = {
  id: string
  text: string
  category: 'hands' | 'teeth' | 'room' | 'food' | 'clothes' | 'mind'
  difficulty: 1 | 2 | 3
}

export const MISSIONS: Mission[] = [
  { id: 'hands_before_food', text: 'Вымой руки перед едой (20–30 сек).', category: 'hands', difficulty: 1 },
  { id: 'hands_after_street', text: 'Вымой руки после улицы.', category: 'hands', difficulty: 1 },
  { id: 'nails_check', text: 'Проверь ногти и при необходимости приведи в порядок.', category: 'hands', difficulty: 1 },

  { id: 'teeth_2min', text: 'Почисти зубы 2 минуты (с таймером).', category: 'teeth', difficulty: 1 },
  { id: 'mouth_rinse', text: 'Прополощи рот после сладкого/еды.', category: 'teeth', difficulty: 1 },

  { id: 'water_bottle', text: 'Выпей стакан воды и обнови бутылку/стакан.', category: 'mind', difficulty: 1 },

  { id: 'desk_wipe', text: 'Протри рабочее место/телефон салфеткой.', category: 'room', difficulty: 2 },
  { id: 'air_room', text: 'Проветри комнату 5 минут.', category: 'room', difficulty: 1 },

  { id: 'food_clean', text: 'Помой фрукт/овощ перед тем как съесть.', category: 'food', difficulty: 1 },

  { id: 'clothes_fresh', text: 'Проверь одежду на чистоту/запах и при необходимости замени.', category: 'clothes', difficulty: 2 },
]
