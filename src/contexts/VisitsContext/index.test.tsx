import { act, renderHook } from '@testing-library/react'
import {
  addVisit,
  calculateVisitsSummary,
  initialState,
  useVisits,
  VisitsProvider,
} from '.'
import { Visit, VisitsSummary } from '../../types'
import * as toast from '../../toast'

describe('VisitsContext', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize to the default state', () => {
    const { result } = renderHook(() => useVisits(), {
      wrapper: VisitsProvider,
    })

    expect(result.current.state).toStrictEqual({ ...initialState })
  })

  describe('calculateVisitsSummary', () => {
    /**
     * Three thumbs up, One thumbs down (75% approval rating)
     */
    const visits: Visit[] = [
      {
        user: {
          username: 'johnpaul',
          home: { name: 'Place1', position: { lat: 1, lng: 2 } },
        },
        isThumbsUp: true,
        date: new Date(),
      },
      {
        user: {
          username: 'dominic',
          home: { name: 'Place2', position: { lat: 2, lng: 4 } },
        },
        isThumbsUp: true,
        date: new Date(),
      },
      {
        user: {
          username: 'alexis',
          home: { name: 'Place3', position: { lat: 3, lng: 4 } },
        },
        isThumbsUp: false,
        date: new Date(),
      },
      {
        user: {
          username: 'ursula',
          home: { name: 'Place4', position: { lat: 3, lng: 5 } },
        },
        isThumbsUp: true,
        date: new Date(),
      },
    ]

    it('should calculate the correct summary given an array of visits', () => {
      const expected: VisitsSummary = {
        approvalRate: 0.75,
        numberOfVisits: 4,
      }

      expect(calculateVisitsSummary(visits)).toStrictEqual(expected)
    })
  })

  describe('addVisit', () => {
    // Visits for placeId = 123
    const visit1: Visit = {
      user: {
        username: 'ursula',
        home: { name: 'Place1', position: { lat: 3, lng: 5 } },
      },
      isThumbsUp: true,
      date: new Date(),
    }
    const visit2: Visit = {
      user: {
        username: 'doradora',
        home: { name: 'Place2', position: { lat: 3, lng: 4 } },
      },
      isThumbsUp: false,
      date: new Date(),
    }

    // Visits for placeId = 789
    const visit3: Visit = {
      user: {
        username: 'margarita',
        home: { name: 'Place3', position: { lat: 2, lng: 1 } },
      },
      isThumbsUp: false,
      date: new Date(),
    }

    it('should add a visit to a given `placeId` and recalculate the summary', () => {
      // setup
      const { result } = renderHook(() => useVisits(), {
        wrapper: VisitsProvider,
      })
      jest.spyOn(toast, 'showSuccessToast')

      // First visit to placeId = 123
      act(() => {
        addVisit(result.current.dispatch, 123, visit1)
      })
      let summary123: VisitsSummary = {
        approvalRate: 1,
        numberOfVisits: 1,
      }
      expect(result.current.state).toStrictEqual({
        123: {
          visits: [visit1],
          summary: summary123,
        },
      })
      expect(toast.showSuccessToast).toBeCalledTimes(1)

      // First visit to placeId = 789
      act(() => {
        addVisit(result.current.dispatch, 789, visit3)
      })
      const summary789: VisitsSummary = {
        approvalRate: 0,
        numberOfVisits: 1,
      }
      expect(result.current.state).toStrictEqual({
        123: {
          visits: [visit1],
          summary: summary123,
        },
        789: {
          visits: [visit3],
          summary: summary789,
        },
      })
      expect(toast.showSuccessToast).toBeCalledTimes(2)

      // Second visit to placeId = 123, summary must be changed
      act(() => {
        addVisit(result.current.dispatch, 123, visit2)
      })
      summary123 = {
        approvalRate: 0.5,
        numberOfVisits: 2,
      }
      expect(result.current.state).toStrictEqual({
        123: {
          visits: [visit2, visit1],
          summary: summary123,
        },
        789: {
          visits: [visit3],
          summary: summary789,
        },
      })
      expect(toast.showSuccessToast).toBeCalledTimes(3)
    })
  })
})
