import {
  Button,
  Divider,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  Image,
  Box,
  IconButton,
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { useVisits } from '../contexts/VisitsContext'
import { VisitsSummary } from '../types'
import CreateVisitModal from './CreateVisitModal'
import {
  closeVisitsDrawer,
  getDirections,
  openCreateVisitModal,
  useVisitsDrawer,
} from './DrawerContext'
import SpecialtySection from './SpecialtySection'
import VisitsFeed from './VisitsFeed'
import VisitsSummarySection from './VisitsSummarySection'

const Drawer = () => {
  const {
    state: { selectedPlace },
    dispatch,
  } = useVisitsDrawer()
  const { state } = useVisits()
  const visits = state[selectedPlace?.id ?? 0]?.visits ?? []
  const summary: VisitsSummary = state[selectedPlace?.id ?? 0]?.summary ?? {
    approvalRate: 0,
    numberOfVisits: 0,
  }

  const isOpen = Boolean(selectedPlace)
  const onClose = () => {
    closeVisitsDrawer(dispatch)
  }

  const onClickVisit = () => {
    openCreateVisitModal(dispatch)
  }
  const onClickDirections = () => {
    if (!selectedPlace) return
    getDirections(dispatch, selectedPlace)
  }

  if (!selectedPlace) {
    return null
  }

  return (
    <>
      <CreateVisitModal />
      <ChakraDrawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size={{ base: 'sm', md: 'md' }}
      >
        <DrawerOverlay />
        <DrawerContent bgColor="white" zIndex="100">
          <DrawerBody>
            <Flex direction="column">
              <Flex justifyContent="flex-end">
                <IconButton
                  aria-label="close-drawer"
                  icon={<MdClose />}
                  onClick={onClose}
                  _focus={{ border: 0, boxShadow: 'none' }}
                />
              </Flex>
              <Flex
                direction="column"
                position="sticky"
                top={-5}
                zIndex="100"
                bgColor="white"
                p="1rem"
              >
                {selectedPlace.img && (
                  <Box
                    width="100%"
                    maxH="200px"
                    overflow="hidden"
                    borderRadius="md"
                  >
                    <Image
                      src={selectedPlace.img}
                      objectFit="cover"
                      objectPosition="100% 0"
                      mb="0.5rem"
                      transition="transform .5s ease"
                      _hover={{
                        transform: 'scale(1.5)',
                      }}
                    />
                  </Box>
                )}
                <Text fontSize="2xl" fontWeight="bold">
                  {selectedPlace.name}
                </Text>
                <SpecialtySection data={selectedPlace.specialties} />
                <Text fontSize="lg" fontWeight="semibold" color="gray.600">
                  Cebu, Phillipines
                </Text>
                <VisitsSummarySection visitsSummary={summary} />
                <Flex
                  justifyContent="flex-end"
                  alignItems="center"
                  gap="1rem"
                  mt="0.5rem"
                >
                  <Button colorScheme="green" onClick={onClickDirections}>
                    Directions
                  </Button>
                  <Button colorScheme="blue" onClick={onClickVisit}>
                    Add Review
                  </Button>
                </Flex>
                <Divider mt="0.5rem" mb="0.75rem" />
              </Flex>
              <VisitsFeed place={selectedPlace} visits={visits} />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  )
}

export default Drawer
