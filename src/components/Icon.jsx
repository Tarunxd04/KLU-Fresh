import React from 'react';

const paths = {
  search: 'M21 21l-5-5 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  heart: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  cart: 'M2 3h3l3 13h11l3-9H6 M9 21h.01 M18 21h.01',
  user: 'M20 21v-2a7 7 0 0 0-14 0v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  box: 'M3 6l9-4 9 4v12l-9 4-9-4Z M3 6l9 4 9-4 M12 10v12',
  leaf: 'M20 3C9 1 2 7 4 15c2 8 18 8 16-12Z M4 21L16 9',
  grid: 'M3 3h7v7H3Z M14 3h7v7h-7Z M3 14h7v7H3Z M14 14h7v7h-7Z',
  bottle: 'M9 2h6v5l3 4v10H6V11l3-4Z M6 13h12',
  wheat: 'M12 22V3 M12 9C5 9 5 5 5 5s7 0 7 4 M12 15c7 0 7-4 7-4s-7 0-7 4',
  arrowLeft: 'M19 12H5 M12 19l-7-7 7-7',
};
export function Icon({ name, size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.leaf} /></svg>;
}
