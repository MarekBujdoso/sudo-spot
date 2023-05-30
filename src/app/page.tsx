'use client'
import { Box } from '@chakra-ui/react'
import { Form } from '../components/Form'
import { ScriptEditor } from '@/components/ScriptEditor'
import { useState } from 'react'

export default function Home() {
  const [isEditor, setIsEditor] = useState(false)
  return (
    <Box>
      {isEditor ? (
        <ScriptEditor onGoBack={() => setIsEditor(false)} />
      ) : (
        <Form onSubmitForm={() => setIsEditor(true)} />
      )}
    </Box>
  )
}
