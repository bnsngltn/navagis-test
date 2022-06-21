import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { Place } from '../../types'
import { FilterPlacesProps, PlacesProvider, usePlaces } from './'

const testPlaces: Place[] = [
  {
    id: 1,
    name: 'Tokyo Tokyo Buffet',
    position: { lat: 1, lng: 2 },
    img: 'google.com',
    specialties: ['japanese', 'cafe'],
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
  })

  describe('filterPlaces', () => {
    describe('with specialties filter', () => {
      it('should return all places that contains all specialties given', () => {
        const { result } = renderHook(() => usePlaces(), {
          wrapper,
        })

        // SECOND PLACE ONLY
        let filters: FilterPlacesProps = {
          specialties: ['chicken'],
        }
        act(() => {
          result.current.filterPlaces(filters)
        })
        expect(result.current.places).toStrictEqual([testPlaces[1]])

        // FIRST PLACE ONLY
        filters = {
          specialties: ['cafe', 'japanese'],
        }
        act(() => {
          result.current.filterPlaces(filters)
        })
        expect(result.current.places).toStrictEqual([testPlaces[0]])

        // RETURN ALL
        filters = {
          specialties: [],
        }
        act(() => {
          result.current.filterPlaces(filters)
        })
        expect(result.current.places).toStrictEqual(testPlaces)
      })
    })
  })
})
