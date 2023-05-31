import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(request: Request) {
  const data = await request.json()
  console.log({ data })
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: data.prompt }],
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    console.log({ response: response.data.choices[0].message })

    return NextResponse.json(
      JSON.parse(response.data.choices[0].message.content || '{}')
    )
  } catch (e) {
    console.error(e)
  }
}
