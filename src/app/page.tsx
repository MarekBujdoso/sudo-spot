'use client'
import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react'
import { Form } from '../components/Form'
import { ScriptEditor } from '../components/ScriptEditor'
import React, { useState } from 'react'
import { BASE_DARK_GREY, BASE_GREY } from '../constants'
import { IoIosArrowBack } from 'react-icons/io'
import { Loading } from '../components/Loading'
import { Scene } from '@/types'

export default function Home() {
  const [isEditor, setIsEditor] = useState(false)
  const [script, setScript] = useState<{ scenes: Scene[] }>({ scenes: [] })
  const [isGenerating, setIsGenerating] = useState(false)
  return (
    <Box backgroundColor={BASE_GREY} width={'100%'} minH="100vh">
      {isGenerating && <Loading />}
      <Flex
        alignItems={'center'}
        height="80px"
        px="6"
        backgroundColor={BASE_DARK_GREY}
        onClick={() => (isEditor ? setIsEditor(false) : {})}
      >
        {isEditor && <IoIosArrowBack cursor={'pointer'} />}
        <Text ml="2" fontSize={'xl'} fontWeight={800}>
          {isEditor ? 'Scene Editor' : 'Script Form'}
        </Text>
      </Flex>
      {isEditor ? (
        <ScriptEditor
          script={script}
          setIsGenerating={setIsGenerating}
          onChangeScene={(index, scene) =>
            setScript((prevState) => ({
              scenes: prevState.scenes.toSpliced(index, 1, scene),
            }))
          }
        />
      ) : (
        <Form
          onSubmitForm={(result: any) => {
            setScript(result)
            setIsEditor(true)
          }}
          setIsGenerating={setIsGenerating}
        />
      )}
    </Box>
  )
}
