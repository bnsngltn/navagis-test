import { act, renderHook } from '@testing-library/react'
import {
  PlacesAnalyticsModalProvider,
  usePlacesAnalyticsModal,
} from './PlacesAnalyticsModalContext'

describe('PlacesAnalyticsModalContext', () => {
  it('should initialize the modal as closed', () => {
    const { result } = renderHook(() => usePlacesAnalyticsModal(), {
      wrapper: PlacesAnalyticsModalProvider,
    })

    expect(result.current.open).toBe(false)
  })

  describe('onOpen', () => {
    it('should open the modal', () => {
      const { result } = renderHook(() => usePlacesAnalyticsModal(), {
        wrapper: PlacesAnalyticsModalProvider,
      })

      act(() => result.current.onOpen())
      expect(result.current.open).toBe(true)
    })
  })

  describe('onClose', () => {
    it('should close the modal', () => {
      const { result } = renderHook(() => usePlacesAnalyticsModal(), {
        wrapper: PlacesAnalyticsModalProvider,
      })

      // setup
      act(() => result.current.onOpen())

      act(() => result.current.onClose())
      expect(result.current.open).toBe(false)
    })
  })
})
