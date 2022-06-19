import {
  Flex,
  Input,
  InputProps,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export interface AutocompleteItem<T> {
  value: T
  label: string
}

interface AutocompleteProps<T> extends Omit<InputProps, 'onChange'> {
  items: AutocompleteItem<T>[]
  onChange: (newItem: AutocompleteItem<T>) => Promise<void>
  inputValue: string
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

const Autocomplete = <T,>({
  items = [],
  inputValue,
  onInputChange,
  onChange,
  disabled = false,
  ...rest
}: AutocompleteProps<T>) => {
  const anchorRef = useRef<HTMLInputElement>(null)
  const { isOpen, onClose, onOpen } = useDisclosure()
  // arbitrary initial value
  const [width, setWidth] = useState(100)

  useOutsideClick({
    ref: anchorRef,
    handler: onClose,
  })

  const onItemClick = (newItem: AutocompleteItem<T>) => {
    onClose()
    onChange(newItem)
  }

  useEffect(() => {
    if (anchorRef && anchorRef.current) {
      const w = anchorRef.current.getBoundingClientRect().width

      if (w) {
        setWidth(w)
      }
    }
  }, [anchorRef])

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={anchorRef}
      returnFocusOnClose={false}
      closeOnBlur
    >
      <PopoverTrigger>
        <Input
          ref={anchorRef}
          value={inputValue}
          onClick={onOpen}
          onChange={onInputChange}
          autoComplete="off"
          disabled={disabled}
          {...rest}
        />
      </PopoverTrigger>
      <PopoverContent w={width}>
        <PopoverBody p={0}>
          <Flex direction="column" gap="0.5rem">
            {items.length > 0 ? (
              items.map((i, index) => {
                return (
                  <Text
                    px="0.75rem"
                    py="0.75rem"
                    key={index}
                    cursor="pointer"
                    w="100%"
                    onClick={() => onItemClick(i)}
                    _hover={{ bgColor: 'gray.200' }}
                  >
                    {i.label}
                  </Text>
                )
              })
            ) : (
              <Text
                px="0.75rem"
                py="0.75rem"
                color="gray.500"
                onClick={onClose}
                w="500px"
              >
                No items
              </Text>
            )}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default Autocomplete
