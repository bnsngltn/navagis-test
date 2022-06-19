import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { Circle } from '../../types'

export interface IContext {
  circle: Circle | null
  /**
   * Safely add a new circle to map. Using this function ensures there is only one circle on screen.
   */
  addCircle: (newCircle: Circle) => void
  /**
   * Remove the circle drawn on screen if there is any.
   */
  clearCircle: () => void
}
const Context = createContext<IContext | undefined>(undefined)

export interface CircleProviderProps {
  children: ReactNode
}
export const CircleProvider: FunctionComponent<CircleProviderProps> = ({
  children,
}) => {
  const [circle, setCircle] = useState<Circle | null>(null)

  const addCircle = (newCircle: Circle) => {
    // make sure to limit to one circle only
    if (circle) {
      circle.setMap(null)
    }
    setCircle(newCircle)
  }

  const clearCircle = () => {
    if (!circle) return

    // this removes the circle overlay from the map
    circle.setMap(null)
    // cleans up internal state
    setCircle(null)
  }

  return (
    <Context.Provider value={{ circle, addCircle, clearCircle }}>
      {children}
    </Context.Provider>
  )
}

export const useCircle = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('Must be used within CircleProvider')
  }

  return context
}
