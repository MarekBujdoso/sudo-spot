export type FormValues = {
  product: string
  style: string
  targetGroup: string
  features?: Array<{ value: string }>
}

export type Scene = {
  location: string
  music: string
  visuals: string
  voiceover_tone: string
  voiceover_text: string
}
