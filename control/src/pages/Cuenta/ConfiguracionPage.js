import React, { useState } from 'react';
import NavBar from '../NavBar/Navbar';
import { FiSettings, FiBell, FiLock, FiSave } from 'react-icons/fi';

const ConfiguracionPage = () => {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [privacidad, setPrivacidad] = useState('Pública');

  const handleSave = () => {
    console.log('Configuración guardada:', { notificaciones, modoOscuro, privacidad });
  };

  return (
    <>
      <NavBar /> {/* Agregamos el NavBar */}
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6 pt-24">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Configuración</h2>

          <div className="space-y-4">
            {/* Notificaciones */}
            <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-100">
              <div className="flex items-center gap-2">
                <FiBell className="text-gray-500" />
                <span className="text-gray-700">Notificaciones</span>
              </div>
              <input
                type="checkbox"
                checked={notificaciones}
                onChange={() => setNotificaciones(!notificaciones)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
            </div>

            {/* Modo Oscuro */}
            <div className="flex items-center justify-between border rounded-lg px-3 py-2 bg-gray-100">
              <div className="flex items-center gap-2">
                <FiSettings className="text-gray-500" />
                <span className="text-gray-700">Modo Oscuro</span>
              </div>
              <input
                type="checkbox"
                checked={modoOscuro}
                onChange={() => setModoOscuro(!modoOscuro)}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
            </div>

            {/* Privacidad */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-100">
              <FiLock className="text-gray-500" />
              <select
                value={privacidad}
                onChange={(e) => setPrivacidad(e.target.value)}
                className="bg-transparent outline-none w-full"
              >
                <option value="Pública">Pública</option>
                <option value="Privada">Privada</option>
                <option value="Solo amigos">Solo amigos</option>
              </select>
            </div>
          </div>

          {/* Botón Guardar */}
          <button
            onClick={handleSave}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition flex items-center justify-center gap-2"
          >
            <FiSave size={18} />
            Guardar cambios
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfiguracionPage;
