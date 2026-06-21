import { createInitialState, type FamilyState, normalizeState } from './domain';

const STORAGE_KEY = 'daughter-cloud-pet-web:v1';

export interface StoredStateResult {
  state: FamilyState;
  storageAvailable: boolean;
  error: string | null;
}

export function loadState(now = new Date()): StoredStateResult {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { state: createInitialState(now), storageAvailable: true, error: null };
    }
    return { state: normalizeState(JSON.parse(raw), now), storageAvailable: true, error: null };
  } catch (error) {
    return {
      state: createInitialState(now),
      storageAvailable: false,
      error: error instanceof Error ? error.message : 'local storage unavailable'
    };
  }
}

export function saveState(state: FamilyState): { ok: boolean; error: string | null } {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return { ok: true, error: null };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'local storage unavailable'
    };
  }
}

export function clearStoredState(): { ok: boolean; error: string | null } {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    return { ok: true, error: null };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'local storage unavailable'
    };
  }
}
