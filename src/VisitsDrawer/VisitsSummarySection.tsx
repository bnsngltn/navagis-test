import { Flex, Icon, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { VisitsSummary } from '../types'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'

interface Props {
  visitsSummary: VisitsSummary
}
const VisitsSummarySection: FunctionComponent<Props> = ({ visitsSummary }) => {
  const approvalRatePercentage = (
    visitsSummary.approvalRate * 100
  ).toLocaleString(undefined, { maximumFractionDigits: 2 })
  const dissaprovalRatePercentage = (
    visitsSummary.numberOfVisits > 0
      ? 100 - visitsSummary.approvalRate * 100
      : 0
  ).toLocaleString(undefined, { maximumFractionDigits: 2 })

  return (
    <Flex alignItems="center">
      <Flex
        alignItems="center"
        gap="0.25rem"
        fontWeight="semibold"
        color="gray.600"
        p="0.25rem"
        borderRadius="xs"
        _hover={{
          bgColor: 'gray.100',
        }}
      >
        <Text cursor="pointer">{`${approvalRatePercentage}%`}</Text>
        <Icon as={MdThumbUp} />
      </Flex>
      <Text fontWeight="semibold" color="gray.400">
        |
      </Text>
      <Flex
        alignItems="center"
        gap="0.25rem"
        fontWeight="semibold"
        color="gray.600"
        p="0.25rem"
        borderRadius="xs"
        _hover={{
          bgColor: 'gray.100',
        }}
      >
        <Text cursor="pointer">{`${dissaprovalRatePercentage}%`}</Text>
        <Icon as={MdThumbDown} />
      </Flex>
      <Text color="gray.600" ml="0.5rem">{`(${visitsSummary.numberOfVisits} ${
        visitsSummary.numberOfVisits === 1 ? 'visit' : 'visits'
      })`}</Text>
    </Flex>
  )
}

export default VisitsSummarySection
