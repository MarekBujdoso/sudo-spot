'use client'

import TextToSpeech from '@/components/TextToSpeech'

export default function Page() {
  const text = `Whether you're traveling to the islands or the mountains of Thailand,
  you're likely to spend at least one night in its capital city on the
  way. Bangkok might be noisy and polluted but it's also an exciting city
  with plenty of things to see and do. Why not make it a longer stay?`
  return (
    <div>
      <h1>Text to Speech</h1>
      <span>
        {text}
      </span>
      <TextToSpeech
        text={text}
        speedRate={0.9}
      />
    </div>
  )
}
