import React, { useState } from 'react';
import { ArrowLeft, Camera, ImageIcon } from 'lucide-react';
import { generatePalmReading } from '../services/openai';

interface PalmistryPageProps {
  onBack: () => void;
  onComplete: (result: string) => void;
}

const PalmistryPage: React.FC<PalmistryPageProps> = ({ onBack, onComplete }) => {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handlePayment = async () => {
    if (!image) return;
    setIsProcessing(true);
    await new Promise(res => setTimeout(res, 2000));
    try {
      const result = await generatePalmReading(image);
      onComplete(result);
    } catch (err) {
      console.error(err);
      alert('Error generando la lectura.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center text-purple-300 hover:text-purple-200 transition-colors mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver al Inicio
          </button>
          <h1 className="text-4xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold mb-4">
            Lectura de Manos
          </h1>
          <p className="text-purple-200">Adjunta una foto de la palma de tu mano para recibir tu interpretación.</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/20 mb-6 text-center">
          {image ? (
            <img src={image} alt="Palma" className="mx-auto mb-4 max-h-60 rounded-lg" />
          ) : (
            <div className="text-purple-300 mb-4">No se ha seleccionado imagen</div>
          )}

          <label className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-purple-200 py-3 px-6 rounded-lg cursor-pointer mb-4">
            <ImageIcon size={20} />
            <span>Adjuntar Imagen</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>

          <label className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-purple-200 py-3 px-6 rounded-lg cursor-pointer">
            <Camera size={20} />
            <span>Tomar Foto</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <button
          disabled={!image || isProcessing}
          onClick={handlePayment}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-serif text-xl py-4 px-8 rounded-lg transition-all duration-300"
        >
          {isProcessing ? 'Procesando...' : 'Pagar con PayPal 19,99€'}
        </button>
      </div>
    </div>
  );
};

export default PalmistryPage;
