import { Flex, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { DirectionsResult } from '../types'

interface Props {
  directions: DirectionsResult
}
const DirectionsInfo: FunctionComponent<Props> = ({ directions }) => {
  const legDistance = directions.routes[0].legs[0].distance
  return (
    <Flex direction="column" gap="0.25rem">
      {legDistance ? (
        <Text>{`Distance on foot: ${legDistance.text}`}</Text>
      ) : (
        <Text>No information available</Text>
      )}
    </Flex>
  )
}

export default DirectionsInfo
