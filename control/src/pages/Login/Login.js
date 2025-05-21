import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiArrowRight } from "react-icons/fi";
import { Alert } from "./Alert"; // Asegúrate de tener este componente
import logo from "../../recursos/logo.png";
import { useAuth } from "../../AuthContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const { setUser } = useAuth();
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
            Accept: "application/json"
          }
        }
      );

      const data = await response.json();

      if (data.length > 0) {
        console.log(data);
        const user = data[0];
        setUser(user);
        setAlertType("success");
        setAlertMessage(`¡Bienvenido, ${user.nombres} ${user.apellidos}!`); // Asume que tu API devuelve estos campos
        setShowAlert(true);
        setTimeout(() => navigate("/main"), 2000);
      } else {
        setAlertType("error");
        setAlertMessage("Credenciales incorrectas");
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setAlertType("error");
      setAlertMessage("Error de conexión con el servidor");
      setShowAlert(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Efecto de partículas */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-md border border-indigo-500/30">
        {/* Encabezado */}
        <div className="mb-10 text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-32 mx-auto mb-6 filter brightness-0 invert"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Bienvenido</h2>
          <p className="text-gray-400">Ingresa tus credenciales</p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          {/* Campo de usuario */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Usuario</label>
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                placeholder="Usuario"
              />
            </div>
          </div>

          {/* Campo de contraseña */}
          <div>
            <label className="block text-gray-400 text-sm mb-2">Contraseña</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Botón de login */}
          <button
            onClick={handleLogin}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-indigo-500/20"
          >
            <span>Iniciar Sesión</span>
            <FiArrowRight className="text-xl" />
          </button>
        </div>
      </div>

      {/* Componente de Alerta */}
      {showAlert && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Animaciones CSS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;