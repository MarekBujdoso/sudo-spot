import React from 'react'
import { Box, Spinner, Text, VStack } from '@chakra-ui/react'
import { BASE_DARK_GREY } from '../constants'

export const Loading = () => {
  return (
    <>
      <Box
        pos="absolute"
        width="100vw"
        height="100vh"
        justifyContent="center"
        zIndex={2000}
        bgColor={BASE_DARK_GREY}
        opacity={0.4}
      />
      <VStack
        pos="absolute"
        width="100vw"
        height="100vh"
        justifyContent="center"
        zIndex={2100}
      >
        <Spinner size="xl" />
        <Text>Generating...</Text>
      </VStack>
    </>
  )
}
