import React, { useState } from 'react'
import { Flex, Box, Text, Tag, Image } from '@chakra-ui/react'
import { BsPlayCircle } from 'react-icons/bs'
import { BiPencil } from 'react-icons/bi'
import { ScriptParagraphPopover } from './ScriptParagraphPopover'
import { BASE_GREY, BASE_DARK_GREY, ORANGE } from '@/constants'
import { Scene } from '../types'
import {
  getDalleScenePrompt,
  getChatContent,
  getDalleImage,
  getScenePrompt,
} from '../utils'

type Props = {
  script: { scenes: Array<Scene> }
  onChangeScene: (index: number, scene: Scene) => void
  setIsGenerating: (state: boolean) => void
}

export const ScriptEditor = ({
  script,
  onChangeScene,
  setIsGenerating,
}: Props) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState<number | undefined>()

  const onSceneChange = async (index: number, changeType: string) => {
    setIsGenerating(true)
    const prompt = getScenePrompt({ changeType, scene: script.scenes[index] })
    const changedScene = await getChatContent(prompt)
    const dallePrompt = getDalleScenePrompt(changedScene)
    const sceneImageUrl = await getDalleImage(dallePrompt)
    onChangeScene(index, { ...changedScene, image: sceneImageUrl })
    setIsGenerating(false)
    onSetActive(index)
  }

  const onSetActive = async (index: number) => {
    if (index === activeSceneIndex && script.scenes[index].image) {
      return
    }

    if (script.scenes[index].image) {
      setActiveSceneIndex(index)
      return
    }
    setIsGenerating(true)
    const prompt = getDalleScenePrompt(script.scenes[index])
    const sceneImageUrl = await getDalleImage(prompt)
    onChangeScene(index, { ...script.scenes[index], image: sceneImageUrl })
    setIsGenerating(false)
    setActiveSceneIndex(index)
  }

  return (
    <Flex>
      <Box
        __css={{
          direction: 'rtl', // scrollbar in the left
        }}
        height="calc(100vh - 80px)"
        overflow="scroll"
        py="8"
        pr="12"
        width="70%"
      >
        {script.scenes.map((item, index) => (
          <Box
            __css={{
              direction: 'ltr',
            }}
            cursor="pointer"
            borderWidth="2px"
            borderColor={index === activeSceneIndex ? ORANGE : 'transparent'}
            backgroundColor={
              index === activeSceneIndex ? BASE_DARK_GREY : 'transparent'
            }
            borderRadius={'md'}
            _hover={{ borderColor: ORANGE }}
            pt="3"
            pb="3"
            pl="4"
            key={item.location}
            onClick={() => onSetActive(index)}
            position={'relative'}
          >
            <Flex>
              <Box>
                <Tag
                  ml="1"
                  mt="2"
                  height="30px"
                  width="80px"
                  mr="8"
                  size={'md'}
                  variant="solid"
                  colorScheme="cyan"
                >
                  <Text textAlign={'center'}>Scene {index + 1}</Text>
                </Tag>
              </Box>

              {index === activeSceneIndex && (
                <Flex position={'absolute'} right="10px">
                  <BiPencil />
                  <ScriptParagraphPopover
                    onSceneChange={(changeType) =>
                      onSceneChange(index, changeType)
                    }
                  />
                </Flex>
              )}

              <Box>
                <Flex alignItems={'center'}>
                  <Box cursor={'pointer'} mr="3">
                    <BsPlayCircle color={ORANGE} />
                  </Box>
                  <Text fontSize={'xl'} as="span">
                    {item.location}
                  </Text>
                </Flex>

                <Box mt="2">
                  <Text as={'i'}>{item.music} music</Text>
                </Box>
                <Box mt="4">
                  <Text as="span" mr="2" fontWeight={800}>
                    Visuals:
                  </Text>
                  {item.visuals}
                </Box>
                <Box mt="4">
                  <Text as="span" mr="2" fontWeight={800}>
                    Voice:
                  </Text>
                  <Text as={'i'} mr="2">
                    ({item.voiceover_tone})
                  </Text>
                  &quot;{item.voiceover_text}&quot;
                </Box>
              </Box>
            </Flex>
          </Box>
        ))}
      </Box>
      <Box py="8" px="12" width="30%">
        <Text fontSize={'md'} fontWeight={800}>
          Preview
        </Text>
        <Box>
          {activeSceneIndex !== undefined &&
          script.scenes[activeSceneIndex].image ? (
            <Image
              alt="sounds"
              mt="4"
              borderRadius={'xl'}
              src={script.scenes[activeSceneIndex].image}
            />
          ) : (
            <Image
              alt="sounds"
              mt="4"
              borderRadius={'xl'}
              src="https://i.pinimg.com/originals/e6/83/f2/e683f29e5eb2d87da457379948533a08.gif"
            />
          )}
        </Box>
      </Box>
    </Flex>
  )
}
