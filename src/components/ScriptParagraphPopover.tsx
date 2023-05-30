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

export const ScriptParagraphPopover = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const ref = useRef(null)

  useOutsideClick({
    ref: ref,
    handler: onClose,
  })
  const onSelectOption = () => {
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
            onClick={onSelectOption}
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
            onClick={onSelectOption}
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
            onClick={onSelectOption}
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
            onClick={onSelectOption}
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
