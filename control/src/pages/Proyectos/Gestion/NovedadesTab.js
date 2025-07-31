import { FiAlertTriangle, FiCheckCircle, FiInfo, FiPlus } from 'react-icons/fi';

const NovedadesTab = ({ novedades }) => {
  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'riesgo':
        return <FiAlertTriangle className="text-red-500" />;
      case 'logro':
        return <FiCheckCircle className="text-green-500" />;
      default:
        return <FiInfo className="text-blue-500" />;
    }
  };

  const handleAgregarNovedad = () => {
    // Aquí puedes abrir un modal o formulario
    console.log('Agregar Novedad');
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <FiAlertTriangle className="mr-2" /> Registro de Novedades
        </h2>
        <button
          onClick={handleAgregarNovedad}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
        >
          <FiPlus className="mr-2" /> Agregar Novedad
        </button>
      </div>

      {novedades.length > 0 ? (
        <div className="space-y-4">
          {novedades.map((novedad) => (
            <div
              key={novedad.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4 mt-1">{getTipoIcon(novedad.tipo)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{novedad.titulo}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(novedad.fecha).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-600">{novedad.descripcion}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay novedades registradas</p>
        </div>
      )}
    </div>
  );
};

export default NovedadesTab;
