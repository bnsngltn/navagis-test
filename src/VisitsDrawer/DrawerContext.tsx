import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useReducer,
} from 'react'
import { showInfoToast } from '../toast'
import { LatLngLiteral, Place } from '../types'

export interface State {
  /**
   * If this is not nullish, the `Drawer` should be open
   */
  selectedPlace: Place | null
  isCreateModalOpen: boolean
  destination: LatLngLiteral | null
}

export const initialState: State = {
  selectedPlace: null,
  isCreateModalOpen: false,
  destination: null,
}

interface OpenDrawerAction {
  type: 'open-drawer'
  payload: Place
}
interface CloseDrawerAction {
  type: 'close-drawer'
}

interface OpenCreateVisitModalAction {
  type: 'open-create-visit-modal'
}
interface CloseCreateVisitModalAction {
  type: 'close-create-visit-modal'
}

interface GetDirectionsAction {
  type: 'get-directions'
  payload: LatLngLiteral
}

export type Action =
  | OpenDrawerAction
  | CloseDrawerAction
  | OpenCreateVisitModalAction
  | CloseCreateVisitModalAction
  | GetDirectionsAction

export type Dispatch = (action: Action) => void

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open-drawer':
      return {
        ...state,
        selectedPlace: action.payload,
        isCreateModalOpen: false,
      }
    case 'close-drawer':
      return {
        ...state,
        selectedPlace: null,
        isCreateModalOpen: false,
      }
    case 'open-create-visit-modal':
      return {
        ...state,
        isCreateModalOpen: true,
      }
    case 'open-create-visit-modal':
      return {
        ...state,
        isCreateModalOpen: true,
      }
    case 'close-create-visit-modal':
      return {
        ...state,
        isCreateModalOpen: false,
      }
    case 'get-directions':
      return {
        ...state,
        isCreateModalOpen: false,
        selectedPlace: null,
        destination: action.payload,
      }
    default:
      return state
  }
}

const Context = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)
export interface DrawerContextProps {
  children: ReactNode
}
/**
 * Handles all application states related to the visits drawer
 */
export const VisitsDrawerProvider: FunctionComponent<DrawerContextProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  })

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

/**
 * Allows other components to access and modify the internal state of the visits drawer
 */
export const useVisitsDrawer = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within VisitsDrawerProvider')
  }

  return context
}

/**
 * Open the drawer and view the details of your selected place.
 */
export const openVisitsDrawer = (dispatch: Dispatch, place: Place) => {
  dispatch({
    type: 'open-drawer',
    payload: place,
  })
}

/**
 * Close the drawer and by making the `selectedPlace` null
 */
export const closeVisitsDrawer = (dispatch: Dispatch) => {
  dispatch({
    type: 'close-drawer',
  })
}

/**
 * Open the modal so that the user can submit his/her visit
 */
export const openCreateVisitModal = (dispatch: Dispatch) => {
  dispatch({
    type: 'open-create-visit-modal',
  })
}
/**
 * Close the modal
 */
export const closeCreateVisitModal = (dispatch: Dispatch) => {
  dispatch({
    type: 'close-create-visit-modal',
  })
}

/**
 * Get directions to a place. The coordinates of the place will
 * be the destination while the origin is the current user's home address.
 */
export const getDirections = (dispatch: Dispatch, place: Place) => {
  dispatch({
    type: 'get-directions',
    payload: place.position,
  })
  showInfoToast('Fetching directions')
}
