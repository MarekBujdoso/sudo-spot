import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { GRAY, LIGHT_GRAY, LIGHT_ORANGE, ORANGE } from '../constants'
import { FormValues } from '../types'
import { getChatContent, getScriptPrompt } from '../utils'

type Props = {
  onSubmitForm: (script: any) => void
  setIsGenerating: (state: boolean) => void
}

const schema = yup
  .object()
  .shape({
    product: yup.string().required(),
    style: yup.string().required(),
    targetGroup: yup.string().required(),
    features: yup
      .array()
      .of(yup.object().shape({ value: yup.string().required() })),
  })
  .required()

export const Form = ({ onSubmitForm, setIsGenerating }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) })
  const { fields, append, remove } = useFieldArray({
    name: 'features',
    control,
  })

  const onSubmit = async (data: FormValues) => {
    setIsGenerating(true)
    const prompt = getScriptPrompt(data)
    const script = await getChatContent(prompt)
    onSubmitForm(script)
    setIsGenerating(false)
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack py={12} maxW="xl" mx="auto" spacing={6}>
          <FormControl isRequired>
            <FormLabel>What product?</FormLabel>
            <Input
              isRequired
              placeholder="Product"
              {...register('product')}
              _focus={{ borderColor: ORANGE }}
            />
            <FormErrorMessage>{errors?.product?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>What style/mood?</FormLabel>
            <Input
              isRequired
              placeholder="Style/Mood"
              {...register('style')}
              _focus={{ borderColor: ORANGE }}
            />
            <FormErrorMessage>{errors?.style?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>What target group?</FormLabel>
            <Input
              isRequired
              placeholder="Target Group"
              {...register('targetGroup')}
              _focus={{ borderColor: ORANGE }}
            />
            <FormErrorMessage>{errors?.targetGroup?.message}</FormErrorMessage>
          </FormControl>
          {fields.length > 0 && (
            <FormControl>
              <FormLabel>Features</FormLabel>
              <VStack>
                {fields.map((field, index) => (
                  <HStack key={field.id} w="full">
                    <Input
                      {...register(`features.${index}.value`, {
                        required: true,
                      })}
                      _focus={{ borderColor: ORANGE }}
                    />
                    <IconButton
                      bgColor={GRAY}
                      _hover={{ bgColor: LIGHT_GRAY }}
                      onClick={() => {
                        remove(index)
                      }}
                      icon={<CloseIcon />}
                    >
                      Delete
                    </IconButton>
                  </HStack>
                ))}
              </VStack>
              <FormErrorMessage>{errors?.features?.message}</FormErrorMessage>
            </FormControl>
          )}
          <HStack w="100%" justifyContent="space-around">
            <Button
              bgColor={GRAY}
              _hover={{ bgColor: LIGHT_GRAY }}
              onClick={() => {
                append({ value: '' })
              }}
            >
              Add feature
            </Button>
            <Button
              bgColor={ORANGE}
              _hover={{ bgColor: LIGHT_ORANGE }}
              type="submit"
            >
              Submit
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  )
}
