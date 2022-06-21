import { Flex, Text } from '@chakra-ui/react'
import { FunctionComponent, useMemo } from 'react'
import { CEBU_CITY } from '../constants'
import { useVisits } from '../contexts/VisitsContext'
import { Circle, LatLngLiteral, Place } from '../types'

interface Props {
  circle: Circle
  places: Place[]
}
const PlacesVicinityInfo: FunctionComponent<Props> = ({ circle, places }) => {
  const { state: visits } = useVisits()

  const placesWithinVicinity = useMemo(() => {
    return places.filter((p) => {
      const center = circle.getCenter()

      const pt1 = center ? { lat: center.lat(), lng: center.lng() } : CEBU_CITY

      const dist = solveDistance(pt1, p.position)
      const rad = circle.getRadius()

      return dist <= rad
    })
  }, [places, circle])
  const cumulativeVisits = useMemo(() => {
    return placesWithinVicinity.reduce((acc, p) => {
      const count = visits[p.id]?.summary.numberOfVisits ?? 0

      return acc + count
    }, 0)
  }, [placesWithinVicinity, visits])
  const averageApprovalRating = useMemo(() => {
    if (cumulativeVisits === 0) return 0
    return placesWithinVicinity.reduce((acc, p) => {
      const count = visits[p.id]?.summary.numberOfVisits ?? 0
      const rating = visits[p.id]?.summary.approvalRate ?? 0
      const weight = count / cumulativeVisits

      return acc + weight * rating
    }, 0)
  }, [placesWithinVicinity, visits])

  const averageApprovalRatingPercentage = (
    averageApprovalRating * 100
  ).toLocaleString(undefined, { maximumFractionDigits: 2 })

  return (
    <Flex direction="column" gap="0.25rem">
      <Text>{`Count: ${placesWithinVicinity.length} ${
        placesWithinVicinity.length === 1 ? 'place' : 'places'
      }`}</Text>
      <Text>{`Visits: ${cumulativeVisits} ${
        cumulativeVisits === 1 ? 'visit' : 'visits'
      }`}</Text>
      <Text>{`Weighted Approval: ${averageApprovalRatingPercentage}%`}</Text>
    </Flex>
  )
}

const solveDistance = (pt1: LatLngLiteral, pt2: LatLngLiteral) => {
  return google.maps.geometry.spherical.computeDistanceBetween(pt1, pt2)
}
export default PlacesVicinityInfo
