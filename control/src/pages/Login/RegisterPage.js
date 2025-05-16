import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiBriefcase, FiChevronDown, FiArrowRight, FiChevronLeft } from 'react-icons/fi';
import logo from '../../recursos/logo.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    project: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const projects = [
    'Proyecto Alpha',
    'Proyecto Beta',
    'Proyecto Gamma',
    'Proyecto Delta'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nombre requerido';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Email inválido';
    if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.role) newErrors.role = 'Selecciona un rol';
    if (!formData.project) newErrors.project = 'Selecciona un proyecto';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Datos de registro:', formData);
      alert('Registro exitoso! Redirigiendo...');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Efecto de partículas de fondo */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s infinite`
            }}
          />
        ))}
      </div>

      {/* Tarjeta de Registro - Ahora más ancha */}
      <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl border border-white/20">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
          aria-label="Volver"
        >
          <FiChevronLeft className="text-2xl" />
        </button>

        <div className="mb-8 text-center">
          <img 
            src={logo}
            alt="Logo FSoftSolutions"
            className="w-32 mx-auto mb-6"
          />
          <h2 className="text-3xl font-bold text-white mb-2">Crear cuenta</h2>
          <p className="text-white/80">Completa el formulario para registrarte</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Primera fila horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Columna izquierda */}
            <div className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="block text-white/80 text-sm mb-2">Nombre completo</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.name ? 'border-red-400' : 'border-white/20'} rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="Tu nombre completo"
                  />
                </div>
                {errors.name && <p className="mt-1 text-red-400 text-xs">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/80 text-sm mb-2">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all`}
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-red-400 text-xs">{errors.email}</p>}
              </div>
            </div>

            {/* Columna derecha */}
            <div className="space-y-5">
              {/* Rol */}
              <div>
                <label className="block text-white/80 text-sm mb-2">Rol</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-10 py-3 appearance-none bg-white/5 border ${errors.role ? 'border-red-400' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:ring-2 transition-all`}
                  >
                    <option value="">Selecciona tu rol</option>
                    <option value="Líder">Líder</option>
                    <option value="Obrero">Obrero</option>
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                </div>
                {errors.role && <p className="mt-1 text-red-400 text-xs">{errors.role}</p>}
              </div>

              {/* Proyecto */}
              <div>
                <label className="block text-white/80 text-sm mb-2">Proyecto</label>
                <div className="relative">
                  <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-10 py-3 appearance-none bg-white/5 border ${errors.project ? 'border-red-400' : 'border-white/20'} rounded-lg text-white focus:outline-none focus:ring-2 transition-all`}
                  >
                    <option value="">Selecciona un proyecto</option>
                    {projects.map((project, index) => (
                      <option key={index} value={project}>{project}</option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                </div>
                {errors.project && <p className="mt-1 text-red-400 text-xs">{errors.project}</p>}
              </div>
            </div>
          </div>

          {/* Segunda fila horizontal (contraseñas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Contraseña */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Contraseña</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.password ? 'border-red-400' : 'border-white/20'} rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-red-400 text-xs">{errors.password}</p>}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-white/80 text-sm mb-2">Confirmar contraseña</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/5 border ${errors.confirmPassword ? 'border-red-400' : 'border-white/20'} rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 transition-all`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-red-400 text-xs">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Botón de Registro */}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full md:w-1/2 flex items-center justify-center space-x-2 bg-white text-indigo-900 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              <span>Registrarse</span>
              <FiArrowRight className="text-xl" />
            </button>

            {/* Enlace para volver a Login */}
            <div className="text-center text-sm pt-4">
              <span className="text-white/70">¿Ya tienes cuenta? </span>
              <button 
                onClick={() => navigate('/login')}
                className="text-white font-medium hover:underline transition-colors focus:outline-none"
              >
                Inicia sesión
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;