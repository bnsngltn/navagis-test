import {
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useCallback } from 'react'
import { SPECIALTIES, specialty } from '../types'
import {
  addSpecialtyFilter,
  clearFilters,
  closeModal,
  removeSpecialtyFilter,
  usePlacesFilterModalProvider,
} from './PlacesFilterModalContext'

const PlacesFilterModal = () => {
  const {
    state: {
      isOpen,
      filters: { specialties },
    },
    dispatch,
  } = usePlacesFilterModalProvider()

  const onClose = () => {
    closeModal(dispatch)
  }
  const isChecked = useCallback(
    (sp: specialty) => {
      return specialties.some((s) => s === sp)
    },
    [specialties],
  )

  const onCheckboxChangeHandler = (sp: specialty) => {
    const onChange = () => {
      if (isChecked(sp)) {
        removeSpecialtyFilter(dispatch, sp)
        return
      }
      addSpecialtyFilter(dispatch, sp)
    }

    return onChange
  }
  const onClear = () => {
    clearFilters(dispatch)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Filter Places</ModalHeader>
        <ModalBody>
          <ModalCloseButton />
          <Flex direction="column" gap="1rem">
            <Grid templateColumns="repeat(3, 1fr)">
              {SPECIALTIES.map((s, i) => {
                return (
                  <GridItem key={`${s}${i}`}>
                    <Checkbox
                      isChecked={isChecked(s)}
                      onChange={onCheckboxChangeHandler(s)}
                    >
                      {s}
                    </Checkbox>
                  </GridItem>
                )
              })}
            </Grid>
            <Flex justifyContent="flex-end" gap="0.25rem">
              {specialties.length > 0 && (
                <Button colorScheme="red" onClick={onClear}>
                  Clear
                </Button>
              )}
              <Button colorScheme="green" onClick={onClose}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default PlacesFilterModal
