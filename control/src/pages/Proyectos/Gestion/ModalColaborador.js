import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

const ModalColaborador = ({
  nuevoColaborador,
  handleColaboradorChange,
  agregarColaborador,
  setMostrarModalColab
}) => {
  const [rolesDisponibles, setRolesDisponibles] = useState([]);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`
      };

      try {
        // Cargar roles
    
        // Cargar empleados
        const empleadosRes = await fetch(`${supabaseUrl}/rest/v1/empleados?select=id,nombres,apellidos,email`, { headers });
        if (!empleadosRes.ok) throw new Error('Error al obtener empleados');
        const empleadosData = await empleadosRes.json();
        setEmpleados(empleadosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    fetchData();
  }, []);

  // Manejar selección de empleado
  const handleEmpleadoSelect = (e) => {
    const selectedId = e.target.value;
    const empleado = empleados.find(emp => emp.id === selectedId);

    handleColaboradorChange({
      target: {
        name: 'empleado_id',
        value: selectedId,
      },
    });

    // Opcional: cargar info del empleado al colaborador
    if (empleado) {
      handleColaboradorChange({ target: { name: 'nombre', value: empleado.nombres } });
      handleColaboradorChange({ target: { name: 'apellido', value: empleado.apellidos || '' } });
      handleColaboradorChange({ target: { name: 'email', value: empleado.email } });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Agregar Colaborador</h3>
            <button
              onClick={() => setMostrarModalColab(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Empleado*</label>
              <select
                name="empleado_id"
                value={nuevoColaborador.empleado_id || ''}
                onChange={handleEmpleadoSelect}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccionar empleado</option>
                {empleados.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombres} {emp.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol*</label>
              <select
                name="rol"
                value={nuevoColaborador.rol || ''}
                onChange={handleColaboradorChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Seleccionar rol</option>
                {rolesDisponibles.map((rol) => (
                  <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setMostrarModalColab(false)}
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={agregarColaborador}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalColaborador;
