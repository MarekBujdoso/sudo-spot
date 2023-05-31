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
      prompt: 'snoop dog eating cheese',
      n: 1,
      size: '1024x1024',
    })

    return NextResponse.json(response.data[0].url)
  } catch (e) {
    console.error(e)
  }
}
