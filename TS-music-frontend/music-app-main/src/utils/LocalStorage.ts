// utils/localStorage.ts

/**
 * Retrieves and parses a value from local storage.
 * @param key - The key to retrieve the value from local storage.
 * @param defaultValue - The value to return if the key does not exist or parsing fails.
 * @returns The parsed value or the default value.
 */
export const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    // console.log("get local");
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
  }
  return defaultValue; // Return the default value if parsing fails
};

/**
 * Sets a value in local storage.
 * @param key - The key to store the value under.
 * @param value - The value to store.
 */
export const setLocalStorageItem = <T>(key: string, value: T): void => {
  try {
    // console.log("set local");
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};
