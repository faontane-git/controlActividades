import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiDownload, FiArrowLeft, FiEdit, FiCheck } from 'react-icons/fi';
import logo from '../../recursos/logo.png'; // Ajusta la ruta según tu estructura

const CertificadosPage = () => {
  const navigate = useNavigate();
  const certificateRef = useRef();
  const [editMode, setEditMode] = useState(false);
  const [certificateData, setCertificateData] = useState({
    nombre: 'Diego Artiaga',
    curso: 'PHP',
    fecha: '15 de Marzo, 2025',
    horas: '120',
    codigo: 'CERT-2025-00542',
    instructor: 'Carlos Martínez'
  });

  const handleGeneratePdf = async () => {
    try {
      // Importación dinámica
      const { default: jsPDF } = await import('jspdf');
      const html2canvas = await import('html2canvas');
      
      const input = certificateRef.current;
      
      html2canvas.default(input, {
        scale: 2,
        logging: false,
        useCORS: true,
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        // Usar jsPDF directamente sin .default
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 0;
        
        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Certificado_${certificateData.curso.replace(/\s+/g, '_')}_${certificateData.nombre.replace(/\s+/g, '_')}.pdf`);
      });
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Ocurrió un error al generar el PDF');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" /> Volver
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center px-4 py-2 rounded-lg ${editMode ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {editMode ? <FiCheck className="mr-2" /> : <FiEdit className="mr-2" />}
              {editMode ? 'Guardar' : 'Editar'}
            </button>
            
            <button
              onClick={handleGeneratePdf}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <FiDownload className="mr-2" /> Exportar PDF
            </button>
          </div>
        </div>

        {/* Certificado - Contenido principal */}
        <div 
          ref={certificateRef} 
          className="w-full bg-white shadow-lg overflow-hidden"
          style={{ aspectRatio: '1.414' }}
        >
          <div className="relative h-full w-full border-8 border-yellow-400 p-8">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-blue-100 to-yellow-100"></div>
            
            {/* Logo de la institución */}
            <div className="absolute top-8 left-8">
              <img src={logo} alt="Logo" className="h-16 w-auto" />
            </div>
            
            
            
            {/* Contenido del certificado */}
            <div className="relative h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-2">CERTIFICADO</h1>
              <p className="text-lg mb-12">Se otorga el presente certificado a:</p>
              
              {editMode ? (
                <input
                  type="text"
                  name="nombre"
                  value={certificateData.nombre}
                  onChange={handleInputChange}
                  className="text-3xl md:text-4xl font-bold text-center border-b-2 border-blue-300 mb-12 w-full max-w-2xl bg-transparent"
                />
              ) : (
                <h2 className="text-3xl md:text-4xl font-bold mb-12">{certificateData.nombre}</h2>
              )}
              
              <p className="text-lg mb-6">Por haber completado satisfactoriamente el curso de</p>
              
              {editMode ? (
                <input
                  type="text"
                  name="curso"
                  value={certificateData.curso}
                  onChange={handleInputChange}
                  className="text-2xl md:text-3xl font-bold text-center border-b-2 border-blue-300 mb-6 w-full max-w-2xl bg-transparent"
                />
              ) : (
                <h3 className="text-2xl md:text-3xl font-bold mb-6">{certificateData.curso}</h3>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Duración</p>
                  {editMode ? (
                    <input
                      type="text"
                      name="horas"
                      value={certificateData.horas}
                      onChange={handleInputChange}
                      className="text-center bg-transparent border-b border-blue-300 w-full"
                    />
                  ) : (
                    <p>{certificateData.horas} horas</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Fecha</p>
                  {editMode ? (
                    <input
                      type="text"
                      name="fecha"
                      value={certificateData.fecha}
                      onChange={handleInputChange}
                      className="text-center bg-transparent border-b border-blue-300 w-full"
                    />
                  ) : (
                    <p>{certificateData.fecha}</p>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold">Código</p>
                  {editMode ? (
                    <input
                      type="text"
                      name="codigo"
                      value={certificateData.codigo}
                      onChange={handleInputChange}
                      className="text-center bg-transparent border-b border-blue-300 w-full"
                    />
                  ) : (
                    <p>{certificateData.codigo}</p>
                  )}
                </div>
              </div>
              
              {/* Sección de firmas */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
                <div className="flex flex-col items-center">
                  <div className="border-t-2 border-gray-400 w-32 mb-2"></div>
                  <p>Instructor</p>
                  {editMode ? (
                    <input
                      type="text"
                      name="instructor"
                      value={certificateData.instructor}
                      onChange={handleInputChange}
                      className="font-semibold text-center bg-transparent border-b border-blue-300 w-full"
                    />
                  ) : (
                    <p className="font-semibold">{certificateData.instructor}</p>
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <div className="border-t-2 border-gray-400 w-32 mb-2"></div>
                  <p>Gerente general</p>
                  <p className="font-semibold">Ing. Fabrizzio Ontaneda</p>
                </div>
              </div>
        
            </div>
          </div>
        </div>

        {/* Instrucciones */}
        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">Instrucciones:</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>Puedes editar los campos del certificado haciendo clic en el botón "Editar"</li>
            <li>Para exportar a PDF, haz clic en "Exportar PDF"</li>
            <li>El certificado se generará en formato A4 horizontal</li>
            <li>Verifica que todos los datos sean correctos antes de exportar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CertificadosPage;