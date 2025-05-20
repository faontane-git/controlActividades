import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiArrowRight } from 'react-icons/fi';
import logo from '../../recursos/logo.png';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    try {
      const response = await fetch(
        `${supabaseUrl}/rest/v1/usuarios?usuario=eq.${encodeURIComponent(username)}&password=eq.${encodeURIComponent(password)}`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            Accept: 'application/json'
          }
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        // Usuario autenticado correctamente
        navigate('/main');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 relative overflow-hidden">
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

      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <div className="mb-10 text-center">
          <img src={logo} alt="Logo FSoftSolutions" className="w-32 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
          <p className="text-white/80">Ingresa tus credenciales para continuar</p>
        </div>

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
                placeholder="Correo electrónico"
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

          <div className="flex flex-col items-center space-y-4 pt-2">
            <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
              ¿Olvidaste tu contraseña?
            </a>
            <div className="text-center text-sm">
              <span className="text-white/70">¿No tienes una cuenta? </span>
              <button
                onClick={() => navigate('/register')}
                className="text-white font-medium hover:underline transition-colors focus:outline-none"
              >
                Regístrate aquí
              </button>
            </div>
          </div>
        </div>
      </div>

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
