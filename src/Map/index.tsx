import {
  DirectionsRenderer,
  DrawingManager,
  GoogleMap,
  InfoWindow,
  Marker,
} from '@react-google-maps/api'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CEBU_CITY, INIT_ZOOM_LEVEL, MAP_OPTIONS } from '../constants'
import { useCircle } from '../contexts/CircleProvider'
import { usePlaces } from '../contexts/PlacesContext'
import { useUser } from '../contexts/UserContext'
import DirectionsInfo from '../DirectionsInfo'
import PlacesVicinityInfo from '../PlacesVicinityInfo'
import { showErrorToast } from '../toast'
import { DirectionsResult, Map as MapType, Place } from '../types'
import {
  openVisitsDrawer,
  useVisitsDrawer,
} from '../VisitsDrawer/DrawerContext'

const Map = () => {
  const { places } = usePlaces()

  const {
    state: { user },
  } = useUser()
  const {
    state: { destination },
    dispatch,
  } = useVisitsDrawer()
  const onClickMaker = (place: Place) => {
    openVisitsDrawer(dispatch, place)
  }

  const [directions, setDirections] = useState<DirectionsResult>()
  useEffect(() => {
    const fetchDirections = () => {
      if (!user) return
      if (!destination) return

      const service = new google.maps.DirectionsService()
      service.route(
        {
          origin: user.home.position,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result)
            return
          }
          showErrorToast('Cannot fetch directions')
        },
      )
    }
    fetchDirections()
  }, [user, destination])
  const onDirectionsInfoClose = () => {
    setDirections(undefined)
  }

  const { circle, addCircle, clearCircle } = useCircle()
  const onPlacesVicinityInfoClose = () => {
    clearCircle()
  }

  const mapRef = useRef<MapType>()
  const onLoad = useCallback((map: MapType) => {
    mapRef.current = map
  }, [])

  return (
    <GoogleMap
      zoom={INIT_ZOOM_LEVEL}
      center={CEBU_CITY}
      mapContainerStyle={{ height: '100vh', width: '100%' }}
      options={MAP_OPTIONS}
      onLoad={onLoad}
    >
      <DrawingManager
        onCircleComplete={(circle) => addCircle(circle)}
        options={{
          circleOptions: {
            strokeOpacity: 0.5,
            strokeWeight: 2,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            zIndex: 3,
            fillOpacity: 0.05,
            strokeColor: '#00008B',
            fillColor: 'blue',
          },
          drawingControlOptions: {
            drawingModes: [google.maps.drawing.OverlayType.CIRCLE],
          },
        }}
      />
      {user && <Marker title="Home" position={user.home.position} />}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: '#1976D2',
              strokeWeight: 5,
            },
          }}
        />
      )}
      {user && directions && (
        <InfoWindow
          position={user.home.position}
          onCloseClick={onDirectionsInfoClose}
        >
          <DirectionsInfo directions={directions} />
        </InfoWindow>
      )}
      {circle && (
        <InfoWindow
          position={circle.getCenter() ?? CEBU_CITY}
          onCloseClick={onPlacesVicinityInfoClose}
        >
          <PlacesVicinityInfo circle={circle} places={places} />
        </InfoWindow>
      )}

      {places.map((place) => {
        return (
          <Marker
            key={place.id}
            position={place.position}
            title={place.name}
            onClick={() => onClickMaker(place)}
            icon={`${process.env.PUBLIC_URL}/images/icons/restaurant.png`}
          />
        )
      })}
    </GoogleMap>
  )
}

export default Map
