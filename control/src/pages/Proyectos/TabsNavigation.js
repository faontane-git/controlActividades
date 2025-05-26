import { FiCalendar, FiAlertTriangle, FiUsers } from 'react-icons/fi';

const TabsNavigation = ({ activeTab, setActiveTab, proyecto }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        <button
          onClick={() => setActiveTab('actividades')}
          className={`${activeTab === 'actividades' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
        >
          <FiCalendar className="mr-2" /> Actividades
          <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {proyecto.actividades.length}
          </span>
        </button>
        
        <button
          onClick={() => setActiveTab('novedades')}
          className={`${activeTab === 'novedades' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
        >
          <FiAlertTriangle className="mr-2" /> Novedades
          <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {proyecto.novedades.length}
          </span>
        </button>
        
        <button
          onClick={() => setActiveTab('colaboradores')}
          className={`${activeTab === 'colaboradores' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
        >
          <FiUsers className="mr-2" /> Colaboradores
          <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {proyecto.colaboradores.length}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default TabsNavigation;