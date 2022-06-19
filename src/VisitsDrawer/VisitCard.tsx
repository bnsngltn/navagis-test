import {
  Avatar,
  Divider,
  Flex,
  FlexProps,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import { Place, Visit } from '../types'

interface Props extends FlexProps {
  place: Place
  visit: Visit
}
const VisitCard: FunctionComponent<Props> = ({ place, visit, ...rest }) => {
  return (
    <Flex
      direction="column"
      fontSize="sm"
      p="1rem"
      borderRadius="md"
      pointer="cursor"
      gap="0.25rem"
      boxShadow="0 1px 2px 0 rgba(0,0,0,0.2)"
      _hover={{
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
      }}
      {...rest}
    >
      <Flex alignItems="center" gap="0.5rem">
        <Avatar name={visit.user.username} cursor="pointer" />
        <Text color="gray.700" fontWeight="semibold" cursor="pointer">
          {visit.user.username}
        </Text>
      </Flex>
      <Flex justifyContent="flex-end">
        <Text color="gray.600" fontWeight="normal" cursor="pointer">
          {visit.user.home.name}
        </Text>
      </Flex>
      <Divider my="0.25rem" />
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="gray.700" cursor="pointer">
          Visited on {visit.date.toLocaleDateString()}
        </Text>
        <Spacer />
        <Icon
          as={MdThumbUp}
          mr="1rem"
          color={visit.isThumbsUp ? 'blue.500' : 'gray.400'}
        />
        <Icon
          as={MdThumbDown}
          color={!visit.isThumbsUp ? 'red.400' : 'gray.400'}
        />
      </Flex>
    </Flex>
  )
}

export default VisitCard
