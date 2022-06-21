import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { Place, specialty } from '../../types'

export interface FilterPlacesProps {
  specialties: specialty[]
}

export interface IContext {
  places: Place[]
  filterPlaces: (props: FilterPlacesProps) => void
}
const Context = createContext<IContext | undefined>(undefined)

export interface PlacesProviderProps {
  places: Place[]
  children: ReactNode
}
export const PlacesProvider: FunctionComponent<PlacesProviderProps> = ({
  places: allPlaces,
  children,
}) => {
  const [places, setPlaces] = useState<Place[]>(allPlaces)

  /**
   * Return the places that match the given filters.
   */
  const filterPlaces = useCallback(({ specialties }: FilterPlacesProps) => {
    if (specialties.length === 0) {
      setPlaces(allPlaces)
    }

    setPlaces(
      allPlaces.filter((p) => {
        return specialties.every((s) => p.specialties.includes(s))
      }),
    )
  }, [])

  return (
    <Context.Provider value={{ places, filterPlaces }}>
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
