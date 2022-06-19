import { renderHook } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { initialState, signIn, signOut, State, UserProvider, useUser } from '.'
import * as toast from '../../toast'

describe('UsersContext', () => {
  const username = 'navagis'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize to the default state', () => {
    const { result } = renderHook(() => useUser(), { wrapper: UserProvider })

    expect(result.current.state).toStrictEqual({ ...initialState })
  })

  describe('signIn', () => {
    it('should set the user property using the given username', () => {
      const { result } = renderHook(() => useUser(), { wrapper: UserProvider })

      // setup
      jest.spyOn(toast, 'showSuccessToast')

      act(() => {
        signIn(result.current.dispatch, username, 'Cebu', { lat: 1, lng: 2 })
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        user: {
          username,
          home: {
            name: 'Cebu',
            position: {
              lat: 1,
              lng: 2,
            },
          },
        },
      } as State)
      expect(toast.showSuccessToast).toBeCalledWith(`Welcome ${username}`)
    })
  })

  describe('signOut', () => {
    it('should set the user property to null', () => {
      const { result } = renderHook(() => useUser(), { wrapper: UserProvider })

      // setup
      act(() => {
        signIn(result.current.dispatch, username, 'Cebu', { lat: 1, lng: 2 })
      })
      jest.spyOn(toast, 'showInfoToast')

      // actual test
      act(() => {
        signOut(result.current.dispatch)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        user: null,
      } as State)
      expect(toast.showInfoToast).toBeCalledWith('Thank you')
    })
  })
})
