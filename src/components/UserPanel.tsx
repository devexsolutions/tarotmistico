import React from 'react';
import { ArrowLeft, Eye, Download } from 'lucide-react';
import { Reading } from '../App';
import { useAuth } from '../context/AuthContext';
import { getReadings, exportReadingToPdf } from '../services/readings';

interface UserPanelProps {
  onSelect: (reading: Reading) => void;
  onBack: () => void;
}

const UserPanel: React.FC<UserPanelProps> = ({ onSelect, onBack }) => {
  const { user } = useAuth();
  const readings = user ? getReadings(user) : [];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver
          </button>
          <h1 className="text-4xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold mb-4">
            Mis Lecturas
          </h1>
        </div>
        {readings.length === 0 ? (
          <p className="text-purple-200 text-center">Aún no tienes lecturas guardadas.</p>
        ) : (
          <div className="space-y-6">
            {readings.map((r) => (
              <div key={r.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 flex flex-col sm:flex-row sm:items-center justify-between">
                <div className="mb-4 sm:mb-0">
                  <p className="text-purple-200 font-serif mb-1">{r.question}</p>
                  <p className="text-purple-300 text-sm">{new Date(r.timestamp).toLocaleString()}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onSelect(r)}
                    className="flex items-center bg-white/10 hover:bg-white/20 text-purple-200 py-2 px-4 rounded-lg"
                  >
                    <Eye size={18} className="mr-2" /> Ver
                  </button>
                  <button
                    onClick={() => exportReadingToPdf(r)}
                    className="flex items-center bg-white/10 hover:bg-white/20 text-purple-200 py-2 px-4 rounded-lg"
                  >
                    <Download size={18} className="mr-2" /> PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPanel;
