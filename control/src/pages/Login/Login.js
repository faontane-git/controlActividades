import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import logo from '../../recursos/logo.png'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('/main');
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s infinite`
            }}
          />
        ))}
      </div>

      {/* Tarjeta de Login */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="mb-10 text-center">
          <img 
            src={logo} // Reemplaza con tu logo
            alt="Logo FSoftSolutions"
            className="w-32 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
          <p className="text-white/80">Ingresa tus credenciales para continuar</p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm mb-2">Usuario</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="Usuario"
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">Contraseña</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center space-x-2 bg-white text-indigo-900 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            <span>Iniciar Sesión</span>
            <FiArrowRight className="text-xl" />
          </button>

          <div className="text-center">
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;