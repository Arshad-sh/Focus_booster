/**
 * LocalStorage utility helpers for Focus Booster
 * Handles auth token, user settings, timer history
 */

// Prefix to avoid conflicts
const STORAGE_PREFIX = 'focus-booster-';

/**
 * Set item in localStorage
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.error('Storage set error:', error);
  }
};

/**
 * Get item from localStorage
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Storage get error:', error);
    return defaultValue;
  }
};

/**
 * Remove item from localStorage
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error('Storage remove error:', error);
  }
};

/**
 * Clear all Focus Booster data
 */
export const clearAll = () => {
  try {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(STORAGE_PREFIX)) {
