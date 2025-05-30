import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    FiCopy, FiPlus, FiTrash2, FiEdit2, FiChevronDown,
    FiSearch, FiSave, FiX, FiArrowLeft
} from 'react-icons/fi';
import NavBar from '../NavBar/Navbar';

const PlantillasCotizacion = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [plantillas, setPlantillas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentPlantilla, setCurrentPlantilla] = useState({
        id: '',
        nombre: '',
        descripcion: '',
        items: []
    });
    const [productos] = useState([
        { id: 1, codigo: 'SER-001', nombre: 'Desarrollo Web Básico', precio: 1500 },
        { id: 2, codigo: 'SER-002', nombre: 'Diseño UI/UX', precio: 1200 },
        { id: 3, codigo: 'SER-003', nombre: 'Consultoría SEO', precio: 800 },
        { id: 4, codigo: 'HAR-001', nombre: 'Servidor HP ProLiant', precio: 2500 }
    ]);

    // Cargar plantillas al iniciar
    useEffect(() => {
        const loadPlantillas = () => {
            setTimeout(() => {
                const mockData = [
                    {
                        id: 1,
                        nombre: 'Paquete Desarrollo Web',
                        descripcion: 'Incluye desarrollo frontend y backend básico',
                        items: [
                            { productoId: 1, cantidad: 1, precioUnitario: 1500, descripcion: 'Desarrollo Web Básico' },
                            { productoId: 2, cantidad: 1, precioUnitario: 1200, descripcion: 'Diseño UI/UX' }
                        ]
                    },
                    {
                        id: 2,
                        nombre: 'Mantenimiento Mensual',
                        descripcion: 'Servicios de mantenimiento y soporte',
                        items: [
                            { productoId: 1, cantidad: 1, precioUnitario: 1500, descripcion: 'Desarrollo Web Básico' },
                            { productoId: 3, cantidad: 2, precioUnitario: 800, descripcion: 'Consultoría SEO' }
                        ]
                    }
                ];
                setPlantillas(mockData);
                setLoading(false);
            }, 800);
        };

        loadPlantillas();
    }, []);

    // Filtrar plantillas
    const filteredPlantillas = plantillas.filter(plantilla =>
        plantilla.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plantilla.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Usar plantilla para nueva cotización
    const usarPlantilla = (plantilla) => {
        navigate('/cotizar/nueva', {
            state: {
                plantilla,
                from: location.pathname
            }
        });
    };

    // Abrir modal para nueva/editar plantilla
    const openModal = (plantilla = null) => {
        if (plantilla) {
            setCurrentPlantilla(plantilla);
            setEditMode(true);
        } else {
            setCurrentPlantilla({
                id: '',
                nombre: '',
                descripcion: '',
                items: []
            });
            setEditMode(false);
        }
        setModalOpen(true);
    };

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentPlantilla(prev => ({ ...prev, [name]: value }));
    };

    // Manejar cambios en items
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...currentPlantilla.items];
        updatedItems[index][field] = field === 'cantidad' || field === 'precioUnitario' ? Number(value) : value;

        if (field === 'productoId') {
            const producto = productos.find(p => p.id === Number(value));
            if (producto) {
                updatedItems[index].descripcion = producto.nombre;
                updatedItems[index].precioUnitario = producto.precio;
            }
        }

        setCurrentPlantilla(prev => ({ ...prev, items: updatedItems }));
    };

    // Agregar nuevo item
    const addItem = () => {
        setCurrentPlantilla(prev => ({
            ...prev,
            items: [...prev.items, { productoId: '', cantidad: 1, precioUnitario: 0, descripcion: '' }]
        }));
    };

    // Eliminar item
    const removeItem = (index) => {
        setCurrentPlantilla(prev => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index)
        }));
    };

    // Guardar plantilla
    const savePlantilla = () => {
        if (editMode) {
            setPlantillas(prev =>
                prev.map(p => p.id === currentPlantilla.id ? currentPlantilla : p)
            );
        } else {
            const newPlantilla = {
                ...currentPlantilla,
                id: Date.now()
            };
            setPlantillas(prev => [...prev, newPlantilla]);
        }
        setModalOpen(false);
    };

    // Eliminar plantilla
    const deletePlantilla = (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta plantilla?')) {
            setPlantillas(prev => prev.filter(p => p.id !== id));
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-8">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => navigate('/cotizar')}
                        className="flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                        <FiArrowLeft className="mr-1" /> Volver
                    </button>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        <FiPlus className="mr-2" /> Nueva Plantilla
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Plantillas de Cotización</h1>

                    <div className="mb-6 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar plantillas..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {filteredPlantillas.length === 0 ? (
                        <div className="text-center py-12">
                            <FiCopy className="mx-auto text-4xl text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No hay plantillas</h3>
                            <p className="text-gray-500 mt-1">Crea tu primera plantilla para agilizar tus cotizaciones</p>
                            <button
                                onClick={() => openModal()}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                            >
                                <FiPlus className="inline mr-2" /> Crear Plantilla
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredPlantillas.map(plantilla => (
                                <div key={plantilla.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium text-lg text-gray-800">{plantilla.nombre}</h3>
                                            <p className="text-gray-600 mt-1">{plantilla.descripcion}</p>
                                            <div className="mt-2">
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                    {plantilla.items.length} {plantilla.items.length === 1 ? 'ítem' : 'ítems'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => usarPlantilla(plantilla)}
                                                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                                            >
                                                Usar
                                            </button>
                                            <button
                                                onClick={() => openModal(plantilla)}
                                                className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
                                                title="Editar"
                                            >
                                                <FiEdit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => deletePlantilla(plantilla.id)}
                                                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md"
                                                title="Eliminar"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal para editar/crear plantilla */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editMode ? 'Editar Plantilla' : 'Nueva Plantilla'}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-6 mb-8">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={currentPlantilla.nombre}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        rows="2"
                                        value={currentPlantilla.descripcion}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    ></textarea>
                                </div>
                            </div>

                            <div className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Ítems de la plantilla</h2>
                                    <button
                                        type="button"
                                        onClick={addItem}
                                        className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                                    >
                                        <FiPlus className="mr-1" /> Agregar ítem
                                    </button>
                                </div>

                                {currentPlantilla.items.length === 0 ? (
                                    <div className="text-center py-6 text-gray-500">
                                        No hay ítems agregados
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto/Servicio</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Unit.</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {currentPlantilla.items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <select
                                                                value={item.productoId}
                                                                onChange={(e) => handleItemChange(index, 'productoId', e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                required
                                                            >
                                                                <option value="">Seleccione</option>
                                                                {productos.map(producto => (
                                                                    <option key={producto.id} value={producto.id}>
                                                                        {producto.codigo} - {producto.nombre}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="text"
                                                                value={item.descripcion}
                                                                onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                required
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={item.cantidad}
                                                                onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
                                                                className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                required
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                                value={item.precioUnitario}
                                                                onChange={(e) => handleItemChange(index, 'precioUnitario', e.target.value)}
                                                                className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                required
                                                            />
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(index)}
                                                                className="text-red-600 hover:text-red-900"
                                                                title="Eliminar"
                                                            >
                                                                <FiTrash2 />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-4 border-t sticky bottom-0 bg-white">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={savePlantilla}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
                                disabled={!currentPlantilla.nombre || currentPlantilla.items.length === 0}
                            >
                                <FiSave className="mr-2" /> {editMode ? 'Actualizar' : 'Guardar'} Plantilla
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlantillasCotizacion;