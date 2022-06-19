import { act, renderHook } from '@testing-library/react'
import { Place } from '../types'
import {
  closeCreateVisitModal,
  closeVisitsDrawer,
  getDirections,
  initialState,
  openCreateVisitModal,
  openVisitsDrawer,
  useVisitsDrawer,
  VisitsDrawerProvider,
} from './DrawerContext'
import * as toast from '../toast'

describe('DrawerContext', () => {
  const place: Place = {
    id: 123,
    name: 'Food and Beverages',
    position: { lat: 1, lng: 2 },
    img: 'google.com',
    specialties: ['cafe'],
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize to the default state', () => {
    const { result } = renderHook(() => useVisitsDrawer(), {
      wrapper: VisitsDrawerProvider,
    })

    expect(result.current.state).toStrictEqual({ ...initialState })
  })

  describe('openVisitsDrawer', () => {
    it('should set the selectedPlace to the given payload', () => {
      const { result } = renderHook(() => useVisitsDrawer(), {
        wrapper: VisitsDrawerProvider,
      })

      act(() => {
        openVisitsDrawer(result.current.dispatch, place)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        selectedPlace: place,
        isCreateModalOpen: false,
      })
    })
  })

  describe('closeVisitsDrawer', () => {
    it('should set the selectedPlace to null', () => {
      const { result } = renderHook(() => useVisitsDrawer(), {
        wrapper: VisitsDrawerProvider,
      })

      // setup
      act(() => {
        openVisitsDrawer(result.current.dispatch, place)
      })

      act(() => {
        closeVisitsDrawer(result.current.dispatch)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        selectedPlace: null,
        isCreateModalOpen: false,
      })
    })
  })

  describe('openCreateVisitModal', () => {
    it('should set the modal open state to true', () => {
      const { result } = renderHook(() => useVisitsDrawer(), {
        wrapper: VisitsDrawerProvider,
      })

      act(() => {
        openCreateVisitModal(result.current.dispatch)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        isCreateModalOpen: true,
      })
    })
  })

  describe('closeCreateVisitModal', () => {
    it('should set the modal open state to false', () => {
      const { result } = renderHook(() => useVisitsDrawer(), {
        wrapper: VisitsDrawerProvider,
      })

      // setup
      act(() => {
        openCreateVisitModal(result.current.dispatch)
      })

      act(() => {
        closeCreateVisitModal(result.current.dispatch)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        isCreateModalOpen: false,
      })
    })
  })

  describe('getDirections', () => {
    it('should set destination while closing drawer and modal', () => {
      const { result } = renderHook(() => useVisitsDrawer(), {
        wrapper: VisitsDrawerProvider,
      })

      // setup
      jest.spyOn(toast, 'showInfoToast')
      act(() => {
        openVisitsDrawer(result.current.dispatch, place)
      })

      act(() => {
        getDirections(result.current.dispatch, place)
      })

      expect(result.current.state).toStrictEqual({
        ...initialState,
        isCreateModalOpen: false,
        selectedPlace: null,
        destination: place.position,
      })
      expect(toast.showInfoToast).toBeCalledWith('Fetching directions')
    })
  })
})
