import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/Navbar';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <NavBar />
      <Header>
        <Title>Página Principal</Title>
      </Header>
      <ButtonContainer>
        <ActionButton onClick={() => alert('Navegando a Opciones')}>Opciones</ActionButton>
        <ActionButton onClick={() => navigate('/trabajo')}>Trabajo</ActionButton>
        <ActionButton onClick={() => alert('Navegando a Facturación')}>Facturación</ActionButton>
        <ActionButton onClick={() => alert('Navegando a Actividades')}>Actividades</ActionButton>
      </ButtonContainer>
    </MainContainer>
  );
};

// Estilos de MainPage
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background: linear-gradient(135deg, #4f46e5, #7f83eb, #e0e7ff);
  color: #333;
  text-align: center;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 40px 0 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #ffffffcc;
  margin: 0;
  letter-spacing: 1px;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin-top: 40px;
`;

const ActionButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #4338ca, #2563eb);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  min-width: 150px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default MainPage;
