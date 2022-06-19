import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useReducer,
} from 'react'
import { showInfoToast, showSuccessToast } from '../../toast'
import { LatLngLiteral, User } from '../../types'

export interface State {
  user: User | null
}

export const initialState: State = {
  user: null,
}

interface SignInAction {
  type: 'sign-in'
  payload: User
}
interface SignOutAction {
  type: 'sign-out'
}

export type Action = SignInAction | SignOutAction

export type Dispatch = (action: Action) => void

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'sign-in': {
      return {
        ...state,
        user: action.payload,
      }
    }
    case 'sign-out':
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}

const Context = createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined,
)

export interface UserProviderProps {
  children: ReactNode
}

/**
 * Wrap your components with this Provider to easily access if there is a
 * currently `signed-in` user that is able to give ratings to the different places.
 */
export const UserProvider: FunctionComponent<UserProviderProps> = ({
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
 * Custom hook to easily interact with the features that `UserProvider` offers.
 */
export const useUser = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within UserProvider')
  }

  return context
}

/**
 * Sign in given a username.
 *
 * Does not perform any `authentication` logic yet.
 */
export const signIn = (
  dispatch: Dispatch,
  username: string,
  homeName: string,
  homePosition: LatLngLiteral,
) => {
  // Just call the dispatch action directly
  // We can easily expand this action to include actual authentication later on
  // But for demo purposes, let's keep it simple.
  dispatch({
    type: 'sign-in',
    payload: {
      username,
      home: { name: homeName, position: homePosition },
    },
  })
  showSuccessToast(`Welcome ${username}`)
}

/**
 * Sign out of the platform (set the `user` to `null`)
 */
export const signOut = (dispatch: Dispatch) => {
  dispatch({
    type: 'sign-out',
  })
  showInfoToast('Thank you')
}
