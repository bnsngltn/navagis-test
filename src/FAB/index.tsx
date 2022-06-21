import { Flex, IconButton, Tooltip } from '@chakra-ui/react'
import { MdBarChart, MdClear, MdSearch } from 'react-icons/md'
import { useCircle } from '../contexts/CircleProvider'
import { usePlacesAnalyticsModal } from '../PlacesAnalyticsModal/PlacesAnalyticsModalContext'
import {
  clearFilters,
  openModal,
  usePlacesFilterModalProvider,
} from '../PlacesFilterModal/PlacesFilterModalContext'

const FAB = () => {
  const { circle, clearCircle } = useCircle()
  const { onOpen: openPlacesAnalyticsModal } = usePlacesAnalyticsModal()
  const {
    state: {
      filters: { specialties },
    },
    dispatch,
  } = usePlacesFilterModalProvider()

  const onClickFilterPlaces = () => {
    openModal(dispatch)
  }
  const onClearFilters = () => {
    clearFilters(dispatch)
  }

  return (
    <Flex
      direction="column"
      position="fixed"
      bottom="40px"
      right="40px"
      zIndex="100"
      gap="1rem"
    >
      <Tooltip label="Filter Places">
        <IconButton
          aria-label="filter-places"
          icon={<MdSearch />}
          colorScheme="green"
          borderRadius="50%"
          onClick={onClickFilterPlaces}
        />
      </Tooltip>
      {specialties.length > 0 && (
        <Tooltip label="Clear Filter">
          <IconButton
            aria-label="clear-filters"
            icon={<MdClear />}
            colorScheme="orange"
            borderRadius="50%"
            onClick={onClearFilters}
          />
        </Tooltip>
      )}
      <Tooltip label="View Analytics">
        <IconButton
          aria-label="view-analytics"
          icon={<MdBarChart />}
          colorScheme="blue"
          borderRadius="50%"
          onClick={openPlacesAnalyticsModal}
        />
      </Tooltip>
      {circle && (
        <Tooltip label="Delete Drawings">
          <IconButton
            aria-label="delete-drawings"
            icon={<MdClear />}
            colorScheme="red"
            borderRadius="50%"
            onClick={clearCircle}
          />
        </Tooltip>
      )}
    </Flex>
  )
}

export default FAB
