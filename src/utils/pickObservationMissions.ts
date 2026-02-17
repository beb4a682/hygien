import type { Criterion } from '../data/placeCriteria'
import { OBSERVATION_MISSIONS, type ObservationMission, type PlaceId } from '../data/observationMissions'

export type ObservationValues = Record<string, number>

/**
 * Возвращает id самых слабых критериев (низкие оценки).
 * values: { k1: 1..5, k2: 1..5 ... }
 */
export function getWeakCriterionIds(
  placeId: PlaceId,
  criteria: Criterion[],
  values: ObservationValues,
  limit = 2,
): string[] {
  const rows = criteria.map((c) => ({
    id: c.id,
    score: Number(values?.[c.id] ?? 0),
    weight: c.weight,
  }))

  // сортируем: сначала самые низкие оценки, потом более важные (weight)
  rows.sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score
    return b.weight - a.weight
  })

  return rows.slice(0, limit).map((x) => x.id)
}

/**
 * Подбирает миссии по слабым критериям.
 */
export function pickMissionsForWeakCriteria(
  placeId: PlaceId,
  weakCriterionIds: string[],
  limit = 2,
): ObservationMission[] {
  const pool = OBSERVATION_MISSIONS.filter((m) => m.placeId === placeId)

  const picked: ObservationMission[] = []

  for (const cid of weakCriterionIds) {
    const found = pool.find((m) => m.criterionId === cid)
    if (found && !picked.some((x) => x.id === found.id)) picked.push(found)
    if (picked.length >= limit) break
  }

  // если вдруг не хватает (нет миссий под критерий) — добиваем любыми из места
  if (picked.length < limit) {
    for (const m of pool) {
      if (!picked.some((x) => x.id === m.id)) picked.push(m)
      if (picked.length >= limit) break
    }
  }

  return picked.slice(0, limit)
}
