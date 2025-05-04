import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';
import Actividades from './Actividades';
import Novedades from './Novedades';
import Microactividades from './Microactividades';

const DetalleProyecto = () => {
  // Estados posibles para microactividades
  const ESTADOS_MICROACTIVIDAD = {
    INICIADO: 'Iniciado',
    DESARROLLO: 'Desarrollo',
    FINALIZADO: 'Finalizado'
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actividades, setActividades] = useState([]); // O tu estado inicial
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [mostrarFormularioMicroactividad, setMostrarFormularioMicroactividad] = useState(false);
  const [nuevaMicroactividad, setNuevaMicroactividad] = useState({
    nombre: '',
    descripcion: '',
    estado: ESTADOS_MICROACTIVIDAD.INICIADO // Estado por defecto
  });
  // Datos mock (en un proyecto real sería una llamada API)
  useEffect(() => {
    const proyectos = [
      {
        id: 1,
        nombre: 'Sitio Web Corporativo',
        descripcion: 'Desarrollo del sitio web principal',
        actividades: [
          {
            id: 1,
            nombre: 'Diseño de interfaz',
            descripcion: 'Crear el diseño UI/UX del sitio',
            fechaInicio: '2023-01-10',
            fechaFin: '2023-01-20',
            horasEstimadas: 15,
            microActividades: [
              {
                id: 1,
                nombre: 'Reunión con cliente',
                descripcion: 'Definir requerimientos',
                horas: 2,
                estado: ESTADOS_MICROACTIVIDAD.FINALIZADO
              },
              {
                id: 2,
                nombre: 'Crear wireframes',
                descripcion: 'Diseñar flujo de navegación',
                horas: 5,
                estado: ESTADOS_MICROACTIVIDAD.DESARROLLO
              },
              {
                id: 3,
                nombre: 'Validar con equipo',
                descripcion: 'Revisión técnica del diseño',
                horas: 3,
                estado: ESTADOS_MICROACTIVIDAD.INICIADO
              }
            ]
          },
          {
            id: 2,
            nombre: 'Desarrollo frontend',
            descripcion: 'Implementación de componentes',
            fechaInicio: '2023-01-21',
            fechaFin: '2023-02-10',
            horasEstimadas: 40,
            microActividades: [
              {
                id: 4,
                nombre: 'Configurar proyecto',
                descripcion: 'Inicializar repositorio y dependencias',
                horas: 4,
                estado: ESTADOS_MICROACTIVIDAD.INICIADO
              }
            ]
          }
        ],
        novedades: [
          {
            id: 1,
            tipo: 'Error',
            descripcion: 'Problema con el login en dispositivos móviles',
            fecha: '2023-01-15',
            archivos: []
          }
        ]
      }
    ];

    const proyectoData = proyectos.find(p => p.id === parseInt(id));
    setProyecto(proyectoData);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (proyecto && actividadSeleccionada) {
      const nuevaActividad = proyecto.actividades.find(a => a.id === actividadSeleccionada.id);
      if (nuevaActividad) {
        setActividadSeleccionada(nuevaActividad); // 🔄 Actualiza el objeto seleccionado
      }
    }
  }, [proyecto, actividadSeleccionada]);



  const handleAddActividad = (nuevaActividad) => {
    setProyecto(prev => ({
      ...prev,
      actividades: [...prev.actividades, nuevaActividad]
    }));
  };

  const handleAddNovedad = (nuevaNovedad) => {
    setProyecto(prev => ({
      ...prev,
      novedades: [...prev.novedades, nuevaNovedad]
    }));
  };

  // Función para cambiar el estado de una microactividad
  const cambiarEstadoMicroactividad = (actividadId, microactividadId, nuevoEstado) => {
    setProyecto(prev => {
      const actividadesActualizadas = prev.actividades.map(actividad => {
        if (actividad.id === actividadId) {
          const microActividadesActualizadas = actividad.microActividades.map(micro => {
            if (micro.id === microactividadId) {
              return { ...micro, estado: nuevoEstado };
            }
            return micro;
          });
          return { ...actividad, microActividades: microActividadesActualizadas };
        }
        return actividad;
      });
      return { ...prev, actividades: actividadesActualizadas };
    });
  };

  // Función para seleccionar una actividad
  const seleccionarActividad = (actividad) => {
    setActividadSeleccionada(actividad);
  };

  // Función para cerrar el panel de microactividades
  const cerrarPanelMicroactividades = () => {
    setActividadSeleccionada(null);
  };

  const agregarMicroactividad = (actividadId, microactividad) => {
    setProyecto(prev => {
      const actividadesActualizadas = prev.actividades.map(actividad => {
        if (actividad.id === actividadId) {
          return {
            ...actividad,
            microActividades: [
              {
                id: Date.now(),
                nombre: microactividad.nombre,
                descripcion: microactividad.descripcion,
                estado: ESTADOS_MICROACTIVIDAD.INICIADO
              },
              ...(actividad.microActividades || [])
            ]
          };
        }
        return actividad;
      });

      return { ...prev, actividades: actividadesActualizadas };
    });

    setMostrarFormularioMicroactividad(false);
    setNuevaMicroactividad({
      nombre: '',
      descripcion: '',
      estado: ESTADOS_MICROACTIVIDAD.INICIADO
    });
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!proyecto) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md mx-auto mt-8">
        <strong>No encontrado: </strong>
        <span>El proyecto solicitado no existe.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="pt-24 px-4 md:px-12 max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a proyectos
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{proyecto.nombre}</h1>
          <p className="text-gray-600">{proyecto.descripcion}</p>
        </div>

        {/* Sección de Actividades */}
        <Actividades
          actividades={proyecto.actividades}
          onAddActividad={handleAddActividad}
          onSelectActividad={seleccionarActividad}
        />

        {/* Sección de Novedades */}
        <Novedades
          novedades={proyecto.novedades}
          onAddNovedad={handleAddNovedad}
        />

        {/* Panel de Microactividades (aparece cuando se selecciona una actividad) */}
        {actividadSeleccionada && (
          <Microactividades
            actividadSeleccionada={actividadSeleccionada}
            onCerrarPanel={cerrarPanelMicroactividades}
            onCambiarEstadoMicroactividad={cambiarEstadoMicroactividad}
            onAgregarMicroactividad={agregarMicroactividad}
          />
        )}

      </div>
    </div>
  );
};

export default DetalleProyecto;