import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function GET() {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Correct this to standard English:\n\nShe no went to the market.',
    temperature: 0,
    max_tokens: 60,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  })

  return NextResponse.json({ response })
}
