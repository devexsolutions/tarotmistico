export function getSpanishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined') return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(v => v.lang.startsWith('es') && /(female|woman|mujer)/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith('es')) ||
    null
  );
}

export function speak(text: string): SpeechSynthesisUtterance | undefined {
  if (typeof window === 'undefined') return;
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getSpanishVoice();
  const speakUtterance = () => {
    const v = voice || getSpanishVoice();
    if (v) utterance.voice = v;
    utterance.rate = 0.9;
    synth.cancel();
    synth.speak(utterance);
  };
  if (!voice && synth.getVoices().length === 0) {
    synth.onvoiceschanged = () => speakUtterance();
  } else {
    speakUtterance();
  }
  return utterance;
}

export function stop(): void {
  if (typeof window !== 'undefined') {
    window.speechSynthesis.cancel();
  }
}
