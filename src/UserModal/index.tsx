import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'
import Autocomplete, { AutocompleteItem } from '../Autocomplete'
import { MIN_USERNAME_LENGTH } from '../constants'
import { signIn, useUser } from '../contexts/UserContext'
import { LatLngLiteral } from '../types'

const UserModal = () => {
  const {
    state: { user },
    dispatch,
  } = useUser()

  // Do not allow the modal to be closed unless user sign's in
  const onClose = () => {}

  // !!!!!!!!!!!
  // USERNAME
  // !!!!!!!!!!!
  const isOpen = user === null
  const [username, setUsername] = useState('')
  const isInvalidUsername = username.length < MIN_USERNAME_LENGTH

  // !!!!!!!!!!!
  // HOME
  // !!!!!!!!!!!
  const [home, setHome] = useState<LatLngLiteral | null>(null)

  const {
    ready,
    value: input,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete()
  const items: AutocompleteItem<string>[] = useMemo(() => {
    if (status !== 'OK') return []

    return data.map((d) => {
      return {
        label: d.description,
        value: d.description,
      }
    })
  }, [status, data])
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }
  const onChange = async (newItem: AutocompleteItem<string>) => {
    setValue(newItem.label, false)
    clearSuggestions()

    const results = await getGeocode({ address: newItem.value })
    const { lat, lng } = getLatLng(results[0])
    setHome({ lat, lng })
  }

  const isInvalidHome = home === null

  // Do not let the user submit if there are errors
  const isError = isInvalidUsername || isInvalidHome

  const onSignIn = (e: FormEvent<HTMLFormElement>) => {
    if (home === null) return
    e.preventDefault()

    signIn(dispatch, username, input, home)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>

        <form onSubmit={(e) => onSignIn(e)}>
          <ModalBody>
            <FormControl isRequired isInvalid={isInvalidUsername}>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              {!isError ? (
                <FormHelperText>Just use any username you like</FormHelperText>
              ) : (
                <FormErrorMessage>
                  Must be at least {`${MIN_USERNAME_LENGTH}`} characters long
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={isInvalidHome} mt="1rem">
              <FormLabel>Home</FormLabel>
              <Autocomplete
                items={items}
                inputValue={input}
                onInputChange={onInputChange}
                disabled={!ready}
                onChange={onChange}
              />
              <FormHelperText>Where do you live?</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" type="submit" isDisabled={isError}>
              Sign In
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default UserModal
