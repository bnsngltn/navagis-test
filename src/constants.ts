import { LatLngLiteral, MapOptions, Place } from './types'

/**
 * The map elevation when it's first mounted to the DOM. I have yet to search the industry
 * standard for this value.
 */
export const INIT_ZOOM_LEVEL = 15
/**
 * The lat-long of Cebu City's center.
 * source: `https://latitudelongitude.org/ph/cebu-city/`
 */
export const CEBU_CITY: LatLngLiteral = { lat: 10.31672, lng: 123.89071 }
/**
 * Options to make the base map simpler so that we can easily
 * customize it with our own touch.
 */
export const MAP_OPTIONS: MapOptions = {
  mapId: 'c358f069b8e936c3',
  disableDefaultUI: true,
  clickableIcons: false,
}
/**
 * Could not seem to import the type definitions for the libraries which causes some issue with typescript.
 * Since with implicit typing, this results to `string[]` which is not accepted by the `useLoadScript` hook.
 */
export const MAP_LIBRARIES: ('places' | 'drawing')[] = ['places', 'drawing']
/**
 * Used in rendering our custom markers
 */
export const RESTAURANT_ICON =
  'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
/**
 * Used in sign in validation
 */
export const MIN_USERNAME_LENGTH = 6
/**
 * Used in persisting reviews to the local storage
 */
export const VISITS_LOCAL_STORAGE_KEY = 'bnsngltn-navagis-test-visits'
/**
 * Mock data that contains imaginary restaurants.
 */
