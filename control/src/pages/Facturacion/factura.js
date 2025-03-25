import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiFileText, FiPlus, FiTrash2, FiUser, FiDollarSign, FiPercent, FiDownload, FiMapPin, FiCreditCard, FiMail, FiPhone, FiArrowLeft } from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logoEmpresa from '../../recursos/logo.png';
import NavBar from '../NavBar/Navbar';

const GenerarFactura = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cliente: {
      nombre: '',
      identificacion: '',
      direccion: '',
      telefono: '',
      email: '',
      tipoIdentificacion: 'RUC'
    },
    productos: [],
    iva: 12,
    numeroFactura: Math.floor(Math.random() * 10000) + 1000,
    fecha: new Date().toISOString().split('T')[0],
    formaPago: 'Efectivo',
    observaciones: ''
  });

  const [productoActual, setProductoActual] = useState({
    descripcion: '', 
    cantidad: '', 
    precio: '' 
  });

  const facturaRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name in formData.cliente) {
      setFormData(prev => ({ 
        ...prev, 
        cliente: { ...prev.cliente, [name]: value } 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual(prev => ({ ...prev, [name]: value }));
  };

  const agregarProducto = () => {
    if (!productoActual.descripcion || !productoActual.cantidad || !productoActual.precio) return;
    
    setFormData(prev => ({
      ...prev,
      productos: [...prev.productos, {
        ...productoActual,
        cantidad: parseFloat(productoActual.cantidad),
        precio: parseFloat(productoActual.precio)
      }]
    }));
    setProductoActual({ descripcion: '', cantidad: '', precio: '' });
  };

  const eliminarProducto = (index) => {
    setFormData(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index)
    }));
  };

  const calcularTotal = () => {
    return formData.productos.reduce((total, p) => total + (p.cantidad * p.precio), 0);
  };

  const calcularIVA = () => {
    return (calcularTotal() * (formData.iva / 100)).toFixed(2);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const generarPDF = () => {
    const input = facturaRef.current;
    
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`factura_${formData.numeroFactura}.pdf`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        {/* Fila superior con botón Atrás */}
        <div className="max-w-6xl mx-auto mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
          >
            <FiArrowLeft />
            <span>Atrás</span>
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Encabezado centrado */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Generar Factura</h1>
            <p className="text-gray-600 mt-2">Complete los datos para generar una nueva factura</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Formulario */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiUser className="text-blue-500" />
                Datos del Cliente
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre/Razón Social</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.cliente.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre completo o razón social"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Identificación</label>
                    <select
                      name="tipoIdentificacion"
                      value={formData.cliente.tipoIdentificacion}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="RUC">RUC</option>
                      <option value="Cédula">Cédula</option>
                      <option value="Pasaporte">Pasaporte</option>
                      <option value="DNI">DNI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número de Identificación</label>
                    <input
                      type="text"
                      name="identificacion"
                      value={formData.cliente.identificacion}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Número de identificación"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="direccion"
                      value={formData.cliente.direccion}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Dirección completa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.cliente.telefono}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Número de teléfono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.cliente.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Correo electrónico"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IVA (%)</label>
                    <div className="relative">
                      <FiPercent className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="number"
                        name="iva"
                        value={formData.iva}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pago</label>
                    <select
                      name="formaPago"
                      value={formData.formaPago}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Tarjeta">Tarjeta de Crédito/Débito</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                  <textarea
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Notas adicionales"
                    rows="2"
                  />
                </div>
              </div>

              <h3 className="text-lg font-medium mt-8 mb-4 flex items-center gap-2">
                <FiPlus className="text-blue-500" />
                Agregar Producto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    value={productoActual.descripcion}
                    onChange={handleProductoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nombre del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    name="cantidad"
                    value={productoActual.cantidad}
                    onChange={handleProductoChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="precio"
                      value={productoActual.precio}
                      onChange={handleProductoChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={agregarProducto}
                    disabled={!productoActual.descripcion || !productoActual.cantidad || !productoActual.precio}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    Agregar Producto
                  </button>
                </div>
              </div>
            </div>

            {/* Vista previa de factura */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FiFileText className="text-blue-500" />
                  Vista Previa de Factura
                </h2>
                {formData.productos.length > 0 && (
                  <button 
                    onClick={generarPDF}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <FiDownload />
                    <span>Generar PDF</span>
                  </button>
                )}
              </div>

              <div ref={facturaRef} className="p-6 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <div className="w-32 h-32">
                    <img 
                      src={logoEmpresa} 
                      alt="Logo de la empresa" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-right">
                    <h1 className="text-2xl font-bold text-gray-900">FACTURA #{formData.numeroFactura}</h1>
                    <p className="text-gray-600">Fecha: {formData.fecha}</p>
                    <p className="text-gray-600">Forma de pago: {formData.formaPago}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div>
                    <h3 className="font-semibold text-gray-700">Emitida por:</h3>
                    <p>Mi Empresa S.A.</p>
                    <p>RUC: 12345678901</p>
                    <p>Dirección: Av. Principal 123</p>
                    <p>Teléfono: (01) 2345678</p>
                    <p>Email: contacto@miempresa.com</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Cliente:</h3>
                    <p>{formData.cliente.nombre || 'Nombre del cliente'}</p>
                    <p>{formData.cliente.tipoIdentificacion}: {formData.cliente.identificacion || 'N/A'}</p>
                    <p>Dirección: {formData.cliente.direccion || 'N/A'}</p>
                    <p>Teléfono: {formData.cliente.telefono || 'N/A'}</p>
                    <p>Email: {formData.cliente.email || 'N/A'}</p>
                  </div>
                </div>

                {formData.productos.length > 0 ? (
                  <div className="mb-8">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-3 text-left border-b border-gray-300">Descripción</th>
                          <th className="p-3 text-left border-b border-gray-300">Cantidad</th>
                          <th className="p-3 text-left border-b border-gray-300">P. Unitario</th>
                          <th className="p-3 text-left border-b border-gray-300">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.productos.map((producto, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="p-3">{producto.descripcion}</td>
                            <td className="p-3">{producto.cantidad}</td>
                            <td className="p-3">${producto.precio.toFixed(2)}</td>
                            <td className="p-3">${(producto.cantidad * producto.precio).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" className="p-3 text-right font-semibold">Subtotal:</td>
                          <td className="p-3 font-semibold">${calcularTotal().toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="p-3 text-right font-semibold">IVA ({formData.iva}%):</td>
                          <td className="p-3 font-semibold">${calcularIVA()}</td>
                        </tr>
                        <tr className="bg-gray-100">
                          <td colSpan="3" className="p-3 text-right font-bold">TOTAL:</td>
                          <td className="p-3 font-bold">${(parseFloat(calcularTotal()) + parseFloat(calcularIVA())).toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No hay productos agregados</p>
                  </div>
                )}

                {formData.observaciones && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-1">Observaciones:</h4>
                    <p className="text-sm text-gray-600">{formData.observaciones}</p>
                  </div>
                )}

                <div className="mt-8 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Gracias por su preferencia</p>
                  <p className="text-sm text-gray-600">Condiciones: Pago al contado</p>
                  <p className="text-sm text-gray-600 mt-4">
                    <strong>Nota:</strong> Esta factura es válida como comprobante de venta según lo establecido en la normativa vigente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GenerarFactura;