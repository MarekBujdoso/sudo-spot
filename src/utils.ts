import { FormValues, Scene } from './types'
import axios from 'axios'
import {
  DRAMATIC_SYNONYMS,
  EPIC_SYNONYMS,
  HAPPY_SYNONYMS,
  RELAX_SYNONYMS,
  SAD_SYNONYMS,
} from './constants'

export const getScriptPrompt = (data: FormValues) =>
  `create a script for a marketing spot with these data: product: ${
    data.product
  };${
    data.features?.length > 0 ? `features: ${data.features?.join(', ')};` : ''
  } audience: ${data.targetGroup}; style: ${
    data.style
  }. It should contain at least 5 scenes, please add data of each scene: location, visuals, music, music type, voiceover text, and voiceover tone. Process result in JSON shape like this example: { "scenes": [ { "location": "A childs bedroom", "visuals": "A young boy wakes up and looks around his room, which is filled with stuffed animals and other toys", "music": "Soft, playful music", "music_type": "happy", "voiceover_text": "Every child deserves to wake up to a world of wonder and imagination.", "voiceover_tone": "Warm, inviting" } ] } and for "music_type" use one of following adjectives (happy, sad, relaxed, hopeful, dramatic, epic)`

export const getScenePrompt = (data: { changeType: string; scene: Scene }) =>
  `take this JSON object and make all values more ${
    data.changeType
  } but for "music_type" use one of following adjectives (happy, sad, relaxed, hopeful, dramatic, epic): ${JSON.stringify(
    data.scene
  )}`

export const getDalleScenePrompt = (scene: Scene) =>
  `${scene.visuals} in location:${scene.location}. Make it in sketch style and draw all person from the back to not show the face.`

export const getChatContent = async (prompt: string) => {
  try {
    const response = await axios.post('/api/chat', { prompt })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getDalleImage = async (prompt: string) => {
  try {
    const response = await axios.post('/api/image', { prompt })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getMusicFileName = (type: string) => {
  if (type === 'happy') {
    return 'happy1.mp3'
  }
  if (type === 'sad') {
    return 'sad1.mp3'
  }
  if (type === 'epic') {
    return 'epic1.mp3'
  }
  if (type === 'dramatic') {
    return 'dramatic1.mp3'
  }
  if (type === 'relaxed') {
    return 'relax1.mp3'
  }
  return 'hopeful1.mp3'
}
