import React, { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import { useChatCompletion } from 'react-openai-streaming-hooks'
import { CloseIcon } from '@chakra-ui/icons'

type FormValues = {
  product: string
  features: Array<string>
}

type Props = {
  onSubmitForm: () => void
}

export const Form = ({ onSubmitForm }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ defaultValues: { product: '', features: [''] } })
  const { fields, append, remove } = useFieldArray({
    name: 'features',
    control,
  })
  const [value, setValue] = useState('')
  const { messages, submitPrompt } = useChatCompletion({
    model: 'gpt-3.5-turbo', // Required
    apiKey: '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', // Required
    temperature: 0.9,
  })
  console.log(fields, watch('features'))

  const onSubmit = (data: { product: string }) => {
    onSubmitForm()
    void submitPrompt([
      {
        role: 'user',
        content: `write marketing spot script for ${data.product}`,
      },
    ])
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>What product?</FormLabel>
          <Input
            placeholder="Product"
            {...register('product', { required: true })}
          />
          <FormErrorMessage>{errors?.product?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Features</FormLabel>
          {fields.map((field, index) => (
            <HStack key={field.id}>
              <Input
                {...register(`features.${index}.value` as const, {
                  required: true,
                })}
              />
              <IconButton
                onClick={() => {
                  remove(index)
                }}
                icon={<CloseIcon />}
              >
                Delete
              </IconButton>
            </HStack>
          ))}
          <FormErrorMessage>{errors?.features?.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
      {messages
        .filter((message) => message.role === 'assistant')
        .map((message) => (
          <Text key={message.timestamp}>{message.content}</Text>
        ))}
      <Button
        onClick={() => {
          append({ value: '' })
        }}
      >
        Add feature
      </Button>
    </>
  )
}
