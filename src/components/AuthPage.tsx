import React, { useState } from 'react';
import { Star, Moon, Sun, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        if (password !== confirm) {
          setError('Las contraseñas no coinciden');
          return;
        }
        await register(username, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative flex items-center justify-center px-4">
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
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text font-bold">
            Tarot Místico
          </h1>
        </div>
        <h2 className="text-2xl font-serif text-purple-200 text-center mb-4">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 placeholder-purple-300/60 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 placeholder-purple-300/60 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
          />
          {mode === 'register' && (
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 placeholder-purple-300/60 focus:outline-none focus:border-purple-400/60 focus:ring-2 focus:ring-purple-400/20"
            />
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-amber-600 hover:from-purple-700 hover:to-amber-700 text-white font-serif text-lg py-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25"
          >
            {mode === 'login' ? 'Entrar' : 'Registrarse'}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          className="mt-4 text-sm text-purple-300 hover:text-purple-100 w-full text-center"
        >
          {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
