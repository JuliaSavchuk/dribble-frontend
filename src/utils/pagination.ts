import type { PaginatedResponse } from '../types'

/**
 * Деякі бекенд-ендпоінти (наприклад, GET /api/shots/:id/comments/ — див. BUG-3
 * у TESTING_PLAN.md, або GET /api/users/:username/liked/ — див. BUG-8) можуть
 * повертати як пагінований об'єкт `{ count, next, previous, results }`,
 * так і простий масив `[...]`, залежно від того, чи застосовано відповідне
 * виправлення на бекенді.
 *
 * Ця функція приводить будь-яку з цих форм до єдиного пагінованого формату,
 * щоб компоненти фронтенду завжди могли безпечно звертатись до `.results`
 * та `.count`, не падаючи з помилкою на кшталт
 * "Cannot read properties of undefined (reading 'length')".
 */
export function normalizePaginated<T>(
  data: PaginatedResponse<T> | T[] | undefined | null
): PaginatedResponse<T> {
  if (Array.isArray(data)) {
    return { count: data.length, next: null, previous: null, results: data }
  }
  if (data && Array.isArray(data.results)) {
    return data
  }
  return { count: 0, next: null, previous: null, results: [] }
}
