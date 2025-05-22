import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaSave, FaCalendarAlt, FaAlignLeft } from 'react-icons/fa';
import NavBar from '../../NavBar/Navbar';

// Estilos del contenedor principal
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: 'Roboto', sans-serif;
  padding-top: 80px; /* Espacio para el NavBar */
`;

const NavBarContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const ContentContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1f2937;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #e5e7eb;
  color: #4b5563;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d1d5db;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  transition: border-color 0.3s;

  &:focus-within {
    border-color: #3b82f6;
    background-color: white;
  }
`;

const InputIcon = styled.span`
  color: #9ca3af;
  margin-right: 0.5rem;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  padding: 0.5rem 0;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1rem;
  font-size: 1rem;
  min-height: 150px;
  background-color: #f9fafb;
  transition: border-color 0.3s;
  resize: vertical;

  &:focus {
    border-color: #3b82f6;
    background-color: white;
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }

  svg {
    margin-right: 0.5rem;
  }
`;


const NewProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    cliente: '',
    presupuesto: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre del proyecto es requerido';
      valid = false;
    }
    if (!formData.fechaInicio) {
      newErrors.fechaInicio = 'La fecha de inicio es requerida';
      valid = false;
    }
    if (!formData.fechaFin) {
      newErrors.fechaFin = 'La fecha de fin es requerida';
      valid = false;
    } else if (formData.fechaInicio && formData.fechaFin < formData.fechaInicio) {
      newErrors.fechaFin = 'La fecha de fin no puede ser anterior a la de inicio';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    const proyecto = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      fechainicio: formData.fechaInicio,
      fechafin: formData.fechaFin,
      estado: 'Iniciado',  
      progreso: 0,  
      fecha_creacion: new Date().toISOString(),
      actualizado_en: new Date().toISOString()
    };

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/proyectos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=representation'
        },
        body: JSON.stringify(proyecto)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Proyecto guardado:', data);
        navigate('/proyectos');
      } else {
        console.error('❌ Error al guardar:', data);
      }
    } catch (err) {
      console.error('❌ Error en el fetch:', err);
    }
  };


  return (
    <Container>
      <NavBarContainer><NavBar /></NavBarContainer>
      <ContentContainer>
        <Header>
          <Title>Crear Nuevo Proyecto</Title>
          <BackButton onClick={() => navigate('/proyectos')}><FaArrowLeft /> Volver</BackButton>
        </Header>

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Nombre del Proyecto *</Label>
              <InputContainer>
                <InputIcon><FaAlignLeft /></InputIcon>
                <Input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
              </InputContainer>
              {errors.nombre && <ErrorMessage>{errors.nombre}</ErrorMessage>}
            </FormGroup>

            <FormGroup>
              <Label>Descripción</Label>
              <TextArea name="descripcion" value={formData.descripcion} onChange={handleChange} />
            </FormGroup>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <FormGroup>
                <Label>Fecha de Inicio *</Label>
                <InputContainer>
                  <InputIcon><FaCalendarAlt /></InputIcon>
                  <Input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} />
                </InputContainer>
                {errors.fechaInicio && <ErrorMessage>{errors.fechaInicio}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>Fecha de Fin *</Label>
                <InputContainer>
                  <InputIcon><FaCalendarAlt /></InputIcon>
                  <Input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} />
                </InputContainer>
                {errors.fechaFin && <ErrorMessage>{errors.fechaFin}</ErrorMessage>}
              </FormGroup>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <FormGroup>
                <Label>Cliente</Label>
                <InputContainer>
                  <Input type="text" name="cliente" value={formData.cliente} onChange={handleChange} />
                </InputContainer>
              </FormGroup>
              <FormGroup>
                <Label>Presupuesto</Label>
                <InputContainer>
                  <Input type="number" name="presupuesto" min="0" step="0.01" value={formData.presupuesto} onChange={handleChange} />
                </InputContainer>
              </FormGroup>
            </div>

            <FormGroup style={{ marginTop: '2rem' }}>
              <SubmitButton type="submit"><FaSave /> Guardar Proyecto</SubmitButton>
            </FormGroup>
          </form>
        </FormContainer>
      </ContentContainer>
    </Container>
  );
};

export default NewProject;
