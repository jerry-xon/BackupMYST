import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();


export function setItem<T>(key: string, value: T): void {
    console.log('chac type of : - ', typeof value);
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    storage.set(key, value);
  } else {
    storage.set(key, JSON.stringify(value));
  }
}


export function getItem<T>(key: string): T | null {
  const strValue = storage.getString(key);
  if (strValue === undefined || strValue === null) return null;

  try {
    // Try to parse as JSON, fallback to primitive
    return JSON.parse(strValue) as T;
  } catch {
    // If not JSON, return as is (for string)
    return strValue as unknown as T;
  }
}


export function updateItem<T extends object>(
  key: string,
  partial: Partial<T>
): void {
  const current = getItem<T>(key) || {};
  const updated = { ...current, ...partial };
  setItem(key, updated);
}


export function deleteItem(key: string): void {
  storage.delete(key);
}
