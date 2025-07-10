import React from 'react';
import { Star, RotateCcw } from 'lucide-react';

interface PalmistryResultsProps {
  result: string;
  onRestart: () => void;
}

const PalmistryResults: React.FC<PalmistryResultsProps> = ({ result, onRestart }) => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Star className="text-amber-400 mr-2" size={32} />
            <h1 className="text-4xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold">
              Tu Lectura de Manos
            </h1>
            <Star className="text-amber-400 ml-2" size={32} />
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 mb-8">
          {result.split('\n').map((p, i) => (
            <p key={i} className="text-purple-200 mb-4 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-serif py-3 px-6 rounded-lg transition-all duration-300"
          >
            <RotateCcw className="mr-2" size={18} />
            Nueva Lectura
          </button>
        </div>
      </div>
    </div>
  );
};

export default PalmistryResults;
