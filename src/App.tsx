import { Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { useLoadScript } from '@react-google-maps/api'
import { MAP_LIBRARIES, places, VISITS_LOCAL_STORAGE_KEY } from './constants'
import { CircleProvider } from './contexts/CircleProvider'
import { PlacesProvider } from './contexts/PlacesContext'
import { UserProvider } from './contexts/UserContext'
import { State as VisitsState, VisitsProvider } from './contexts/VisitsContext'
import FAB from './FAB'
import Map from './Map'
import PlacesAnalyticsModal from './PlacesAnalyticsModal'
import { PlacesAnalyticsModalProvider } from './PlacesAnalyticsModal/PlacesAnalyticsModalContext'
import PlacesFilterModal from './PlacesFilterModal'
import { PlacesFilterModalProvider } from './PlacesFilterModal/PlacesFilterModalContext'
import { JsonPlaceVisit } from './types'
import UserModal from './UserModal'
import VisitsDrawer from './VisitsDrawer'
import { VisitsDrawerProvider } from './VisitsDrawer/DrawerContext'

// Just some shennanigans needed for persisting and reloading visits
const parsedVisits = JSON.parse(
  localStorage.getItem(VISITS_LOCAL_STORAGE_KEY) ?? '{}',
) as Record<number, JsonPlaceVisit>
const initialVisitsState: VisitsState = Object.entries(parsedVisits).reduce(
  (acc, [k, v]) => {
    const visits = v.visits.map((d) => {
      return {
        ...d,
        date: new Date(d.date),
      }
    })

    return {
      ...acc,
      [k]: {
        ...v,
        visits,
      },
    }
  },
  {},
)

const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || 'someapikey',
    libraries: MAP_LIBRARIES,
  })

  if (!isLoaded) {
    return (
      <Flex
        h="100vh"
        w="100%"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
        color="gray.600"
      >
        <Heading>Just a moment</Heading>
        <Text>We are doing something amazing</Text>
        <Spinner
          thickness="0.5rem"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size="xl"
        />
      </Flex>
    )
  }

  return (
    <UserProvider>
      <PlacesProvider places={places}>
        <VisitsProvider initialState={initialVisitsState}>
          <VisitsDrawerProvider>
            <CircleProvider>
              <PlacesAnalyticsModalProvider>
                <PlacesFilterModalProvider>
                  <FAB />
                  <VisitsDrawer />
                  <PlacesFilterModal />
                  <PlacesAnalyticsModal />
                  <UserModal />
                  <Map />
                </PlacesFilterModalProvider>
              </PlacesAnalyticsModalProvider>
            </CircleProvider>
          </VisitsDrawerProvider>
        </VisitsProvider>
      </PlacesProvider>
    </UserProvider>
  )
}

export default App
