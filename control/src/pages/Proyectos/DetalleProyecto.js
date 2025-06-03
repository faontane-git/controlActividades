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

  // Datos de ejemplo
  useEffect(() => {
    setTimeout(() => {
      setProyecto({
        nombre: "Sistema de Gestión Documental",
        descripcion: "Implementación de solución para gestión electrónica de documentos con integración a sistemas legacy y firma digital avanzada.",
        estado: "en-progreso",
        fechaInicio: "2023-05-01",
        fechaFinEstimada: "2023-11-30",
        actividades: [
          {
            id: 1,
            titulo: "Análisis de requerimientos",
            estado: "completado",
            fecha_inicio: "2023-05-01",
            fecha_fin: "2023-05-10",
            responsable: "Ana Martínez",
            prioridad: "alta"
          },
          {
            id: 2,
            titulo: "Diseño de arquitectura",
            estado: "en-progreso",
            fecha_inicio: "2023-05-11",
            fecha_fin: "2023-06-15",
            responsable: "Carlos Rodríguez",
            prioridad: "media"
          }
        ],
        novedades: [
          {
            id: 1,
            titulo: "Retraso en entrega de servidores",
            tipo: "riesgo",
            fecha: "2023-05-15",
            descripcion: "El proveedor informó retraso de 3 días en la entrega de los servidores para el ambiente de pruebas",
            criticidad: "alta"
          },
          {
            id: 2,
            titulo: "Nuevo requerimiento de cliente",
            tipo: "cambio",
            fecha: "2023-05-18",
            descripcion: "El cliente solicitó integración con sistema de facturación electrónica",
            criticidad: "media"
          }
        ],
        colaboradores: [
          {
            id: 1,
            nombre: "Ana",
            apellido: "Martínez",
            email: "ana.martinez@empresa.com",
            rol: "Líder de proyecto",
            avatar: "AM",
            horasAsignadas: 40
          },
          {
            id: 2,
            nombre: "Carlos",
            apellido: "Rodríguez",
            email: "carlos@empresa.com",
            rol: "Desarrollador Frontend",
            avatar: "CR",
            horasAsignadas: 30
          }
        ]
      });
      setLoading(false);
    }, 1000);
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

          {/* Fechas y estado compacto */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="font-medium">Inicio:</span>
              <span>{proyecto.fechaInicio}</span>
            </span>
            
            <span className="hidden sm:inline-flex items-center gap-1">
              <span className="font-medium">Fin:</span>
              <span>{proyecto.fechaFinEstimada}</span>
            </span>
            
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              proyecto.estado === 'completado' 
                ? 'bg-green-100 text-green-800' 
                : proyecto.estado === 'en-progreso' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-yellow-100 text-yellow-800'
            }`}>
              {proyecto.estado === 'completado' 
                ? '✓ Completado' 
                : proyecto.estado === 'en-progreso' 
                  ? '⌛ En progreso' 
                  : '⏳ Pendiente'}
            </span>
          </div>
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
              searchTerm={searchTerm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleProyecto;