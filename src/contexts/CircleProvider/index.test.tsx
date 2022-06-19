import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { CircleProvider, useCircle } from '.'
import { createMock } from '@golevelup/ts-jest'
import { Circle } from '../../types'

describe('CircleContext', () => {
  it('should initialize to the current state', () => {
    const { result } = renderHook(() => useCircle(), {
      wrapper: CircleProvider,
    })

    expect(result.current.circle).toBeNull()
  })

  describe('addCircle', () => {
    it('should set the circle property to the given value', () => {
      const { result } = renderHook(() => useCircle(), {
        wrapper: CircleProvider,
      })

      const circle = createMock<Circle>()
      act(() => {
        result.current.addCircle(circle)
      })

      expect(result.current.circle).toStrictEqual(circle)
    })

    it('should set the initial circle before adding the new one', () => {
      const { result } = renderHook(() => useCircle(), {
        wrapper: CircleProvider,
      })

      // setup
      const circle = createMock<Circle>()
      act(() => {
        result.current.addCircle(circle)
      })

      // add a new one
      const circle2 = createMock<Circle>()
      act(() => {
        result.current.addCircle(circle2)
      })

      // calling this method with null removes the circle
      expect(circle.setMap).toBeCalledWith(null)
      expect(result.current.circle).toStrictEqual(circle2)
    })
  })

  describe('clearcircle', () => {
    it('should clear the circle', () => {
      const { result } = renderHook(() => useCircle(), {
        wrapper: CircleProvider,
      })

      // setup
      const circle = createMock<Circle>()
      act(() => {
        result.current.addCircle(circle)
      })

      act(() => {
        result.current.clearCircle()
      })
      expect(result.current.circle).toBeNull()
    })

    it('should safely handle if circle is null', () => {
      const { result } = renderHook(() => useCircle(), {
        wrapper: CircleProvider,
      })

      // no circle was added
      act(() => {
        result.current.clearCircle()
      })
      expect(result.current.circle).toBeNull()
    })
  })
})
