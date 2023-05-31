import React, { useEffect, useState } from 'react'
import { BsPlayCircle, BsSlashCircle, BsStopCircle } from 'react-icons/bs'
import { ORANGE } from '../constants'

export const TextToSpeech = ({
  text,
  isImageReady,
  musicFileName,
}: {
  text: string
  isImageReady: boolean
  musicFileName: string
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSet, setIsSet] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>(null)
  const [audio, setAudio] = useState<HTMLAudioElement>(null)
  console.log(musicFileName)

  useEffect(() => {
    setIsSet(false)
    const synth = window.speechSynthesis

    const u = new SpeechSynthesisUtterance(text)
    setUtterance(u)
    setTimeout(() => {
      const voices = synth.getVoices()
      const voice = voices.find(({ name }) => name === 'Samantha')
      u.voice = voice || null
      u.lang = 'en-US'
      u.rate = 0.8
      setIsSet(true)
    }, 100)

    u.onend = () => {
      setTimeout(() => {
        setIsPlaying(false)
      }, 800)
    }

    return () => {
      synth.cancel()
    }
  }, [text])

  useEffect(() => {
    if (musicFileName) {
      const newAudio = new Audio(`music/${musicFileName}`)
      newAudio.volume = 0.5
      setAudio(newAudio)
    }
  }, [musicFileName])

  useEffect(() => {
    if (!isPlaying && audio?.played) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isImageReady && isPlaying) {
      audio.pause()
      audio.currentTime = 0
      const synth = window.speechSynthesis
      synth.cancel()
      setIsPlaying(false)
    }
  }, [isImageReady])

  const handlePlay = () => {
    const synth = window.speechSynthesis
    console.log('jou')
    void audio.play()

    synth.speak(utterance)
    synth.pause()
    setTimeout(() => {
      synth.resume()
    }, 800)
    setIsPlaying(true)
  }

  const handleStop = () => {
    const synth = window.speechSynthesis
    console.log('hej')
    audio.pause()
    audio.currentTime = 0

    synth.cancel()
    setIsPlaying(false)
  }

  if (!isSet || !isImageReady) {
    return <BsSlashCircle color={ORANGE} cursor="default" />
  }

  return isPlaying ? (
    <BsStopCircle color={ORANGE} onClick={handleStop} />
  ) : (
    <BsPlayCircle color={ORANGE} onClick={handlePlay} />
  )
}
