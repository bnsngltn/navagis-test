import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { useMemo } from 'react'
import { Scatter } from 'react-chartjs-2'
import { CEBU_CITY } from '../constants'
import { usePlaces } from '../contexts/PlacesContext'
import { useVisits } from '../contexts/VisitsContext'
import { LatLngLiteral } from '../types'
import { usePlacesAnalyticsModal } from './PlacesAnalyticsModalContext'

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

const PlacesAnalyticsModal = () => {
  const { open, onClose } = usePlacesAnalyticsModal()
  const { places } = usePlaces()
  const { state: visitsState } = useVisits()

  // No need to unit test both of these datasets since we are just fetching data from well tested data providers
  const visitsData = useMemo(() => {
    const d = places.map((p) => {
      const y = visitsState[p.id]?.summary.numberOfVisits ?? 0
      const x = solveDistance(p.position, CEBU_CITY) / 1000

      return {
        x,
        y,
      }
    })
    return {
      datasets: [
        {
          label: 'Distance vs Visits',
          data: d,
          backgroundColor: 'rgba(255, 99, 132, 1)',
        },
      ],
    }
  }, [places, visitsState])
  const approvalData = useMemo(() => {
    const d = places.map((p) => {
      const y = visitsState[p.id]?.summary.approvalRate ?? 0
      const x = solveDistance(p.position, CEBU_CITY) / 1000

      return {
        x,
        y,
      }
    })
    return {
      datasets: [
        {
          label: 'Distance vs Approval Rate',
          data: d,
          backgroundColor: 'rgba(173, 216, 230, 1)',
        },
      ],
    }
  }, [places, visitsState])

  return (
    <Modal isOpen={open} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent pb="5rem">
        <ModalHeader>Analytics</ModalHeader>
        <ModalBody>
          <ModalCloseButton />
          <Flex direction="column" gap="1rem">
            <Scatter
              data={visitsData}
              options={{
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Distance from Cebu City (km)',
                    },
                  },
                  y: {
                    title: { display: true, text: 'Visits' },
                  },
                },
              }}
            />
            <Scatter
              data={approvalData}
              options={{
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Distance from Cebu City (km)',
                    },
                  },
                  y: {
                    title: { display: true, text: 'Approval Rate' },
                  },
                },
              }}
            />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const solveDistance = (pt1: LatLngLiteral, pt2: LatLngLiteral) => {
  return google.maps.geometry.spherical.computeDistanceBetween(pt1, pt2)
}

export default PlacesAnalyticsModal
