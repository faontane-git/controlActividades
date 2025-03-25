import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEdit } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const PerfilPage = () => {
  const [nombre, setNombre] = useState('Fabrizzio');
  const [correo, setCorreo] = useState('fabrizzio@email.com');
  const [password, setPassword] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    console.log('Datos guardados:', { nombre, correo, password });
    setEditMode(false);
  };

  return (
    <>
      <NavBar /> {/* Agregamos el NavBar */}
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6 pt-24">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Perfil</h2>
          
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <FiUser className="text-gray-600 bg-gray-200 p-3 rounded-full w-20 h-20" />
              <button
                onClick={() => setEditMode(!editMode)}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full shadow-md hover:bg-blue-600 transition"
              >
                <FiEdit size={16} />
              </button>
            </div>
          </div>

          {/* Formulario */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-100">
              <FiUser className="text-gray-500" />
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="bg-transparent outline-none w-full"
                disabled={!editMode}
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-100">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="bg-transparent outline-none w-full"
                disabled={!editMode}
              />
            </div>

            <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-100">
              <FiLock className="text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full"
                disabled={!editMode}
                placeholder="Nueva contraseña"
              />
            </div>
          </div>

          {/* Botones */}
          {editMode ? (
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 w-full bg-gray-200 text-gray-700 py-2 rounded-lg shadow hover:bg-gray-300 transition"
            >
              Editar perfil
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PerfilPage;
