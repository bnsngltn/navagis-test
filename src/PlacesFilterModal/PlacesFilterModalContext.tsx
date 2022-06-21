import {
  FunctionComponent,
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import { FilterPlacesProps, usePlaces } from '../contexts/PlacesContext'
import { specialty } from '../types'

export interface State {
  isOpen: boolean
  filters: FilterPlacesProps
}

export const initialState: State = {
  isOpen: false,
  filters: {
    specialties: [],
  },
}

interface OpenModalAction {
  type: 'open-modal'
}
interface CloseModalAction {
  type: 'close-modal'
}

interface AddSpecialtyFilterAction {
  type: 'add-specialty-filter'
  payload: specialty
}
interface RemoveSpecialtyFilterAction {
  type: 'remove-specialty-filter'
  payload: specialty
}
interface ClearFiltersAction {
  type: 'clear-filters'
}

export type Action =
  | OpenModalAction
  | CloseModalAction
  | AddSpecialtyFilterAction
  | RemoveSpecialtyFilterAction
  | ClearFiltersAction

export type Dispatch = (action: Action) => void

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open-modal':
      return {
        ...state,
        isOpen: true,
      }
    case 'close-modal':
      return {
        ...state,
        isOpen: false,
      }
    case 'add-specialty-filter':
      if (state.filters.specialties.includes(action.payload)) {
        return state
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          specialties: [action.payload, ...state.filters.specialties],
        },
      }
    case 'remove-specialty-filter':
      return {
        ...state,
        filters: {
          ...state.filters,
          specialties: state.filters.specialties.filter(
            (s) => s !== action.payload,
          ),
        },
      }
    case 'clear-filters':
      return {
        ...state,
        filters: {
          ...initialState.filters,
        },
      }
    default:
      return state
  }
}

const Context = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)
export interface PlacesFilterModalProviderProps {
  children: ReactNode
}

export const PlacesFilterModalProvider: FunctionComponent<
  PlacesFilterModalProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState })

  const { filterPlaces } = usePlaces()
  useEffect(() => {
    filterPlaces(state.filters)
  }, [state.filters])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const usePlacesFilterModalProvider = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within PlacesFilterModalProvider')
  }

  return context
}

export const openModal = (dispatch: Dispatch) => {
  dispatch({
    type: 'open-modal',
  })
}
export const closeModal = (dispatch: Dispatch) => {
  dispatch({
    type: 'close-modal',
  })
}

export const addSpecialtyFilter = (dispatch: Dispatch, payload: specialty) => {
  dispatch({
    type: 'add-specialty-filter',
    payload,
  })
}

export const clearFilters = (dispatch: Dispatch) => {
  dispatch({
    type: 'clear-filters',
  })
}

export const removeSpecialtyFilter = (
  dispatch: Dispatch,
  payload: specialty,
) => {
  dispatch({
    type: 'remove-specialty-filter',
    payload,
  })
}