export const places: Place[] = [
  {
    id: 1,
    name: 'Out of the Blue',
    position: { lat: 10.3168, lng: 123.89101 },
    img: 'https://image.shutterstock.com/image-photo/young-beautiful-woman-eating-pasta-600w-1937670175.jpg',
    specialties: ['lechon', 'chicken', 'pork', 'beef'],
  },
  {
    id: 2,
    name: 'Sugba Atbp',
    position: { lat: 10.327, lng: 123.90101 },
    img: 'https://image.shutterstock.com/image-photo/professional-chef-prepares-shrimps-greens-600w-1221605521.jpg',
    specialties: ['seafood', 'chicken', 'pork', 'beef'],
  },
  {
    id: 3,
    name: 'Mang Toktok Special Batchoy',
    position: { lat: 10.31792, lng: 123.90327 },
    img: 'https://image.shutterstock.com/image-photo/thai-northern-food-kanom-jeen-600w-720667279.jpg',
    specialties: ['seafood', 'chicken', 'pork', 'beef'],
  },
  {
    id: 4,
    name: 'The Night Cafe',
    position: { lat: 10.32456, lng: 123.89586 },
    img: 'https://image.shutterstock.com/image-photo/coffee-shop-bar-counter-cafe-600w-429638320.jpg',
    specialties: ['pizza', 'burger', 'seafood', 'grill', 'cafe'],
  },
  {
    id: 5,
    name: 'Meowwworld Korean Restaurant',
    position: { lat: 10.32496, lng: 123.89786 },
    img: 'https://image.shutterstock.com/image-photo/cuisine-culinary-buffet-dinner-catering-600w-1577107021.jpg',
    specialties: ['korean', 'seafood', 'grill', 'chicken', 'pork', 'beef'],
  },
  {
    id: 6,
    name: 'Miss Uy Lucky Star Malatang',
    position: { lat: 10.30861, lng: 123.88152 },
    img: 'https://image.shutterstock.com/image-photo/young-people-eating-thai-restaurant-600w-102940892.jpg',
    specialties: ['chinese', 'seafood', 'chicken', 'pork', 'beef'],
  },
  {
    id: 7,
    name: 'Donna Juana Steak House and Cafe',
    position: { lat: 10.32827, lng: 123.89352 },
    img: 'https://image.shutterstock.com/image-photo/black-angus-steak-tomatoes-rosemary-600w-1905358501.jpg',
    specialties: ['pizza', 'burger', 'steak', 'american', 'beef'],
  },
  {
    id: 8,
    name: 'Ambot Cakes',
    position: { lat: 10.32927, lng: 123.89352 },
    img: 'https://image.shutterstock.com/image-photo/red-velvet-cake-on-wood-600w-1709379307.jpg',
    specialties: ['cake', 'drinks'],
  },
  {
    id: 9,
    name: 'Ahjussi Korean Restaurant',
    position: { lat: 10.32827, lng: 123.89362 },
    img: 'https://image.shutterstock.com/image-photo/top-view-meat-steaks-assorted-600w-1907895547.jpg',
    specialties: ['korean', 'seafood', 'grill', 'chicken', 'pork', 'beef'],
  },
  {
    id: 10,
    name: 'Yang Yang Chinese Restaurant',
    position: { lat: 10.32837, lng: 123.89352 },
    img: 'https://image.shutterstock.com/image-photo/asian-food-served-on-black-600w-587404205.jpg',
    specialties: ['chinese', 'seafood', 'grill', 'chicken', 'pork', 'beef'],
  },
  {
    id: 11,
    name: 'Outdoor Burgers',
    position: { lat: 10.32627, lng: 123.89352 },
    img: 'https://image.shutterstock.com/image-photo/delicious-grilled-burgers-600w-1146199442.jpg',
    specialties: ['american', 'cafe'],
  },
  {
    id: 12,
    name: 'Greek Cafe',
    position: { lat: 10.32837, lng: 123.89355 },
    img: 'https://image.shutterstock.com/image-photo/greek-food-mix-on-blue-600w-533599030.jpg',
    specialties: ['chinese', 'seafood', 'cafe'],
  },
  {
    id: 13,
    name: 'Green Hotel Restaurant and Cafe',
    position: { lat: 10.32837, lng: 123.89359 },
    img: 'https://image.shutterstock.com/image-photo/fresh-greek-salad-tomato-cucumber-600w-1412444636.jpg',
    specialties: ['chinese', 'steak', 'korean', 'american', 'japanese', 'cafe'],
  },
  {
    id: 14,
    name: 'Ramen Gensan',
    position: { lat: 10.32927, lng: 123.89362 },
    img: 'https://image.shutterstock.com/image-photo/seafood-ramen-traditional-japanese-rice-600w-1526624183.jpg',
    specialties: ['japanese', 'seafood', 'chicken', 'pork', 'beef'],
  },
  {
    id: 15,
    name: 'Burger and Pizza Ville',
    position: { lat: 10.32857, lng: 123.89312 },
    img: 'https://image.shutterstock.com/image-photo/burgers-beef-chicken-pizza-600w-1870860118.jpg',
    specialties: ['cafe', 'burger', 'pizza'],
  },
  {
    id: 16,
    name: 'Mommy El Smokehouse Restaurant',
    position: { lat: 10.32527, lng: 123.89452 },
    img: 'https://image.shutterstock.com/image-photo/cut-large-piece-smoked-beef-600w-1377610568.jpg',
    specialties: ['steak', 'american', 'grill', 'chicken', 'pork', 'beef'],
  },
  {
    id: 17,
    name: 'Gensan Ichi Seafood and Resto',
    position: { lat: 10.32527, lng: 123.89152 },
    img: 'https://image.shutterstock.com/image-photo/seafood-sashimi-luxury-raw-food-600w-447769216.jpg',
    specialties: ['japanese', 'seafood', 'grill', 'chicken', 'pork', 'beef'],
  },
  {
    id: 18,
    name: 'Sangyup Home of Korean Buffet',
    position: { lat: 10.32627, lng: 123.89352 },
    img: 'https://image.shutterstock.com/image-photo/top-view-meat-steaks-assorted-600w-1907895547.jpg',
    specialties: ['korean', 'seafood', 'grill', 'chicken', 'pork', 'beef'],
  },
  {
    id: 19,
    name: 'Chicken House',
    position: { lat: 10.32427, lng: 123.89152 },
    img: null,
    specialties: ['grill', 'chicken'],
  },
  {
    id: 20,
    name: `Alfonso's SteakHouse`,
    position: { lat: 10.32427, lng: 123.89392 },
    img: null,
    specialties: ['steak', 'american', 'chicken', 'pork', 'beef'],
  },
  {
    id: 21,
    name: 'Kuya PJ Lechon Belly',
    position: { lat: 10.3171, lng: 123.88352 },
    img: null,
    specialties: ['steak', 'lechon', 'chicken', 'pork', 'beef'],
  },
]
