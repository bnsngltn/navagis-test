import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { Place } from '../../types'
import { PlacesProvider, usePlaces } from './'

const testPlaces: Place[] = [
  {
    id: 1,
    name: 'Tokyo Tokyo Buffet',
    position: { lat: 1, lng: 2 },
    img: 'google.com',
    specialties: ['japanese'],
  },
  {
    id: 2,
    name: 'Unlimited Chicken Wings',
    position: { lat: 2, lng: 4 },
    img: 'google.com',
    specialties: ['chicken'],
  },
]
const wrapper = ({ children }: { children: ReactNode }) => (
  <PlacesProvider places={testPlaces}>{children}</PlacesProvider>
)

describe('PlacesContext', () => {
  it('should initialize to the given places props', () => {
    const { result } = renderHook(() => usePlaces(), {
      wrapper,
    })

    expect(result.current.places).toStrictEqual(testPlaces)
    expect(result.current.filteredPlaces).toStrictEqual([])
  })

  describe('filterPlaces', () => {
    describe('with q filter', () => {
      it('should be case insensitive', () => {
        const { result } = renderHook(() => usePlaces(), {
          wrapper,
        })

        // first place
        act(() => {
          result.current.filterPlaces({ q: 'tokYo tokYo buFFet' })
        })
        expect(result.current.filteredPlaces).toStrictEqual([testPlaces[0]])

        // second place
        act(() => {
          result.current.filterPlaces({ q: 'UnlIMITED chICKen wings' })
        })
        expect(result.current.filteredPlaces).toStrictEqual([testPlaces[1]])
      })

      it('partial search strings should work', () => {
        const { result } = renderHook(() => usePlaces(), {
          wrapper,
        })

        // first place
        act(() => {
          result.current.filterPlaces({ q: 'TOKYO' })
        })
        expect(result.current.filteredPlaces).toStrictEqual([testPlaces[0]])

        // second place
        act(() => {
          result.current.filterPlaces({ q: 'WINGS' })
        })
        expect(result.current.filteredPlaces).toStrictEqual([testPlaces[1]])
      })
    })
  })
})
