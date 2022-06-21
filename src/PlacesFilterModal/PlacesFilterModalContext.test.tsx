import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { PlacesProvider } from '../contexts/PlacesContext'
import {
  addSpecialtyFilter,
  clearFilters,
  closeModal,
  initialState,
  openModal,
  PlacesFilterModalProvider,
  removeSpecialtyFilter,
  usePlacesFilterModalProvider,
} from './PlacesFilterModalContext'

const wrapper = ({ children }: { children: ReactNode }) => (
  <PlacesProvider places={[]}>
    <PlacesFilterModalProvider>{children}</PlacesFilterModalProvider>
  </PlacesProvider>
)
describe('PlacesFilterModalContext', () => {
  it('should initialize to the initial state', () => {
    const { result } = renderHook(() => usePlacesFilterModalProvider(), {
      wrapper,
    })

    expect(result.current.state).toStrictEqual({ ...initialState })
  })

  describe('openModal', () => {
    it('should open the mdoal regardless of its current state', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      act(() => {
        openModal(result.current.dispatch)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        isOpen: true,
      })
    })
  })

  describe('closeModal', () => {
    it('should close the mdoal regardless of its current state', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      // setup
      act(() => {
        openModal(result.current.dispatch)
      })

      act(() => {
        closeModal(result.current.dispatch)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        isOpen: false,
      })
    })
  })

  describe('addSpecialtyFilter', () => {
    it('should add a specialty to the top of the specialties filter array', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      // add one
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'japanese')
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          specialties: ['japanese'],
        },
      })

      // add another
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'beef')
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          specialties: ['beef', 'japanese'],
        },
      })
    })

    // could've used a SET for this one though lol
    it('should not add duplicate specialty to the specialties filter array', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      // add one
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'japanese')
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          specialties: ['japanese'],
        },
      })

      // add it again
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'japanese')
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          specialties: ['japanese'],
        },
      })
    })
  })

  describe('clearFilters', () => {
    it('should reset the filters property', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      // setup
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'japanese')
      })

      act(() => {
        clearFilters(result.current.dispatch)
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          ...initialState.filters,
        },
      })
    })
  })

  describe('removeSpecialtyFilter', () => {
    it('should remove the given filter', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      // setup
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'japanese')
      })
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'beef')
      })

      act(() => {
        removeSpecialtyFilter(result.current.dispatch, 'japanese')
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          specialties: ['beef'],
        },
      })
    })

    it('should safely handle if given filter is not in the current state', () => {
      const { result } = renderHook(() => usePlacesFilterModalProvider(), {
        wrapper,
      })

      // setup
      act(() => {
        addSpecialtyFilter(result.current.dispatch, 'beef')
      })

      act(() => {
        removeSpecialtyFilter(result.current.dispatch, 'japanese')
      })
      expect(result.current.state).toStrictEqual({
        ...initialState,
        filters: {
          specialties: ['beef'],
        },
      })
    })
  })
})
