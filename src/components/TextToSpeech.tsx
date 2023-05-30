import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface TextToSpeechProps {
  text: string;
  voiceName?: string;
  speedRate?: number;
}

const TextToSpeech = ({ text, voiceName = "Samantha", speedRate = 1 }: TextToSpeechProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice>();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
useEffect(() => {
    const synth = window.speechSynthesis;
    // Timeout is needed to load voices, otherwise it will be empty array.
      setTimeout(() => {
        setVoices(synth.getVoices());
      }, 100);
  }, []);
  
  
  useEffect(() => {
    const synth = window.speechSynthesis;
    console.log(synth)
    const voice = voices.find(({name}) => name === voiceName);
    console.log(voice)
    setSelectedVoice(voice || voices[108]);
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.voice = selectedVoice || null;
    u.rate = speedRate;

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [voices, speedRate, text, voiceName, selectedVoice]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    if (utterance) {
      synth.speak(utterance);
    }

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <>
      <Button onClick={handlePlay}>{isPaused ? "Resume" : "Play"}</Button>
      <Button onClick={handlePause}>Pause</Button>
      <Button onClick={handleStop}>Stop</Button>
    </>
  );
  
}

export default TextToSpeech;
