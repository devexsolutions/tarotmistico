import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Shield, Clock, CheckCircle } from 'lucide-react';
import { SpreadType } from '../App';

interface PaymentFlowProps {
  spreadType: SpreadType;
  question: string;
  onPaymentSuccess: () => void;
  onBack: () => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({ spreadType, question, onPaymentSuccess, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const getPrice = () => {
    switch (spreadType) {
      case 'single': return '9,99€';
      case 'three-card': return '19,99€';
      case 'celtic-cross': return '29,99€';
      default: return '9,99€';
    }
  };

  const getSpreadName = () => {
    switch (spreadType) {
      case 'single': return 'Lectura de Una Carta';
      case 'three-card': return 'Lectura de Tres Cartas';
      case 'celtic-cross': return 'Lectura de Cruz Céltica';
      default: return 'Lectura de Una Carta';
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing (en producción sería PayPal real)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onPaymentSuccess();
  };

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
            Volver a la Pregunta
          </button>
          
          <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold mb-4">
            Completa tu Lectura
          </h1>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Pago seguro para desbloquear tu lectura personalizada de tarot.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20">
            <h2 className="text-2xl font-serif text-purple-200 mb-6">Resumen del Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center py-3 border-b border-purple-400/20">
                <span className="text-purple-200">Tipo de Lectura</span>
                <span className="text-purple-100 font-medium">{getSpreadName()}</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-purple-400/20">
                <span className="text-purple-200">Procesamiento</span>
                <span className="text-purple-100 font-medium">Instantáneo</span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-purple-400/20">
                <span className="text-purple-200">Total</span>
                <span className="text-amber-400 font-bold text-2xl">{getPrice()}</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-serif text-purple-200 mb-2">Tu Pregunta</h3>
              <p className="text-purple-300/80 italic">"{question}"</p>
            </div>

            <div className="space-y-3 text-sm text-purple-300/80">
              <div className="flex items-center">
                <Shield className="mr-2 text-green-400" size={16} />
                Procesamiento de pago seguro
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-amber-400" size={16} />
                Entrega instantánea de lectura
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-2 text-purple-400" size={16} />
                100% garantía de satisfacción
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20">
            <h2 className="text-2xl font-serif text-purple-200 mb-6">Método de Pago</h2>
            
            {!isProcessing ? (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-4 border border-purple-400/20">
                  <div className="flex items-center mb-4">
                    <CreditCard className="text-blue-400 mr-3" size={24} />
                    <span className="text-purple-200 font-medium">PayPal</span>
                    <span className="ml-auto text-green-400 text-sm">Recommended</span>
                  </div>
                  <p className="text-purple-300/80 text-sm">
                    Paga de forma segura con tu cuenta PayPal o tarjeta de crédito. No se requiere cuenta.
                  </p>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-serif text-xl py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  Pagar con PayPal {getPrice()}
                </button>

                <div className="text-center">
                  <div className="text-purple-300/60 text-sm mb-4">
                    O pagar con tarjeta
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-serif text-lg py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
                  >
                    Pagar con Tarjeta de Crédito
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-6"></div>
                <h3 className="text-xl font-serif text-purple-200 mb-2">Procesando Pago...</h3>
                <p className="text-purple-300/80">Por favor espera mientras procesamos tu pago de forma segura.</p>
                <div className="mt-6 bg-white/5 rounded-lg p-4">
                  <p className="text-purple-300/80 text-sm">
                    🔮 Tu lectura se está preparando...
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-purple-400/20">
              <div className="flex items-center justify-center space-x-4 text-purple-300/60 text-sm">
                <Shield size={16} />
                <span>Cifrado SSL</span>
                <span>•</span>
                <span>Cumple PCI</span>
                <span>•</span>
                <span>100% Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFlow;