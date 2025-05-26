const ProyectoHeader = ({ proyecto }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{proyecto.nombre}</h1>
      <p className="text-gray-600 mt-2">{proyecto.descripcion}</p>
    </div>
  );
};

export default ProyectoHeader;