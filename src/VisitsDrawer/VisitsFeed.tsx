import { Flex } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { Place, Visit } from '../types'
import VisitCard from './VisitCard'

interface Props {
  place: Place
  visits: Visit[]
}
const VisitsFeed: FunctionComponent<Props> = ({ place, visits }) => {
  return (
    <Flex direction="column" gap="0.75rem">
      {visits.map((visit, i) => {
        return <VisitCard key={i} place={place} visit={visit} />
      })}
    </Flex>
  )
}

export default VisitsFeed
