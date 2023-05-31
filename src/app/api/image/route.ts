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
    const response = await openai.createImage({
      prompt: data.prompt,
      n: 1,
      size: '512x512',
    })

    return NextResponse.json(response.data.data[0].url)
  } catch (e) {
    console.error(e)
  }
}
