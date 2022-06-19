import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import { closeCreateVisitModal, useVisitsDrawer } from './DrawerContext'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import { FormEvent, useRef, useState } from 'react'
import { addVisit, useVisits } from '../contexts/VisitsContext'
import { useUser } from '../contexts/UserContext'

const CreateVisitModal = () => {
  const {
    state: { isCreateModalOpen, selectedPlace },
    dispatch: visitsDrawerDispatch,
  } = useVisitsDrawer()
  const onClose = () => {
    closeCreateVisitModal(visitsDrawerDispatch)
  }

  const [isThumbsUp, setIsThumbsUp] = useState(true)
  const onThumbsUp = () => {
    setIsThumbsUp(true)
  }
  const onThumbsDown = () => {
    setIsThumbsUp(false)
  }

  const [date, setDate] = useState(new Date())

  const {
    state: { user },
  } = useUser()
  const { dispatch } = useVisits()
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!user) return
    if (!selectedPlace) return

    e.preventDefault()

    addVisit(dispatch, selectedPlace.id, {
      user,
      isThumbsUp,
      date,
    })
    onClose()

    // reset states
    setIsThumbsUp(true)
    setDate(new Date())
  }

  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <Modal
      isOpen={isCreateModalOpen}
      onClose={onClose}
      initialFocusRef={buttonRef}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Review</ModalHeader>
        <form onSubmit={onSubmit}>
          <ModalBody>
            <Text>
              Did you like your visit at{' '}
              <Box
                as="span"
                color="gray.700"
                fontWeight="semibold"
                cursor="pointer"
              >{`${selectedPlace?.name}`}</Box>
              ?
            </Text>
            <Flex justifyContent="center" gap="1rem" mt="1rem">
              <IconButton
                aria-label="thumbs-up"
                icon={<MdThumbUp color={isThumbsUp ? 'blue' : 'initial'} />}
                onClick={onThumbsUp}
                bgColor={isThumbsUp ? 'blue.100' : 'initial'}
              />
              <IconButton
                aria-label="thumbs-down"
                icon={<MdThumbDown color={!isThumbsUp ? 'red' : 'initial'} />}
                onClick={onThumbsDown}
                bgColor={!isThumbsUp ? 'red.100' : 'initial'}
              />
            </Flex>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
              />
              <FormHelperText>When did you visit this place?</FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr="0.5rem" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" ref={buttonRef}>
              Submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default CreateVisitModal
