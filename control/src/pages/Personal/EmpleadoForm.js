import React, { useState, useEffect } from 'react';
import { FiX, FiUser, FiBriefcase, FiLayers, FiMail, FiPhone } from 'react-icons/fi';

const EmpleadoForm = ({ empleado, onClose }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    usuario: '',
    cedula: '',
    email: '',
    telefono: ''
  });

  const [cedulaError, setCedulaError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (empleado) {
      setFormData(empleado);
    }
  }, [empleado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cedula') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const guardarEmpleadoYUsuario = async () => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    try {
      setLoading(true);

      // 1. Insertar empleado
      const empleadoRes = await fetch(`${supabaseUrl}/rest/v1/empleados`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify({
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          usuario: formData.usuario, // ✅ importante
          cedula: formData.cedula,
          email: formData.email,
          telefono: formData.telefono
        })
      });

      if (!empleadoRes.ok) {
        const error = await empleadoRes.json();
        console.error('Error al guardar empleado:', error);
        throw new Error('Error al guardar empleado');
      }

      // 2. Insertar usuario
      const usuarioRes = await fetch(`${supabaseUrl}/rest/v1/usuarios`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          correo: formData.email,
          usuario: formData.usuario,
          password: formData.cedula,
          rol: 'empleado',
          activo: true,
          admin: false
        })
      });

      if (!usuarioRes.ok) {
        const error = await usuarioRes.json();
        console.error('Error al guardar usuario:', error);
        throw new Error('Error al guardar usuario');
      }

      alert('Empleado y usuario guardados correctamente.');
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error al guardar datos. Revisa la consola.');
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const cedulaValida = /^\d{10}$/.test(formData.cedula);
    if (!cedulaValida) {
      setCedulaError('La cédula debe tener exactamente 10 dígitos numéricos.');
      return;
    }

    setCedulaError('');
    guardarEmpleadoYUsuario();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-lg font-semibold">
            {empleado ? 'Editar Empleado' : 'Añadir Nuevo Empleado'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombres</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
            <div className="relative">
              <FiLayers className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
            <div className="relative">
              <FiBriefcase className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                maxLength={10}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-indigo-500 ${cedulaError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-indigo-500'
                  }`}
                required
              />
            </div>
            {cedulaError && <p className="text-sm text-red-600 mt-1">{cedulaError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? 'Guardando...' : empleado ? 'Guardar Cambios' : 'Añadir Empleado'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpleadoForm;
