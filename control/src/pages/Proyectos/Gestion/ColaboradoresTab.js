import { useState } from 'react';
import { FiUsers, FiPlus, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import ModalColaborador from './ModalColaborador';

const ColaboradoresTab = ({ colaboradores, setProyecto, proyecto }) => {
  const [mostrarModalColab, setMostrarModalColab] = useState(false);
  const [nuevoColaborador, setNuevoColaborador] = useState({
    empleado_id: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: ''
  });

  const handleColaboradorChange = (e) => {
    const { name, value } = e.target;
    setNuevoColaborador(prev => ({ ...prev, [name]: value }));
  };

  const agregarColaborador = async () => {
    if (!nuevoColaborador.empleado_id) {
      Swal.fire({
        title: 'Empleado requerido',
        text: 'Debes seleccionar un empleado',
        icon: 'warning',
        confirmButtonColor: '#4f46e5'
      });
      return;
    }

    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json'
      };

      const body = JSON.stringify({
        proyecto_id: proyecto.id,
        empleado_id: nuevoColaborador.empleado_id,
        asignado_en: new Date().toISOString()
      });

      const res = await fetch(`${supabaseUrl}/rest/v1/proyecto_empleados`, {
        method: 'POST',
        headers,
        body
      });

      if (!res.ok) throw new Error('Error al guardar colaborador');

      const nuevo = {
        id: nuevoColaborador.empleado_id,
        nombre: nuevoColaborador.nombre,
        apellido: nuevoColaborador.apellido,
        email: nuevoColaborador.email,
        rol: nuevoColaborador.rol,
        avatar: `${nuevoColaborador.nombre[0]}${nuevoColaborador.apellido[0]}`,
        horasAsignadas: 0
      };

      setProyecto(prev => ({
        ...prev,
        colaboradores: [...prev.colaboradores, nuevo]
      }));

      setNuevoColaborador({ empleado_id: '', nombre: '', apellido: '', email: '', rol: '' });
      setMostrarModalColab(false);

      Swal.fire({
        title: '¡Agregado!',
        text: 'Colaborador añadido correctamente',
        icon: 'success',
        confirmButtonColor: '#4f46e5'
      });
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el colaborador', 'error');
    }
  };

  const eliminarColaborador = async (id) => {
    Swal.fire({
      title: '¿Eliminar colaborador?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
          const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  
          const headers = {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          };
  
          // Eliminar de Supabase
          const response = await fetch(`${supabaseUrl}/rest/v1/proyecto_empleados?proyecto_id=eq.${proyecto.id}&empleado_id=eq.${id}`, {
            method: 'DELETE',
            headers,
          });
  
          if (!response.ok) throw new Error('Error al eliminar colaborador en Supabase');
  
          // Actualizar estado local
          setProyecto(prev => ({
            ...prev,
            colaboradores: prev.colaboradores.filter(c => c.id !== id)
          }));
  
          Swal.fire({
            title: '¡Eliminado!',
            text: 'Colaborador eliminado correctamente',
            icon: 'success',
            confirmButtonColor: '#4f46e5'
          });
        } catch (error) {
          console.error("Error eliminando colaborador:", error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar el colaborador',
            icon: 'error',
            confirmButtonColor: '#4f46e5'
          });
        }
      }
    });
  };
  

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiUsers className="mr-2" /> Equipo de Trabajo
        </h2>
        <button
          onClick={() => setMostrarModalColab(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <FiPlus className="mr-2" /> Agregar
        </button>
      </div>

      {mostrarModalColab && (
        <ModalColaborador
          nuevoColaborador={nuevoColaborador}
          handleColaboradorChange={handleColaboradorChange}
          agregarColaborador={agregarColaborador}
          setMostrarModalColab={setMostrarModalColab}
        />
      )}

      {colaboradores.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {colaboradores.map(colaborador => (
            <div key={colaborador.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 group relative">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                {colaborador.nombre.charAt(0)}{colaborador.apellido.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {colaborador.nombre} {colaborador.apellido}
                </p>
                <p className="text-xs text-gray-500 truncate">{colaborador.email}</p>
                <p className="text-xs text-gray-500">{colaborador.rol}</p>
              </div>
              <button
                onClick={() => eliminarColaborador(colaborador.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                title="Eliminar colaborador"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay colaboradores registrados</p>
          <button
            onClick={() => setMostrarModalColab(true)}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center mx-auto"
          >
            <FiPlus className="mr-2" /> Agregar colaborador
          </button>
        </div>
      )}
    </div>
  );
};

export default ColaboradoresTab;
