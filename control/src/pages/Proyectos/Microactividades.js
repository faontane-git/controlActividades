import React, { useState } from 'react';

const ESTADOS_MICROACTIVIDAD = {
    INICIADO: 'Iniciado',
    DESARROLLO: 'Desarrollo',
    FINALIZADO: 'Finalizado'
};

const Microactividades = ({
    actividadSeleccionada,
    onCerrarPanel,
    onCambiarEstadoMicroactividad,
    onAgregarMicroactividad
}) => {
    const [mostrarFormularioMicroactividad, setMostrarFormularioMicroactividad] = useState(false);
    const [nuevaMicroactividad, setNuevaMicroactividad] = useState({
        nombre: '',
        descripcion: '',
        estado: ESTADOS_MICROACTIVIDAD.INICIADO
    });
    const [microactividadArrastrada, setMicroactividadArrastrada] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAgregarMicroactividad(actividadSeleccionada.id, {
            nombre: nuevaMicroactividad.nombre,
            descripcion: nuevaMicroactividad.descripcion,
            estado: ESTADOS_MICROACTIVIDAD.INICIADO
        });
        setMostrarFormularioMicroactividad(false);
        setNuevaMicroactividad({
            nombre: '',
            descripcion: '',
            estado: ESTADOS_MICROACTIVIDAD.INICIADO
        });
    };

    const handleDragStart = (e, microactividad) => {
        setMicroactividadArrastrada(microactividad);
        e.dataTransfer.setData('microactividadId', microactividad.id.toString());
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, nuevoEstado) => {
        e.preventDefault();
        const microactividadId = e.dataTransfer.getData('microactividadId');
        const microactividad = actividadSeleccionada.microActividades.find(
            (m) => m.id.toString() === microactividadId
        );

        if (microactividad && microactividad.estado !== nuevoEstado) {
            onCambiarEstadoMicroactividad(
                actividadSeleccionada.id,
                microactividad.id,
                nuevoEstado
            );
        }

        setMicroactividadArrastrada(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Microactividades: {actividadSeleccionada.nombre}
                    </h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setMostrarFormularioMicroactividad(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        >
                            + Nueva Microactividad
                        </button>
                        <button
                            onClick={onCerrarPanel}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {mostrarFormularioMicroactividad && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-lg mb-3">Crear Nueva Microactividad</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={nuevaMicroactividad.nombre}
                                        onChange={(e) => setNuevaMicroactividad({ ...nuevaMicroactividad, nombre: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={nuevaMicroactividad.descripcion}
                                        onChange={(e) => setNuevaMicroactividad({ ...nuevaMicroactividad, descripcion: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Horas estimadas</label>
                                    <input
                                        type="number"
                                        min="0"
                                        step="0.5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        value={nuevaMicroactividad.horas}
                                        onChange={(e) =>
                                            setNuevaMicroactividad({ ...nuevaMicroactividad, horas: e.target.value })
                                        }
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setMostrarFormularioMicroactividad(false)}
                                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                >
                                    Crear Microactividad
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tablero de microactividades */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Columna Iniciado */}
                    <div
                        className="bg-blue-50 p-4 rounded-lg min-h-[200px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, ESTADOS_MICROACTIVIDAD.INICIADO)}
                    >
                        <h3 className="font-semibold text-blue-800 mb-4 text-center">Iniciado</h3>
                        <div className="space-y-3">
                            {actividadSeleccionada.microActividades
                                .filter(micro => micro.estado === ESTADOS_MICROACTIVIDAD.INICIADO)
                                .sort((a, b) => b.id - a.id)
                                .map(micro => (
                                    <MicroactividadCard
                                        key={micro.id}
                                        microactividad={micro}
                                        onDragStart={handleDragStart}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Columna Desarrollo */}
                    <div
                        className="bg-yellow-50 p-4 rounded-lg min-h-[200px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, ESTADOS_MICROACTIVIDAD.DESARROLLO)}
                    >
                        <h3 className="font-semibold text-yellow-800 mb-4 text-center">Desarrollo</h3>
                        <div className="space-y-3">
                            {actividadSeleccionada.microActividades
                                .filter(micro => micro.estado === ESTADOS_MICROACTIVIDAD.DESARROLLO)
                                .map(micro => (
                                    <MicroactividadCard
                                        key={micro.id}
                                        microactividad={micro}
                                        onDragStart={handleDragStart}
                                    />
                                ))}
                        </div>
                    </div>

                    {/* Columna Finalizado */}
                    <div
                        className="bg-green-50 p-4 rounded-lg min-h-[200px]"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, ESTADOS_MICROACTIVIDAD.FINALIZADO)}
                    >
                        <h3 className="font-semibold text-green-800 mb-4 text-center">Finalizado</h3>
                        <div className="space-y-3">
                            {actividadSeleccionada.microActividades
                                .filter(micro => micro.estado === ESTADOS_MICROACTIVIDAD.FINALIZADO)
                                .map(micro => (
                                    <MicroactividadCard
                                        key={micro.id}
                                        microactividad={micro}
                                        onDragStart={handleDragStart}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MicroactividadCard = ({ microactividad, onDragStart }) => {
    return (
        <div
            className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-move"
            draggable
            onDragStart={(e) => onDragStart(e, microactividad)}
        >
            <h4 className="font-medium text-gray-800">{microactividad.nombre}</h4>
            <p className="text-sm text-gray-600 mb-2">{microactividad.descripcion}</p>
            <div className="flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {microactividad.horas ?? 0} horas
                </span>
                <span className="text-xs text-gray-500 italic">
                    {microactividad.estado}
                </span>
            </div>
        </div>
    );
};

export default Microactividades;
