import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    alert(`Iniciando sesión con: ${username}`);
    // Aquí agregarías la lógica de autenticación.
  };

  return (
    <LoginContainer>
      <LoginForm>
        <Title>Iniciar Sesión</Title>
        <Input 
          type="text" 
          placeholder="Usuario" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Input 
          type="password" 
          placeholder="Contraseña" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <LoginButton onClick={handleLogin}>Iniciar Sesión</LoginButton>
        <ForgotPassword>¿Olvidaste tu contraseña?</ForgotPassword>
      </LoginForm>
    </LoginContainer>
  );
};

// Estilos con styled-components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
`;

const LoginForm = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(135deg, #5b0ea6, #1e63d4);
  }
`;

const ForgotPassword = styled.p`
  margin-top: 20px;
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  text-decoration: underline;
`;

export default LoginPage;
