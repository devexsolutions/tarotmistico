import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (mode === 'login') {
        await login(username, password, remember);
      } else {
        if (password !== confirm) {
          setError('Las contraseñas no coinciden');
          return;
        }
        await register(username, password, email);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20">
        <h1 className="text-4xl font-serif text-transparent bg-gradient-to-r from-purple-400 to-amber-400 bg-clip-text text-center mb-6">
          {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 focus:outline-none"
          />
          {mode === 'register' && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 focus:outline-none"
            />
          )}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 focus:outline-none"
          />
          {mode === 'register' && (
            <input
              type="password"
              placeholder="Confirmar Contraseña"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/10 border border-purple-400/30 text-purple-100 focus:outline-none"
            />
          )}
          {mode === 'login' && (
            <label className="flex items-center text-purple-200">
              <input
                type="checkbox"
                className="mr-2"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Recordar contraseña
            </label>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-amber-600 text-white py-3 rounded-lg"
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
