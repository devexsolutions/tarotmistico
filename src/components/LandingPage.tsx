import React from 'react';
import { Star, Moon, Sparkles, ArrowRight } from 'lucide-react';
import TarotCard from './TarotCard';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Star className="text-amber-400 mr-2" size={48} />
              <div className="absolute -top-1 -right-1 text-purple-400 animate-pulse">
                <Sparkles size={20} />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-gradient-to-r from-purple-400 via-amber-400 to-purple-400 bg-clip-text font-bold">
              Tarot Místico
            </h1>
            <div className="relative">
              <Moon className="text-purple-400 ml-2" size={48} />
              <div className="absolute -top-1 -left-1 text-amber-400 animate-pulse">
                <Sparkles size={16} />
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre los misterios de tu futuro con lecturas de tarot potenciadas por IA. 
            Conecta con la sabiduría ancestral a través de la tecnología moderna.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <TarotCard name="El Mago" reversed={false} size="small" showName={false} />
              </div>
              <h3 className="text-xl font-serif text-purple-200 mb-2">Lecturas Instantáneas</h3>
              <p className="text-purple-300/80">Obtén tu lectura personalizada de tarot en minutos, potenciada por interpretación avanzada de IA.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4 flex justify-center space-x-1">
                <TarotCard name="Tres de Copas" reversed={false} size="small" showName={false} />
                <TarotCard name="Rey de Espadas" reversed={false} size="small" showName={false} />
                <TarotCard name="As de Oros" reversed={false} size="small" showName={false} />
              </div>
              <h3 className="text-xl font-serif text-purple-200 mb-2">Múltiples Tiradas</h3>
              <p className="text-purple-300/80">Elige entre tiradas de una carta, tres cartas o Cruz Céltica para diferentes perspectivas.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="mb-4 flex justify-center">
                <TarotCard name="La Estrella" reversed={false} size="small" showName={false} />
              </div>
              <h3 className="text-xl font-serif text-purple-200 mb-2">Seguro y Privado</h3>
              <p className="text-purple-300/80">Tus preguntas y lecturas son privadas y seguras. Paga de forma segura a través de PayPal.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative">
          <button
            onClick={onGetStarted}
            className="group bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-serif text-xl px-12 py-4 rounded-full transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
          >
            Comienza tu Viaje
            <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          
          <div className="mt-6 text-purple-300/60">
            <p className="text-sm">Lecturas desde 1,99€ • Entrega instantánea • 100% satisfacción garantizada</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;