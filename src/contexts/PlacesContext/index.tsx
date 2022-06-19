import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Place } from '../../types'

export interface SearchPlacesProps {
  q?: string
}

export interface IContext {
  places: Place[]
  filteredPlaces: Place[]
  filterPlaces: (props: SearchPlacesProps) => void
}
const Context = createContext<IContext | undefined>(undefined)

export interface PlacesProviderProps {
  places: Place[]
  children: ReactNode
}
export const PlacesProvider: FunctionComponent<PlacesProviderProps> = ({
  places,
  children,
}) => {
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([])

  /**
   * Return the places that match the given filters.
   */
  const filterPlaces = useCallback(
    ({ q }: SearchPlacesProps) => {
      if (!q) return

      setFilteredPlaces(
        places.filter((p) => {
          return p.name.toLowerCase().includes(q?.toLowerCase())
        }),
      )
    },
    [places],
  )

  return (
    <Context.Provider value={{ places, filteredPlaces, filterPlaces }}>
      {children}
    </Context.Provider>
  )
}

export const usePlaces = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within PlacesProvider')
  }

  return context
}
