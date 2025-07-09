import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Sparkles } from 'lucide-react';
import { SpreadType } from '../App';

interface QuestionFormProps {
  spreadType: SpreadType;
  onQuestionSubmit: (question: string) => void;
  onBack: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ spreadType, onQuestionSubmit, onBack }) => {
  const [question, setQuestion] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setQuestion(value);
    setIsValid(value.trim().length >= 10);
  };

  const handleExampleClick = (example: string) => {
    setQuestion(example);
    setIsValid(example.trim().length >= 10);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onQuestionSubmit(question);
    }
  };

  const getSpreadInfo = () => {
    switch (spreadType) {
      case 'single':
        return {
          name: 'Lectura de Una Carta',
          description: 'Enfócate en una pregunta o situación específica para obtener orientación clara y directa.',
          examples: [
            '¿En qué debería enfocarme hoy?',
            '¿Cómo puedo mejorar mi relación?',
            '¿Qué energía debería abrazar esta semana?'
          ]
        };
      case 'three-card':
        return {
          name: 'Lectura de Tres Cartas',
          description: 'Explora los aspectos pasado, presente y futuro de tu situación.',
          examples: [
            '¿Qué necesito saber sobre mi trayectoria profesional?',
            '¿Cómo puedo navegar esta situación desafiante?',
            '¿Cuáles son las influencias que afectan mi vida amorosa?'
          ]
        };
      case 'celtic-cross':
        return {
          name: 'Lectura de Cruz Céltica',
          description: 'Obtén perspectivas completas sobre todos los aspectos de tu situación.',
          examples: [
            '¿Cuál es mi camino espiritual y propósito?',
            '¿Cómo puedo alcanzar mis objetivos a largo plazo?',
            '¿Qué necesito entender sobre la dirección de mi vida?'
          ]
        };
    }
  };

  const spreadInfo = getSpreadInfo();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a las Tiradas
          </button>
          
          <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold mb-4">
            {spreadInfo.name}
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            {spreadInfo.description}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="question" className="block text-xl font-serif text-purple-200 mb-4">
                <MessageSquare className="inline mr-2" size={24} />
                ¿Qué te gustaría saber?
              </label>
              <textarea
                id="question"
                value={question}
                onChange={handleQuestionChange}
                placeholder="Haz tu pregunta aquí... Sé específico y enfócate en lo que realmente quieres entender."
                className="w-full h-32 bg-white/10 border border-purple-400/30 rounded-lg p-4 text-purple-100 placeholder-purple-300/60 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20 resize-none"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-purple-300/60 text-sm">
                  {question.length}/500 caracteres
                </span>
                <span className="text-purple-300/60 text-sm">
                  {isValid ? '✓ Listo' : 'Mínimo 10 caracteres'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-serif text-xl py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 disabled:cursor-not-allowed"
            >
              {isValid ? 'Continuar al Pago' : 'Introduce tu Pregunta'}
            </button>
          </form>
        </div>

        {/* Example Questions */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20">
          <h3 className="text-xl font-serif text-purple-200 mb-4 flex items-center">
            <Sparkles className="mr-2" size={20} />
            Preguntas de Ejemplo
          </h3>
          <div className="space-y-3">
            {spreadInfo.examples.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="block w-full text-left p-3 bg-white/5 rounded-lg border border-purple-400/20 hover:border-purple-400/40 text-purple-200 hover:text-purple-100 transition-all duration-300"
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;