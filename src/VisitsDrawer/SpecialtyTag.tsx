import { forwardRef } from 'react'
import { Text } from '@chakra-ui/react'

interface Props {
  value: string
}
const SpecialtyTag = forwardRef<HTMLParagraphElement, Props>(
  ({ value, ...rest }, ref) => {
    return (
      <Text
        bgColor="gray.500"
        color="white"
        py="0.25rem"
        px="0.5rem"
        borderRadius="xl"
        cursor="pointer"
        ref={ref}
        _hover={{ bgColor: 'gray.600' }}
        {...rest}
      >
        {value}
      </Text>
    )
  },
)
SpecialtyTag.displayName = 'SpecialtyTag'

export default SpecialtyTag
