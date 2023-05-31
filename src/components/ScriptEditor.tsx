import React, { useState } from 'react'
import { Flex, Box, Text, Tag, Image } from '@chakra-ui/react'
import { BsPlayCircle } from 'react-icons/bs'
import { BiPencil } from 'react-icons/bi'
import { ScriptParagraphPopover } from './ScriptParagraphPopover'
import { BASE_GREY, BASE_DARK_GREY, ORANGE } from '@/constants'
import { Scene } from '../types'
import { getChatContent, getScenePrompt } from '../utils'

const SCENES = {
  scenes: [
    {
      location: 'Outdoor sports stadium',
      music: 'Upbeat and energetic',
      visuals:
        'Group of young athletes wearing fitness bands, engaging in various sports activities (running, cycling, playing soccer)',
      voiceover_tone: 'Energetic and enthusiastic',
      voiceover_text:
        'Are you ready to take your athletic performance to the next level?',
    },
    {
      location: 'Gymnasium',
      music: 'Motivational and inspiring',
      visuals:
        'Young athlete wearing a fitness band, focusing intensely during a workout session',
      voiceover_tone: 'Motivational',
      voiceover_text:
        'Introducing the ultimate fitness companion for young athletes: the revolutionary Fitness Band!',
    },
    {
      location: 'Outdoors, scenic view',
      music: 'Relaxing and soothing',
      visuals:
        'Young athlete wearing the fitness band, enjoying a moment of relaxation while overlooking a beautiful landscape',
      voiceover_tone: 'Calm and soothing',
      voiceover_text:
        'With the Fitness Band, you can push your limits during intense workouts and find your peace in moments of tranquility.',
    },
    {
      location: 'Urban setting, city park',
      music: 'Upbeat and empowering',
      visuals:
        'Young athlete wearing the fitness band, tracking their heart rate while running through the park',
      voiceover_tone: 'Empowering',
      voiceover_text:
        'Stay in the zone and maximize your training with real-time heart rate monitoring, step tracking, and advanced fitness analytics.',
    },
    {
      location: 'Indoor sports arena',
      music: 'Energetic and triumphant',
      visuals:
        'Young athlete wearing the fitness band, confidently competing in a sports event, cheered on by a supportive crowd',
      voiceover_tone: 'Triumphant and excited',
      voiceover_text:
        "With the Fitness Band, you'll be unstoppable! Achieve your goals, surpass your limits, and make every moment count.",
    },
    {
      location: 'Indoor sports arena',
      music: 'Energetic and triumphant',
      visuals:
        'Young athlete wearing the fitness band, confidently competing in a sports event, cheered on by a supportive crowd',
      voiceover_tone: 'Triumphant and excited',
      voiceover_text:
        "With the Fitness Band, you'll be unstoppable! Achieve your goals, surpass your limits, and make every moment count.",
    },
  ],
  closing_shot: {
    location: 'Product showcase',
    music: 'Upbeat and catchy',
    visuals:
      'Fitness band displayed alongside its key features, including heart rate monitoring, step tracking, and sleek design',
    voiceover_tone: 'Enthusiastic and persuasive',
    voiceover_text:
      'Get your Fitness Band today and unlock your athletic potential. Join the young athletes across Slovakia who are already revolutionizing their training routines!',
  },
  call_to_action: {
    on_screen_text: 'Get Your Fitness Band Today',
    website: 'www.fitnessband.com',
    voiceover_tone: 'Confident',
    voiceover_text:
      'Visit www.fitnessband.com now and start your journey to athletic greatness!',
  },
}

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
    onChangeScene(index, changedScene)
    setIsGenerating(false)
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
            onClick={() => setActiveSceneIndex(index)}
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
          <Image
            alt="sounds"
            mt="4"
            borderRadius={'xl'}
            backgroundColor={'#191C24'}
            borderColor={ORANGE}
            borderWidth={'2px'}
            src="https://i.pinimg.com/originals/e6/83/f2/e683f29e5eb2d87da457379948533a08.gif"
          />
        </Box>
      </Box>
    </Flex>
  )
}
