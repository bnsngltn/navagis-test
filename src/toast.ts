import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react'

export const showToast = (toastOpts: UseToastOptions) => {
  const { toast } = createStandaloneToast()

  const opts: UseToastOptions = {
    title: 'Notify',
    status: 'info',
    duration: 5000,
    isClosable: true,
    ...toastOpts,
  }

  toast(opts)
}

export const showSuccessToast = (title: string) => {
  showToast({
    title,
    status: 'success',
  })
}

export const showErrorToast = (title: string) => {
  showToast({
    title,
    status: 'error',
  })
}

export const showInfoToast = (title: string) => {
  showToast({
    title,
    status: 'info',
  })
}
