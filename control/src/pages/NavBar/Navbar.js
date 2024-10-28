import React from 'react';
import styled from 'styled-components';
import logo from '../../../src/recursos/logo.png';

const NavBar = () => {
  return (
    <NavBarContainer>
      <LogoContainer>
        <Logo src={logo} alt="Logo" />
      </LogoContainer>
    </NavBarContainer>
  );
};

// Estilos con styled-components

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #f5f5f5; /* Cambiado a gris claro */
  color: #333; /* Texto oscuro si necesitas otros elementos en la barra */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
  height: auto;
`;

export default NavBar;
