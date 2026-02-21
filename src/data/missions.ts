export type Mission = {
  id: string
  text: string
  category: 'hands' | 'teeth' | 'room' | 'food' | 'clothes' | 'mind'
  difficulty: 1 | 2 | 3
}

export const MISSIONS: Mission[] = [
 // HANDS
  { id: 'hands_after_toilet', text: 'Вымой руки с мылом после туалета.', category: 'hands', difficulty: 1 },
  { id: 'hands_after_animals', text: 'Вымой руки с мылом после контакта с животными.', category: 'hands', difficulty: 1 },
  { id: 'hands_before_cooking', text: 'Вымой руки с мылом перед приготовлением еды.', category: 'hands', difficulty: 1 },
  { id: 'hands_clean_towel', text: 'Вытри руки чистым полотенцем.', category: 'hands', difficulty: 1 },
  { id: 'hands_nails_clean', text: 'Очисти ногти под проточной водой.', category: 'hands', difficulty: 1 },

  // TEETH
  { id: 'teeth_morning', text: 'Почисти зубы утром в течение 2 минут.', category: 'teeth', difficulty: 1 },
  { id: 'teeth_evening', text: 'Почисти зубы вечером перед сном.', category: 'teeth', difficulty: 1 },
  { id: 'teeth_rinse', text: 'Прополощи рот чистой водой после еды.', category: 'teeth', difficulty: 1 },
  { id: 'teeth_brush_wash', text: 'Промой зубную щётку под водой.', category: 'teeth', difficulty: 1 },
  { id: 'teeth_brush_place', text: 'Поставь зубную щётку в чистый стакан.', category: 'teeth', difficulty: 1 },

  // ROOM
  { id: 'room_trash_throw', text: 'Собери и выброси мусор из комнаты.', category: 'room', difficulty: 1 },
  { id: 'room_floor_clear', text: 'Убери вещи с пола на свои места.', category: 'room', difficulty: 2 },
  { id: 'room_bed_make', text: 'Заправь кровать.', category: 'room', difficulty: 1 },
  { id: 'room_air_5min', text: 'Открой окно и проветри комнату 5 минут.', category: 'room', difficulty: 1 },
  { id: 'room_desk_wipe', text: 'Протри стол или рабочую поверхность салфеткой.', category: 'room', difficulty: 2 },

  // FOOD
  { id: 'food_wash_hands', text: 'Вымой руки перед приёмом пищи.', category: 'food', difficulty: 1 },
  { id: 'food_wash_product', text: 'Помой фрукт или овощ перед едой.', category: 'food', difficulty: 1 },
  { id: 'food_table_wipe', text: 'Протри стол перед едой.', category: 'food', difficulty: 2 },
  { id: 'food_spill_clean', text: 'Убери крошки или пролитую еду.', category: 'food', difficulty: 1 },
  { id: 'food_dishes_sink', text: 'Отнеси использованную посуду в раковину.', category: 'food', difficulty: 1 },

  // CLOTHES
  { id: 'clothes_change_home', text: 'Переоденься в чистую домашнюю одежду.', category: 'clothes', difficulty: 1 },
  { id: 'clothes_dirty_basket', text: 'Положи грязную одежду в корзину для белья.', category: 'clothes', difficulty: 1 },
  { id: 'clothes_fold_clean', text: 'Сложи чистую одежду аккуратно.', category: 'clothes', difficulty: 2 },
  { id: 'clothes_air_jacket', text: 'Повесь верхнюю одежду проветриться.', category: 'clothes', difficulty: 2 },
  { id: 'clothes_shoes_place', text: 'Поставь обувь на своё место.', category: 'clothes', difficulty: 1 },

  // MIND
  { id: 'mind_drink_water', text: 'Выпей стакан чистой воды.', category: 'mind', difficulty: 1 },
  { id: 'mind_screen_break', text: 'Отложи телефон и отдохни от экрана 5 минут.', category: 'mind', difficulty: 2 },
  { id: 'mind_breath_5', text: 'Сделай 5 медленных вдохов и выдохов.', category: 'mind', difficulty: 1 },
  { id: 'mind_posture_fix', text: 'Сядь ровно и выпрями спину.', category: 'mind', difficulty: 1 },
  { id: 'mind_sleep_prepare', text: 'Выключи свет и подготовься ко сну.', category: 'mind', difficulty: 3 },
]
