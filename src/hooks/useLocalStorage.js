import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn(`Error reading localStorage key "${key}":`, err);
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    try {
      if (value === undefined) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (err) {
      console.warn(`Error setting localStorage key "${key}":`, err);
    }
  }, [key, value]);

  return [value, setValue];
}
