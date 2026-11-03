import { STORAGE_KEYS, ADMIN_ACCOUNTS } from './constants';

export function authReadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed === null || parsed === undefined ? fallback : parsed;
  } catch (err) {
    console.warn(`[auth] Could not parse localStorage key "${key}", resetting it.`, err);
    return fallback;
  }
}

export function authWriteJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[auth] Could not write localStorage key "${key}".`, err);
    return false;
  }
}

export function demoObfuscatePassword(password) {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0; // force 32-bit int
  }
  return `demo_${Math.abs(hash).toString(36)}_${password.length}`;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getStoredUsers() {
  return authReadJSON(STORAGE_KEYS.USERS, []);
}

export function saveStoredUsers(users) {
  authWriteJSON(STORAGE_KEYS.USERS, users);
}

export function makeUserId() {
  return 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
