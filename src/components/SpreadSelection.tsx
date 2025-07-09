import React from 'react';
import { ArrowLeft, Star, Moon, Sun } from 'lucide-react';
import TarotCard from './TarotCard';
import { SpreadType } from '../App';

interface SpreadSelectionProps {
  onSpreadSelect: (spread: SpreadType) => void;
  onBack: () => void;
}

const SpreadSelection: React.FC<SpreadSelectionProps> = ({ onSpreadSelect, onBack }) => {
  const spreads = [
    {
      type: 'single' as SpreadType,
      name: 'Una Carta',
      price: '9,99€',
      description: 'Perfecta para orientación diaria o perspectivas rápidas sobre una situación específica.',
      icon: <Star className="text-amber-400" size={32} />,
      features: ['Perspectiva rápida', 'Orientación diaria', 'Interpretación sencilla']
    },
    {
      type: 'three-card' as SpreadType,
      name: 'Tirada de Tres Cartas',
      price: '19,99€',
      description: 'Explora los aspectos pasado, presente y futuro de tu pregunta.',
      icon: <Moon className="text-purple-400" size={32} />,
      features: ['Pasado, Presente, Futuro', 'Análisis detallado', 'Orientación completa']
    },
    {
      type: 'celtic-cross' as SpreadType,
      name: 'Cruz Céltica',
      price: '29,99€',
      description: 'La tirada más completa para perspectivas profundas y orientación detallada.',
      icon: <Sun className="text-amber-400" size={32} />,
      features: ['Tirada de 10 cartas', 'Perspectivas profundas', 'Análisis completo de vida']
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Inicio
          </button>
          
          <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold mb-4">
            Elige tu Tirada
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Selecciona el tipo de lectura que resuene con tus necesidades y preguntas actuales.
          </p>
        </div>

        {/* Spread Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {spreads.map((spread) => (
            <div
              key={spread.type}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group"
              onClick={() => onSpreadSelect(spread.type)}
            >
              <div className="text-center mb-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex space-x-2">
                    {spread.type === 'single' && (
                      <TarotCard name="El Loco" reversed={false} size="small" showName={false} />
                    )}
                    {spread.type === 'three-card' && (
                      <>
                        <TarotCard name="El Mago" reversed={false} size="small" showName={false} />
                        <TarotCard name="La Emperatriz" reversed={false} size="small" showName={false} />
                        <TarotCard name="El Sol" reversed={false} size="small" showName={false} />
                      </>
                    )}
                    {spread.type === 'celtic-cross' && (
                      <>
                        <TarotCard name="La Luna" reversed={false} size="small" showName={false} />
                        <TarotCard name="La Estrella" reversed={false} size="small" showName={false} />
                        <TarotCard name="El Mundo" reversed={false} size="small" showName={false} />
                        <TarotCard name="La Fuerza" reversed={false} size="small" showName={false} />
                        <TarotCard name="El Ermitaño" reversed={false} size="small" showName={false} />
                      </>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-serif text-purple-200 mb-2">{spread.name}</h3>
                <div className="text-3xl font-bold text-amber-400 mb-4">{spread.price}</div>
                <p className="text-purple-300/80 leading-relaxed">{spread.description}</p>
              </div>

              <div className="space-y-3 mb-8">
                {spread.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-purple-200">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-serif py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/25">
                Seleccionar esta Tirada
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-serif text-purple-200 mb-3">What You'll Receive</h3>
            <h3 className="text-xl font-serif text-purple-200 mb-3">Lo que Recibirás</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-300/80">
              <div>✨ Interpretación potenciada por IA</div>
              <div>🔮 Perspectivas personalizadas</div>
              <div>📱 Entrega instantánea</div>
              <div>💫 Explicaciones detalladas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadSelection;