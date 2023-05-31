import { FormValues, Scene } from './types'
import axios from 'axios'

export const getScriptPrompt = (data: FormValues) =>
  `create a script for a marketing spot with these data: product: ${
    data.product
  };${
    data.features?.length > 0 ? `features: ${data.features?.join(', ')};` : ''
  } audience: ${data.targetGroup}; style: ${
    data.style
  }. It should contain at least 5 scenes, please add data of each scene: location, visuals, music, voiceover text, and voiceover tone. Process result in JSON shape where you return an object with key "scenes" which will contain an array of scene objects.`

export const getScenePrompt = (data: { changeType: string; scene: Scene }) =>
  `take this JSON object and make all values more ${
    data.changeType
  }: ${JSON.stringify(data.scene)}`

export const getChatContent = async (prompt: string) => {
  try {
    const response = await axios.post('/api/chat', { prompt })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
