// GOOGLE MAP
export type LatLngLiteral = google.maps.LatLngLiteral
export type MapOptions = google.maps.MapOptions
export type DirectionsResult = google.maps.DirectionsResult
export type Map = google.maps.Map
export type Circle = google.maps.Circle

// USERS
export interface User {
  username: string
  home: {
    name: string
    position: LatLngLiteral
  }
}

// Places
export type specialty =
  | 'pizza'
  | 'burger'
  | 'chinese'
  | 'steak'
  | 'korean'
  | 'american'
  | 'japanese'
  | 'seafood'
  | 'grill'
  | 'cafe'
  | 'lechon'
  | 'chicken'
  | 'pork'
  | 'beef'
  | 'cake'
  | 'drinks'

export interface Place {
  id: number
  name: string
  img: string | null
  position: LatLngLiteral
  specialties: specialty[]
}

// Visits

/**
 * One visit made by a user to a specific place.
 */
export interface Visit {
  user: User
  isThumbsUp: boolean
  date: Date
}

/**
 * The state of a visit object when freshly parsed from the localStorage
 *
 * This is necessary since date objects are serialized/deserialized as strings.
 */
export interface JSONVisit extends Omit<Visit, 'date'> {
  date: string
}

/**
 * An aggregated statistic inferred from all the `visits` a specic place has.
 */
export interface VisitsSummary {
  approvalRate: number
  numberOfVisits: number
}

/**
 * Data type combining the `Visit` array and it's corresponding `summary`. Will be used
 * to represent the internal state of the `VisitsProvider`.
 */
export interface PlaceVisit {
  visits: Visit[]
  summary: VisitsSummary
}

/**
 * State of the PlaceVisit object when freshly parsed from the localStorage
 *
 * Only the visits property was replaced since it contains a Date object.
 */
export interface JsonPlaceVisit extends Omit<PlaceVisit, 'visits'> {
  visits: JSONVisit[]
  summary: VisitsSummary
}
