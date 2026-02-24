export type PlaceId = 'kitchen' | 'bathroom' | 'classroom' | 'street' | 'bedroom'

export type ObservationMission = {
  id: string
  placeId: PlaceId
  /** к какому критерию из PLACE_CRITERIA относится */
  criterionId: string
  /** коротко, чтобы можно было показывать как пункт чеклиста */
  title: string
  /** подсказка (не обязательно показывать в чеклисте) */
  hint?: string
}

// ✅ мини-миссии на базе твоих критериев
export const OBSERVATION_MISSIONS: ObservationMission[] = [
  // --- kitchen ---
  {
    id: 'k_m1',
    placeId: 'kitchen',
    criterionId: 'k1',
    title: 'Протри стол и плиту',
    hint: 'Убери крошки и липкие пятна с поверхностей.',
  },
  {
    id: 'k_m2',
    placeId: 'kitchen',
    criterionId: 'k4',
    title: 'Замени или промой губку',
    hint: 'Губка не должна пахнуть и быть грязной.',
  },
  {
    id: 'k_m3',
    placeId: 'kitchen',
    criterionId: 'k5',
    title: 'Помой раковину и кран',
    hint: 'После еды/овощей/мяса раковина должна быть чистой.',
  },
  {
    id: 'k_m4',
    placeId: 'kitchen',
    criterionId: 'k7',
    title: 'Вынеси мусор',
    hint: 'Мусорное ведро не должно пахнуть.',
  },

  // --- bathroom ---
  {
    id: 'b_m1',
    placeId: 'bathroom',
    criterionId: 'b1',
    title: 'Помой раковину',
    hint: 'Убери налёт и грязь.',
  },
  { id: 'b_m2', placeId: 'bathroom', criterionId: 'b2', title: 'Проверь, что есть мыло' },
  {
    id: 'b_m3',
    placeId: 'bathroom',
    criterionId: 'b3',
    title: 'Положи чистое полотенце',
  },

  // --- classroom ---
  { id: 'c_m1', placeId: 'classroom', criterionId: 'c1', title: 'Протри парту' },
  { id: 'c_m2', placeId: 'classroom', criterionId: 'c2', title: 'Убери мусор рядом' },

  // --- bedroom ---
  { id: 'b_m1', placeId: 'bedroom', criterionId: 'b1', title: 'Заправь постель' },
  { id: 's_m2', placeId: 'street', criterionId: 's5', title: 'Разбери рабочее место' },

]
