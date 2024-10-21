import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 40px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #004085;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    transform: translateY(2px);
  }
`;

const FacturacionPage = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleNavigation = (route) => {
    navigate(route); // Navega a la ruta seleccionada
  };

  return (
    <Container>
      <Header>Menú de Facturación</Header>
      <ButtonGroup>
        <Button onClick={() => handleNavigation('/factura')}>Generar Factura</Button>
        <Button onClick={() => handleNavigation('/productos')}>Crear Productos</Button>
        <Button onClick={() => handleNavigation('/historico')}>Ver Histórico</Button>
      </ButtonGroup>
    </Container>
  );
};

export default FacturacionPage;
