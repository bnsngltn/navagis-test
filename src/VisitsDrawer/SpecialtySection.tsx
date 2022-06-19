import { Flex, Tooltip } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import SpecialtyTag from './SpecialtyTag'

interface Props {
  data: string[]
}
const SpecialtySection: FunctionComponent<Props> = ({ data }) => {
  const firstThree = data.slice(0, 3)
  const remaining = data.slice(3)
  return (
    <Flex gap="0.25rem">
      {firstThree.map((d, i) => {
        return <SpecialtyTag key={i} value={d} />
      })}
      {remaining.length > 0 && (
        <Tooltip label={remaining.join(', ')} hasArrow>
          <SpecialtyTag value={`+${remaining.length} more`} />
        </Tooltip>
      )}
    </Flex>
  )
}

export default SpecialtySection
