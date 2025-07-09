import React from 'react';
import { Star, Download, Share2, RotateCcw } from 'lucide-react';
import TarotCard from './TarotCard';
import { Reading } from '../App';

interface ReadingResultsProps {
  reading: Reading;
  onStartOver: () => void;
}

const ReadingResults: React.FC<ReadingResultsProps> = ({ reading, onStartOver }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Tarot Reading',
          text: `I just got an amazing tarot reading from Mystic Tarot! The insights were incredibly helpful.`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Star className="text-amber-400 mr-2 animate-pulse" size={32} />
            <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold">
              Tu Lectura
            </h1>
            <Star className="text-amber-400 ml-2 animate-pulse" size={32} />
          </div>
          <p className="text-lg text-purple-200 mb-4">
            Lectura completada el {formatDate(reading.timestamp)}
          </p>
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-purple-400/20 max-w-2xl mx-auto">
            <p className="text-purple-300/80 italic">"{reading.question}"</p>
          </div>
        </div>

        {/* Cards Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-serif text-purple-200 mb-6 text-center">Tus Cartas</h2>
          <div className={`grid gap-6 ${
            reading.cards.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : reading.cards.length === 3 
              ? 'grid-cols-1 md:grid-cols-3' 
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
          }`}>
            {reading.cards.map((card, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="mb-4">
                    <TarotCard 
                      name={card.name}
                      reversed={card.reversed}
                      size={reading.cards.length === 10 ? 'small' : reading.cards.length === 3 ? 'medium' : 'large'}
                      showName={false}
                    />
                  </div>
                  <h3 className="font-serif text-purple-200 mb-1 text-sm">
                    {card.name}
                  </h3>
                  <p className="text-amber-400 font-medium text-xs mb-3">
                    {card.position}
                  </p>
                </div>
                <p className="text-purple-300/80 leading-relaxed text-xs">
                  {card.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interpretation Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 mb-8">
          <h2 className="text-2xl font-serif text-purple-200 mb-6 text-center">Tu Interpretación</h2>
          <div className="prose prose-purple prose-lg max-w-none">
            {reading.interpretation.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-purple-200 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleShare}
            className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-purple-200 font-serif py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
          >
            <Share2 className="mr-2" size={18} />
            Compartir Lectura
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-purple-200 font-serif py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
          >
            <Download className="mr-2" size={18} />
            Guardar como PDF
          </button>
          
          <button
            onClick={onStartOver}
            className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-serif py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
          >
            <RotateCcw className="mr-2" size={18} />
            Nueva Lectura
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-purple-400/20">
            <p className="text-purple-300/80 mb-4">
              Gracias por elegir Tarot Místico. Recuerda que las lecturas de tarot son para entretenimiento 
              y propósitos de autorreflexión. Confía en tu intuición y usa estas perspectivas como guía 
              para tu viaje personal.
            </p>
            <div className="flex items-center justify-center space-x-6 text-purple-300/60">
              <span>✨ Bendiciones</span>
              <span>•</span>
              <span>🌙 Confía en tu intuición</span>
              <span>•</span>
              <span>⭐ Abraza tu viaje</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingResults;