import React from 'react';
import { Star, Moon, Sun, Heart, Sword, Wand2, Coins, Crown, Shield, Eye, Flame, Droplets, Mountain, Zap, Flower, Skull, Power as Tower, Rainbow, Sparkles, Circle, Triangle, Square, Diamond, Hexagon } from 'lucide-react';

interface TarotCardProps {
  name: string;
  reversed: boolean;
  size?: 'small' | 'medium' | 'large';
  showName?: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  name, 
  reversed, 
  size = 'medium',
  showName = true 
}) => {
  const getCardDesign = (cardName: string) => {
    // Arcanos Mayores
    if (cardName === 'El Loco') {
      return {
        gradient: 'from-yellow-400 via-orange-500 to-red-500',
        icon: <Star className="text-white" size={32} />,
        symbol: <Circle className="text-yellow-200/50" size={60} />,
        border: 'border-yellow-400/50'
      };
    }
    
    if (cardName === 'El Mago') {
      return {
        gradient: 'from-purple-600 via-blue-600 to-indigo-700',
        icon: <Wand2 className="text-white" size={32} />,
        symbol: <Triangle className="text-purple-200/50" size={60} />,
        border: 'border-purple-400/50'
      };
    }
    
    if (cardName === 'La Suma Sacerdotisa') {
      return {
        gradient: 'from-blue-600 via-indigo-600 to-purple-700',
        icon: <Moon className="text-white" size={32} />,
        symbol: <Circle className="text-blue-200/50" size={60} />,
        border: 'border-blue-400/50'
      };
    }
    
    if (cardName === 'La Emperatriz') {
      return {
        gradient: 'from-green-500 via-emerald-600 to-teal-700',
        icon: <Crown className="text-white" size={32} />,
        symbol: <Heart className="text-green-200/50" size={60} />,
        border: 'border-green-400/50'
      };
    }
    
    if (cardName === 'El Emperador') {
      return {
        gradient: 'from-red-600 via-orange-600 to-yellow-600',
        icon: <Shield className="text-white" size={32} />,
        symbol: <Square className="text-red-200/50" size={60} />,
        border: 'border-red-400/50'
      };
    }
    
    if (cardName === 'El Hierofante') {
      return {
        gradient: 'from-amber-600 via-yellow-600 to-orange-600',
        icon: <Crown className="text-white" size={32} />,
        symbol: <Triangle className="text-amber-200/50" size={60} />,
        border: 'border-amber-400/50'
      };
    }
    
    if (cardName === 'Los Enamorados') {
      return {
        gradient: 'from-pink-500 via-rose-600 to-red-600',
        icon: <Heart className="text-white" size={32} />,
        symbol: <Heart className="text-pink-200/50" size={60} />,
        border: 'border-pink-400/50'
      };
    }
    
    if (cardName === 'El Carro') {
      return {
        gradient: 'from-gray-600 via-slate-700 to-zinc-800',
        icon: <Shield className="text-white" size={32} />,
        symbol: <Square className="text-gray-200/50" size={60} />,
        border: 'border-gray-400/50'
      };
    }
    
    if (cardName === 'La Fuerza') {
      return {
        gradient: 'from-orange-500 via-red-600 to-pink-600',
        icon: <Flame className="text-white" size={32} />,
        symbol: <Circle className="text-orange-200/50" size={60} />,
        border: 'border-orange-400/50'
      };
    }
    
    if (cardName === 'El Ermitaño') {
      return {
        gradient: 'from-gray-700 via-slate-800 to-zinc-900',
        icon: <Star className="text-white" size={32} />,
        symbol: <Hexagon className="text-gray-200/50" size={60} />,
        border: 'border-gray-400/50'
      };
    }
    
    if (cardName === 'La Rueda de la Fortuna') {
      return {
        gradient: 'from-purple-500 via-indigo-600 to-blue-700',
        icon: <Circle className="text-white" size={32} />,
        symbol: <Circle className="text-purple-200/50" size={60} />,
        border: 'border-purple-400/50'
      };
    }
    
    if (cardName === 'La Justicia') {
      return {
        gradient: 'from-blue-600 via-indigo-700 to-purple-800',
        icon: <Sword className="text-white" size={32} />,
        symbol: <Square className="text-blue-200/50" size={60} />,
        border: 'border-blue-400/50'
      };
    }
    
    if (cardName === 'El Colgado') {
      return {
        gradient: 'from-teal-600 via-cyan-700 to-blue-800',
        icon: <Droplets className="text-white" size={32} />,
        symbol: <Triangle className="text-teal-200/50" size={60} />,
        border: 'border-teal-400/50'
      };
    }
    
    if (cardName === 'La Muerte') {
      return {
        gradient: 'from-gray-800 via-slate-900 to-black',
        icon: <Skull className="text-white" size={32} />,
        symbol: <Circle className="text-gray-200/50" size={60} />,
        border: 'border-gray-400/50'
      };
    }
    
    if (cardName === 'La Templanza') {
      return {
        gradient: 'from-blue-500 via-teal-600 to-green-700',
        icon: <Droplets className="text-white" size={32} />,
        symbol: <Triangle className="text-blue-200/50" size={60} />,
        border: 'border-blue-400/50'
      };
    }
    
    if (cardName === 'El Diablo') {
      return {
        gradient: 'from-red-700 via-orange-800 to-yellow-900',
        icon: <Flame className="text-white" size={32} />,
        symbol: <Triangle className="text-red-200/50" size={60} />,
        border: 'border-red-400/50'
      };
    }
    
    if (cardName === 'La Torre') {
      return {
        gradient: 'from-gray-600 via-stone-700 to-slate-800',
        icon: <Tower className="text-white" size={32} />,
        symbol: <Square className="text-gray-200/50" size={60} />,
        border: 'border-gray-400/50'
      };
    }
    
    if (cardName === 'La Estrella') {
      return {
        gradient: 'from-blue-400 via-cyan-500 to-teal-600',
        icon: <Star className="text-white" size={32} />,
        symbol: <Star className="text-blue-200/50" size={60} />,
        border: 'border-blue-400/50'
      };
    }
    
    if (cardName === 'La Luna') {
      return {
        gradient: 'from-indigo-600 via-purple-700 to-pink-800',
        icon: <Moon className="text-white" size={32} />,
        symbol: <Moon className="text-indigo-200/50" size={60} />,
        border: 'border-indigo-400/50'
      };
    }
    
    if (cardName === 'El Sol') {
      return {
        gradient: 'from-yellow-400 via-orange-500 to-red-600',
        icon: <Sun className="text-white" size={32} />,
        symbol: <Sun className="text-yellow-200/50" size={60} />,
        border: 'border-yellow-400/50'
      };
    }
    
    if (cardName === 'El Juicio') {
      return {
        gradient: 'from-purple-600 via-indigo-700 to-blue-800',
        icon: <Zap className="text-white" size={32} />,
        symbol: <Triangle className="text-purple-200/50" size={60} />,
        border: 'border-purple-400/50'
      };
    }
    
    if (cardName === 'El Mundo') {
      return {
        gradient: 'from-green-500 via-teal-600 to-blue-700',
        icon: <Circle className="text-white" size={32} />,
        symbol: <Circle className="text-green-200/50" size={60} />,
        border: 'border-green-400/50'
      };
    }

    // Copas
    if (cardName.includes('Copas')) {
      return {
        gradient: 'from-blue-500 via-cyan-600 to-teal-700',
        icon: <Heart className="text-white" size={32} />,
        symbol: <Heart className="text-blue-200/50" size={60} />,
        border: 'border-blue-400/50'
      };
    }
    
    // Espadas
    if (cardName.includes('Espadas')) {
      return {
        gradient: 'from-gray-600 via-slate-700 to-zinc-800',
        icon: <Sword className="text-white" size={32} />,
        symbol: <Sword className="text-gray-200/50" size={60} />,
        border: 'border-gray-400/50'
      };
    }
    
    // Bastos
    if (cardName.includes('Bastos')) {
      return {
        gradient: 'from-orange-500 via-red-600 to-pink-700',
        icon: <Wand2 className="text-white" size={32} />,
        symbol: <Wand2 className="text-orange-200/50" size={60} />,
        border: 'border-orange-400/50'
      };
    }
    
    // Oros
    if (cardName.includes('Oros')) {
      return {
        gradient: 'from-yellow-500 via-amber-600 to-orange-700',
        icon: <Coins className="text-white" size={32} />,
        symbol: <Coins className="text-yellow-200/50" size={60} />,
        border: 'border-yellow-400/50'
      };
    }

    // Default
    return {
      gradient: 'from-purple-600 via-indigo-700 to-blue-800',
      icon: <Sparkles className="text-white" size={32} />,
      symbol: <Star className="text-purple-200/50" size={60} />,
      border: 'border-purple-400/50'
    };
  };

  const design = getCardDesign(name);
  
  const sizeClasses = {
    small: 'w-16 h-24',
    medium: 'w-24 h-36',
    large: 'w-32 h-48'
  };

  const iconSizes = {
    small: 16,
    medium: 24,
    large: 32
  };

  const symbolSizes = {
    small: 30,
    medium: 40,
    large: 50
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br ${design.gradient} 
          rounded-lg 
          border-2 ${design.border}
          shadow-lg 
          relative 
          overflow-hidden
          ${reversed ? 'transform rotate-180' : ''}
          transition-all duration-300 hover:scale-105 hover:shadow-xl
        `}
      >
        {/* Símbolo de fondo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          {React.cloneElement(design.symbol, { 
            size: symbolSizes[size] 
          })}
        </div>
        
        {/* Patrón decorativo */}
        <div className="absolute top-2 left-2 right-2 flex justify-between">
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
        </div>
        
        {/* Icono principal */}
        <div className="absolute inset-0 flex items-center justify-center">
          {React.cloneElement(design.icon, { 
            size: iconSizes[size] 
          })}
        </div>
        
        {/* Patrón decorativo inferior */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
          <div className="w-1 h-1 bg-white/30 rounded-full"></div>
        </div>
        
        {/* Indicador de carta invertida */}
        {reversed && (
          <div className="absolute top-1 right-1">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      {/* Nombre de la carta */}
      {showName && (
        <div className="mt-2 text-center">
          <p className={`font-serif text-purple-200 ${
            size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-base'
          }`}>
            {name}
          </p>
          {reversed && (
            <p className="text-red-300 text-xs">(Invertida)</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TarotCard;