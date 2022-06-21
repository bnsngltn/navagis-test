import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react'

export interface IContext {
  /**
   * Dictates whether the PlacesAnalyticsModal is open or not
   */
  open: boolean
  /**
   * Closes the modal no matter it's current state
   */
  onClose: () => void
  /**
   * Opens the modal no matters it's current state
   */
  onOpen: () => void
}
const Context = createContext<IContext | undefined>(undefined)

export interface PlacesAnalyticsModalProviderProps {
  children: ReactNode
}
export const PlacesAnalyticsModalProvider: FunctionComponent<
  PlacesAnalyticsModalProviderProps
> = ({ children }) => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }
  const onOpen = () => {
    setOpen(true)
  }
  return (
    <Context.Provider value={{ open, onClose, onOpen }}>
      {children}
    </Context.Provider>
  )
}

export const usePlacesAnalyticsModal = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within PlacesAnalyticsModalProvider')
  }

  return context
}
