import React, { useState } from 'react';
import { Star, Moon, Sun, Sparkles } from 'lucide-react';
import { generateTarotReading } from './services/openai';
import LandingPage from './components/LandingPage';
import SpreadSelection from './components/SpreadSelection';
import QuestionForm from './components/QuestionForm';
import PaymentFlow from './components/PaymentFlow';
import ReadingResults from './components/ReadingResults';
import AuthPage from './components/AuthPage';
import { useAuth } from './context/AuthContext';

export type SpreadType = 'single' | 'three-card' | 'celtic-cross';

export interface Reading {
  id: string;
  question: string;
  spreadType: SpreadType;
  cards: {
    name: string;
    position: string;
    reversed: boolean;
    meaning: string;
  }[];
  interpretation: string;
  timestamp: Date;
}

function App() {
  const { user, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState<'landing' | 'spread' | 'question' | 'payment' | 'results'>('landing');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>('single');
  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState<Reading | null>(null);

  if (!user) {
    return <AuthPage />;
  }

  const handleSpreadSelection = (spread: SpreadType) => {
    setSelectedSpread(spread);
    setCurrentStep('question');
  };

  const handleQuestionSubmit = (userQuestion: string) => {
    setQuestion(userQuestion);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    generateRealReading();
  };

  const generateRealReading = async () => {
    try {
      const aiReading = await generateTarotReading(question, selectedSpread);
      
      const reading: Reading = {
        id: Date.now().toString(),
        question: question,
        spreadType: selectedSpread,
        cards: aiReading.cards,
        interpretation: aiReading.interpretation,
        timestamp: new Date()
      };
      
      setReading(reading);
      setCurrentStep('results');
    } catch (error) {
      console.error('Error generando lectura:', error);
      // Fallback a lectura simulada si hay error
      const mockReading = generateMockReading(selectedSpread, question);
      setReading(mockReading);
      setCurrentStep('results');
    }
  };

  const generateMockReading = (spreadType: SpreadType, userQuestion: string): Reading => {
    const tarotCards = [
      'El Loco', 'El Mago', 'La Suma Sacerdotisa', 'La Emperatriz', 'El Emperador',
      'El Hierofante', 'Los Enamorados', 'El Carro', 'La Fuerza', 'El Ermitaño',
      'La Rueda de la Fortuna', 'La Justicia', 'El Colgado', 'La Muerte', 'La Templanza',
      'El Diablo', 'La Torre', 'La Estrella', 'La Luna', 'El Sol', 'El Juicio', 'El Mundo'
    ];

    const cardMeanings: { [key: string]: { upright: string; reversed: string } } = {
      'El Loco': {
        upright: 'Nuevos comienzos, inocencia, espontaneidad, espíritu libre',
        reversed: 'Imprudencia, ser aprovechado, inconsideración'
      },
      'El Mago': {
        upright: 'Manifestación, ingenio, poder, acción inspirada',
        reversed: 'Manipulación, mala planificación, talentos sin explotar'
      },
      'La Suma Sacerdotisa': {
        upright: 'Intuición, conocimiento sagrado, divino femenino, mente subconsciente',
        reversed: 'Secretos, desconectado de la intuición, retraimiento'
      },
      'La Emperatriz': {
        upright: 'Feminidad, belleza, naturaleza, cuidado, abundancia',
        reversed: 'Bloqueo creativo, dependencia de otros'
      },
      'El Emperador': {
        upright: 'Autoridad, establecimiento, estructura, figura paterna',
        reversed: 'Dominación, control excesivo, falta de disciplina'
      }
    };

    let cards: Reading['cards'] = [];
    let interpretation = '';

    switch (spreadType) {
      case 'single':
        const singleCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
        const singleReversed = Math.random() < 0.3;
        cards = [{
          name: singleCard,
          position: 'Orientación',
          reversed: singleReversed,
          meaning: cardMeanings[singleCard] ? 
            (singleReversed ? cardMeanings[singleCard].reversed : cardMeanings[singleCard].upright) :
            'A powerful card representing transformation and insight'
        }];
        interpretation = `Tu lectura de una carta revela orientación importante para tu pregunta. ${singleCard} ${singleReversed ? 'invertida' : ''} sugiere que ${singleReversed ? 'puede que necesites mirar hacia adentro y abordar bloqueos o desafíos internos' : 'tienes el poder y la energía necesarios para avanzar positivamente'}. 

Esta carta te anima a confiar en tus instintos y tomar acción alineada con tu mayor bien. El universo está apoyando tu viaje, y esta carta sirve como un faro de sabiduría para tu situación actual.`;
        break;

      case 'three-card':
        const positions = ['Pasado', 'Presente', 'Futuro'];
        for (let i = 0; i < 3; i++) {
          const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
          const reversed = Math.random() < 0.3;
          cards.push({
            name: card,
            position: positions[i],
            reversed,
            meaning: cardMeanings[card] ? 
              (reversed ? cardMeanings[card].reversed : cardMeanings[card].upright) :
              'A significant card bringing important insights'
          });
        }
        interpretation = `Tu lectura de tres cartas proporciona una visión completa de tu situación a través del tiempo.

**Pasado (${cards[0].name}${cards[0].reversed ? ' Invertida' : ''}):** Esta carta representa los cimientos e influencias que han llevado a tu situación actual. ${cards[0].reversed ? 'Puede que haya habido desafíos o lecciones que necesitaban ser aprendidas' : 'La energía aquí ha sido de apoyo para tu crecimiento'}.

**Presente (${cards[1].name}${cards[1].reversed ? ' Invertida' : ''}):** Esto muestra tu estado actual y las energías que te rodean ahora. ${cards[1].reversed ? 'Puede que estés experimentando algún conflicto interno o necesites cambiar tu perspectiva' : 'Estás en una posición de fuerza y claridad'}.

**Futuro (${cards[2].name}${cards[2].reversed ? ' Invertida' : ''}):** Esto revela el resultado probable si continúas en tu camino actual. ${cards[2].reversed ? 'Ten cuidado con los obstáculos potenciales y confía en tu sabiduría interior para navegarlos' : 'El futuro tiene potencial positivo y oportunidades de crecimiento'}.

El mensaje general te anima a aprender de tu pasado, abrazar tus circunstancias presentes, y moverte con confianza hacia tu futuro con sabiduría e intención.`;
        break;

      case 'celtic-cross':
        const celticPositions = [
          'Situación Presente', 'Desafío/Cruz', 'Pasado Lejano/Fundación', 'Pasado Reciente',
          'Resultado Posible', 'Futuro Inmediato', 'Tu Enfoque', 'Influencias Externas',
          'Esperanzas y Miedos', 'Resultado Final'
        ];
        for (let i = 0; i < 10; i++) {
          const card = tarotCards[Math.floor(Math.random() * tarotCards.length)];
          const reversed = Math.random() < 0.25;
          cards.push({
            name: card,
            position: celticPositions[i],
            reversed,
            meaning: cardMeanings[card] ? 
              (reversed ? cardMeanings[card].reversed : cardMeanings[card].upright) :
              'A meaningful card offering deep insights'
          });
        }
        interpretation = `Tu lectura de Cruz Céltica proporciona un análisis completo de tu situación desde múltiples perspectivas.

**Los Cimientos:** Tu pasado lejano (${cards[2].name}) y pasado reciente (${cards[3].name}) han moldeado tus circunstancias actuales. Estas influencias continúan jugando un papel en tu situación presente.

**El Presente:** Tu situación actual (${cards[0].name}) está siendo desafiada o influenciada por ${cards[1].name}. Esta corriente cruzada requiere tu atención y comprensión.

**Tu Mundo Interior:** Tu enfoque (${cards[6].name}) y tus esperanzas y miedos (${cards[8].name}) revelan tu paisaje interno y cómo estás procesando esta situación.

**Fuerzas Externas:** Las influencias externas (${cards[7].name}) muestran qué energías y personas a tu alrededor están afectando tu camino.

**El Camino Futuro:** El futuro inmediato (${cards[5].name}) lleva hacia un resultado posible (${cards[4].name}), culminando finalmente en el resultado final (${cards[9].name}).

Esta lectura completa sugiere una situación compleja pero navegable. Confía en tu sabiduría interior, presta atención a las lecciones de tu pasado, y mantente abierto a la guía que el universo está proporcionando. Tu viaje se está desarrollando exactamente como debe, con cada desafío sirviendo a tu mayor crecimiento y evolución.`;
        break;
    }

    return {
      id: Date.now().toString(),
      question: userQuestion,
      spreadType,
      cards,
      interpretation,
      timestamp: new Date()
    };
  };

  const handleStartOver = () => {
    setCurrentStep('landing');
    setSelectedSpread('single');
    setQuestion('');
    setReading(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
      <button
        onClick={logout}
        className="absolute top-4 right-4 text-purple-200 hover:text-white z-10"
      >
        Cerrar Sesión
      </button>
      {/* Mystical background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-purple-400/20 animate-pulse">
          <Star size={32} />
        </div>
        <div className="absolute top-32 right-20 text-amber-400/20 animate-bounce">
          <Moon size={24} />
        </div>
        <div className="absolute bottom-20 left-20 text-purple-300/20 animate-pulse">
          <Sun size={28} />
        </div>
        <div className="absolute bottom-32 right-10 text-amber-300/20 animate-bounce">
          <Sparkles size={20} />
        </div>
      </div>

      {currentStep === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentStep('spread')} />
      )}
      
      {currentStep === 'spread' && (
        <SpreadSelection 
          onSpreadSelect={handleSpreadSelection}
          onBack={() => setCurrentStep('landing')}
        />
      )}
      
      {currentStep === 'question' && (
        <QuestionForm 
          spreadType={selectedSpread}
          onQuestionSubmit={handleQuestionSubmit}
          onBack={() => setCurrentStep('spread')}
        />
      )}
      
      {currentStep === 'payment' && (
        <PaymentFlow 
          spreadType={selectedSpread}
          question={question}
          onPaymentSuccess={handlePaymentSuccess}
          onBack={() => setCurrentStep('question')}
        />
      )}
      
      {currentStep === 'results' && reading && (
        <ReadingResults 
          reading={reading}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  );
}

export default App;