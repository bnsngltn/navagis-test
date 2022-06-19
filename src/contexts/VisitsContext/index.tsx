import {
  FunctionComponent,
  ReactNode,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from 'react'
import { VISITS_LOCAL_STORAGE_KEY } from '../../constants'
import { showSuccessToast } from '../../toast'
import { PlaceVisit, Visit, VisitsSummary } from '../../types'

/**
 * They `key` corresponds to the `placeId` and it's value is a special data type
 * that will contain an array of the `visits` and a `summary` property that is an
 * aggregated statistics inferred from the array of visits.
 */
export type State = Record<number, PlaceVisit>

export const initialState: State = {}

interface AddVisitAction {
  type: 'add-visit'
  payload: {
    placeId: number
    visit: Visit
  }
}

// This provider only supports one action for now. But if this was a real project,
// having the actions inside a Union Type will make it easily extensible.
export type Action = AddVisitAction

export type Dispatch = (action: Action) => void

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add-visit':
      const oldVisits = state[action.payload.placeId]?.visits ?? []

      const newVisits = [action.payload.visit, ...oldVisits]
      const newSummary = calculateVisitsSummary(newVisits)

      return {
        ...state,
        [action.payload.placeId]: {
          visits: newVisits,
          summary: newSummary,
        },
      }

    default:
      return state
  }
}

const Context = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

export interface VisitsProviderProps {
  initialState?: State
  children: ReactNode
}
/**
 * Provider that enables it's child components access various statistics regarding the visits
 * each place has.
 */
export const VisitsProvider: FunctionComponent<VisitsProviderProps> = ({
  initialState: initialVisitsState = {},
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...initialVisitsState,
  })

  useEffect(() => {
    localStorage.setItem(VISITS_LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

/**
 * Custom hook to easily interact with the features that `VisitsProvider` offers.
 */
export const useVisits = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within VisitsProvider')
  }

  return context
}

/**
 * Utitlity function used in calculating the overall summary of a place given it's
 * array of visits. This function assumes that the visits array given is from the same place as
 * it will not perform the checks necessary.
 *
 * This function is not used outside of this module and is only exported for unit testing.
 */
export const calculateVisitsSummary = (visits: Visit[]): VisitsSummary => {
  const totalThumbsUp = visits.reduce((acc, v) => {
    if (v.isThumbsUp) {
      return acc + 1
    }
    return acc
  }, 0)
  const numberOfVisits = visits.length

  return {
    approvalRate: totalThumbsUp / numberOfVisits,
    numberOfVisits,
  }
}

/**
 * Add a visit to a placeId.
 */
export const addVisit = (dispatch: Dispatch, placeId: number, visit: Visit) => {
  dispatch({
    type: 'add-visit',
    payload: {
      placeId,
      visit,
    },
  })
  showSuccessToast('Review added')
}
