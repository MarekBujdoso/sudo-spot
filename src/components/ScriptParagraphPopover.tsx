import { BASE_GREY, ORANGE } from '@/constants'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  Box,
  VStack,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'

type Props = {
  onSceneChange: (changeType: string) => void
}

export const ScriptParagraphPopover = ({ onSceneChange }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const ref = useRef(null)

  useOutsideClick({
    ref: ref,
    handler: onClose,
  })
  const onSelectOption = (changeType: string) => {
    onSceneChange(changeType)
    onClose()
  }
  return (
    <Popover isOpen={isOpen} placement="start-end">
      <PopoverTrigger>
        <Box onClick={onToggle}>
          <BiDotsVerticalRounded />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        ref={ref}
        py="2"
        backgroundColor={BASE_GREY}
        width="200px"
      >
        <VStack color="white">
          <Text
            textAlign={'center'}
            width={'100%'}
            onClick={() => onSelectOption('descriptive')}
            mx={0}
            _hover={{
              color: ORANGE,
            }}
          >
            Make descriptive
          </Text>
          <Text
            textAlign={'center'}
            width={'100%'}
            onClick={() => onSelectOption('superlative')}
            mx={0}
            _hover={{
              color: ORANGE,
            }}
          >
            Make superlative
          </Text>
          <Text
            textAlign={'center'}
            width={'100%'}
            onClick={() => onSelectOption('provocative')}
            mx={0}
            _hover={{
              color: ORANGE,
            }}
          >
            Make provocative
          </Text>
          <Text
            textAlign={'center'}
            width={'100%'}
            onClick={() => onSelectOption('take-action')}
            mx={0}
            _hover={{
              color: ORANGE,
            }}
          >
            Make take-action
          </Text>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}
