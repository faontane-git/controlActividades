import React, { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiPhone, FiMail, FiUser } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';
import EmpleadoForm from './EmpleadoForm';

const Personal = () => {
  const [empleados, setEmpleados] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmpleado, setCurrentEmpleado] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/empleados?select=id,nombres,apellidos,cedula,email,telefono,usuario,usuario_id,creado_en`, {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener empleados');
        }

        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchEmpleados();
  }, []);

  const filteredEmpleados = empleados.filter(emp =>
    `${emp.nombres} ${emp.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setEmpleados(empleados.filter(emp => emp.id !== id));
  };

  const openEditModal = (empleado) => {
    setCurrentEmpleado(empleado);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <NavBar />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Administrar Personal</h1>
        <button
          onClick={() => { setCurrentEmpleado(null); setIsModalOpen(true); }}
          className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          <FiPlus className="mr-2" /> Añadir Empleado
        </button>
      </div>
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Creado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmpleados.map((empleado) => (
              <tr key={empleado.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{empleado.nombres}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{empleado.apellidos}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{empleado.usuario}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{empleado.cedula}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 flex items-center">
                    <FiMail className="mr-2" /> {empleado.email}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center mt-1">
                    <FiPhone className="mr-2" /> {empleado.telefono}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(empleado.creado_en).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => openEditModal(empleado)}
                      className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                      title="Editar"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(empleado.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Eliminar"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EmpleadoForm
          empleado={currentEmpleado}
          onClose={() => setIsModalOpen(false)}
          onSave={(empleadoActualizado) => {
            if (currentEmpleado) {
              setEmpleados(empleados.map(emp =>
                emp.id === currentEmpleado.id ? empleadoActualizado : emp
              ));
            } else {
              setEmpleados([...empleados, { ...empleadoActualizado, id: Date.now() }]);
            }
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Personal;
