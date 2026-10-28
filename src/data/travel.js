import fujiPhoto from '../assets/img/fuji-snowboard.webp';

export const ORIGIN = { code: 'KIN', city: 'Kingston', country: 'Jamaica', lat: 17.94, lon: -76.79 };
export const HOME = { code: 'TPA', city: 'Tampa', country: 'USA', lat: 27.98, lon: -82.53 };

// Every route on the map leaves from Tampa. Order sets the arrivals board order.
export const VISITED = [
  { code: 'FCO', city: 'Roma', country: 'Italy', lat: 41.80, lon: 12.25 },
  { code: 'HND', city: 'Tokyo', country: 'Japan', lat: 35.55, lon: 139.78 },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', lat: 52.31, lon: 4.76 },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', lat: 43.68, lon: -79.63 },
  { code: 'JFK', city: 'New York', country: 'USA', lat: 40.64, lon: -73.78 },
  { code: 'BOS', city: 'Boston', country: 'USA', lat: 42.36, lon: -71.01 },
  { code: 'PHL', city: 'Philadelphia', country: 'USA', lat: 39.87, lon: -75.24 },
  { code: 'ORD', city: 'Chicago', country: 'USA', lat: 41.98, lon: -87.90 },
  { code: 'IND', city: 'Indianapolis', country: 'USA', lat: 39.72, lon: -86.29 },
  { code: 'ATL', city: 'Atlanta', country: 'USA', lat: 33.64, lon: -84.43 },
  { code: 'MIA', city: 'Miami', country: 'USA', lat: 25.79, lon: -80.29 },
  { code: 'MSY', city: 'New Orleans', country: 'USA', lat: 29.99, lon: -90.26 },
  { code: 'BNA', city: 'Nashville', country: 'USA', lat: 36.13, lon: -86.68 },
  { code: 'STL', city: 'St. Louis', country: 'USA', lat: 38.75, lon: -90.37 },
  { code: 'LAS', city: 'Las Vegas', country: 'USA', lat: 36.08, lon: -115.15 },
  { code: 'LAX', city: 'Los Angeles', country: 'USA', lat: 33.94, lon: -118.41 },
  { code: 'PDX', city: 'Portland', country: 'USA', lat: 45.59, lon: -122.6, },
];

export const UPCOMING = [
  { code: 'SLC', city: 'Salt Lake City', country: 'USA', lat: 40.79, lon: -111.98, when: 'Fall 2026' },
  { code: 'PWM', city: 'Portland, Maine', country: 'USA', lat: 43.65, lon: -70.31, when: 'Fall 2026' },
  { code: 'ICN', city: 'South Korea', country: 'South Korea', lat: 37.46, lon: 126.44, when: 'Winter 2026' },
];

export const countriesVisited = new Set([ORIGIN, HOME, ...VISITED].map((c) => c.country)).size;

// Trip photos. Drop images into src/assets/travel/<AIRPORT CODE>/ and they show up automatically.
// Optional captions go in CAPTIONS, keyed by "<CODE>/<file name>".
const CAPTIONS = {
  'PDX/IMG_4226.webp': "Cannon Beach, OR",
  'STL/IMG_3223.webp': "Busch Stadium, MO",
  'BOS/IMG_3330.webp': "Fenway Park, BOS",
  'FCO/IMG_0592.webp': "Rome, Italy"

};
const found = import.meta.glob('../assets/travel/*/*.{jpg,jpeg,png,webp,avif}', { eager: true, import: 'default' });

export const PHOTOS = [
  { code: 'HND', src: fujiPhoto, caption: 'Japan' },
  ...Object.entries(found).map(([path, src]) => {
    const [, code, file] = path.match(/travel\/([A-Z]{3})\/(.+)$/) || [];
    return { code, src, caption: CAPTIONS[`${code}/${file}`] || '' };
  }).filter((p) => p.code),
];

