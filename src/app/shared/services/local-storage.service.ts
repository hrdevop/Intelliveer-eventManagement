import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  /**
   * Retrieves an item from local storage.
   * @param key The key of the item to retrieve.
   * @returns The retrieved item, or null if the key does not exist.
   */
  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Stores an item in local storage.
   * @param key The key under which to store the item.
   * @param value The value to store.
   */
  setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Removes an item from local storage.
   * @param key The key of the item to remove.
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
