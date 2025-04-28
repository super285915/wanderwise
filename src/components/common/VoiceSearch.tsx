import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

interface VoiceSearchProps {
  onResult: (text: string) => void;
  className?: string;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResult, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      onResult(transcript);
      resetTranscript();
    }
  }, [transcript, listening, onResult, resetTranscript]);

  const toggleListening = () => {
    if (!isListening) {
      SpeechRecognition.startListening();
      setIsListening(true);
    } else {
      SpeechRecognition.stopListening();
      setIsListening(false);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full transition-colors ${
        isListening 
          ? 'bg-primary-100 text-primary-600' 
          : 'hover:bg-gray-100 text-gray-500'
      } ${className}`}
      title={isListening ? 'Stop voice search' : 'Start voice search'}
    >
      {listening ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : isListening ? (
        <Mic className="w-5 h-5" />
      ) : (
        <MicOff className="w-5 h-5" />
      )}
    </button>
  );
};

export default VoiceSearch;