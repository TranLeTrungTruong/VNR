import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX } from 'lucide-react';
import { markdownToPlainText } from '../utils/markdownToText';

interface TextToSpeechProps {
  text: string;
  className?: string;
}

export default function TextToSpeech({ text, className = '' }: TextToSpeechProps) {
  const [isReading, setIsReading] = useState(false);
  const { t, i18n } = useTranslation();
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startReading = () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();

        const plainText = markdownToPlainText(text);
        const utterance = new SpeechSynthesisUtterance(plainText);

        // Lấy danh sách voice có sẵn
        const voices = window.speechSynthesis.getVoices();
        console.log(voices); // log ra để xem trình duyệt hỗ trợ gì

        // Chọn voice theo ngôn ngữ
        const selectedVoice = voices.find(v => v.lang === (i18n.language === 'vi' ? 'vi-VN' : 'en-US'));

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        } else {
            utterance.lang = i18n.language === 'vi' ? 'vi-VN' : 'en-US';
        }

        utterance.rate = 0.8;
        utterance.pitch = 1;

        utterance.onstart = () => setIsReading(true);
        utterance.onend = () => setIsReading(false);
        utterance.onerror = () => setIsReading(false);

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
        }
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
  };

  const toggleReading = () => {
    if (isReading) {
      stopReading();
    } else {
      startReading();
    }
  };

  if (!('speechSynthesis' in window)) {
    return null; // Speech synthesis not supported
  }

  return (
    <button
      onClick={toggleReading}
      className={`flex items-center space-x-2 px-4 py-2 bg-revolutionary-600 hover:bg-revolutionary-700 text-white rounded-lg transition-colors ${className}`}
      title={isReading ? t('article.stopReading') : t('article.readAloud')}
    >
      {isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      <span className="text-sm">
        {isReading ? t('article.stopReading') : t('article.readAloud')}
      </span>
    </button>
  );
}