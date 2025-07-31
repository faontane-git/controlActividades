import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiSearch } from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';
import ProyectoHeader from './Gestion/ProyectoHeader';
import TabsNavigation from './Gestion/TabsNavigation';
import ActividadesTab from './ActividadesTab';
import NovedadesTab from './Gestion/NovedadesTab';
import ColaboradoresTab from './Gestion/ColaboradoresTab';

const DetalleProyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('actividades');
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
 

useEffect(() => {
  const fetchProyecto = async () => {
    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      };

      // Obtener proyecto
      const proyectoRes = await fetch(`${supabaseUrl}/rest/v1/proyectos?id=eq.${id}&select=*`, { headers });
      const proyectoData = await proyectoRes.json();
      const proyecto = proyectoData[0];

      // Obtener colaboradores
      const colaboradoresRes = await fetch(`${supabaseUrl}/rest/v1/proyecto_empleados?proyecto_id=eq.${id}&select=empleado_id(id,nombres,apellidos,email)`, { headers });
      const colaboradoresData = await colaboradoresRes.json();

      const colaboradores = colaboradoresData.map((item) => ({
        id: item.empleado_id.id,
        nombre: item.empleado_id.nombres,
        apellido: item.empleado_id.apellidos,
        email: item.empleado_id.email,
        rol: '', // lo puedes hacer editable si lo agregas al modelo
        avatar: `${item.empleado_id.nombres[0] ?? ''}${item.empleado_id.apellidos?.[0] ?? ''}`,
        horasAsignadas: 0,
      }));

      // Obtener actividades
      const actividadesRes = await fetch(`${supabaseUrl}/rest/v1/actividades?proyecto_id=eq.${id}&select=*`, { headers });
      const actividadesData = await actividadesRes.json();

      const actividades = actividadesData.map((a) => ({
        id: a.id,
        titulo: a.nombre,
        descripcion: a.descripcion,
        estado: "pendiente", // puedes ajustar si hay campo estado
        fecha_inicio: a.fecha_inicio,
        fecha_fin: a.fecha_fin,
        responsable: '', // puedes completar si agregas asignación
        prioridad: 'media', // o lógica según condiciones
      }));

      // Obtener novedades
      const novedadesRes = await fetch(`${supabaseUrl}/rest/v1/novedades?proyecto_id=eq.${id}&select=*`, { headers });
      const novedadesData = await novedadesRes.json();

      const novedades = novedadesData.map((n) => ({
        id: n.id,
        titulo: n.tipo,
        tipo: n.tipo,
        fecha: n.fecha,
        descripcion: n.descripcion,
        criticidad: 'media', // puedes ajustar si agregas campo
      }));

      // Setear todo el proyecto
      setProyecto({
        ...proyecto,
        colaboradores,
        actividades,
        novedades,
      });

    } catch (error) {
      console.error("Error cargando datos del proyecto", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProyecto();
}, [id]);


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-indigo-700 font-medium">Cargando proyecto...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <NavBar />

      <div className="pt-24 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pb-8 space-y-6">
        {/* Header con botón de volver */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Volver a proyectos</span>
          </button>

        </div>

        {/* Encabezado del proyecto */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{proyecto.nombre}</h1>
          <p className="text-gray-600 mt-2">{proyecto.descripcion}</p>
          
          {/* Versión responsive para móviles */}
          <div className="sm:hidden mt-3">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <span className="font-medium">Inicio:</span>
                <span>{proyecto.fechaInicio}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="font-medium">Fin:</span>
                <span>{proyecto.fechaFinEstimada}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Navegación por pestañas */}
        <TabsNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          proyecto={proyecto}
        />

        {/* Contenido de las pestañas */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
          {activeTab === 'actividades' && (
            <ActividadesTab
              actividades={proyecto.actividades}
              searchTerm={searchTerm}
            />
          )}
          {activeTab === 'novedades' && (
            <NovedadesTab
              novedades={proyecto.novedades}
              searchTerm={searchTerm}
            />
          )}
          {activeTab === 'colaboradores' && (
            <ColaboradoresTab
              colaboradores={proyecto.colaboradores}
              setProyecto={setProyecto}
              proyecto={proyecto}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleProyecto;