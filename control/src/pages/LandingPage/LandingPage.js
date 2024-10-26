import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Header>
        <Title>Sistema de Administración</Title>
        <Subtitle>Optimiza tus procesos con una interfaz intuitiva y poderosa.</Subtitle>
        <AccessButton onClick={() => navigate('/login')}>Iniciar Sesión</AccessButton>
      </Header>

      <FeaturesSection>
        <SectionTitle>Características Destacadas</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>Gestión de Usuarios</FeatureCard>
          <FeatureCard>Control de Inventario</FeatureCard>
          <FeatureCard>Reportes Personalizados</FeatureCard>
          <FeatureCard>Configuración de Permisos</FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <ScreenshotsSection>
        <SectionTitle>Explora la Interfaz</SectionTitle>
        <Screenshot src="https://via.placeholder.com/800x400" alt="Captura de pantalla de la interfaz" />
      </ScreenshotsSection>

      <Footer>
        <FooterText>¿Necesitas ayuda? Consulta nuestra <a href="#">documentación</a>.</FooterText>
      </Footer>
    </PageContainer>
  );
};

// Styled-components con diseño moderno y animaciones

const PageContainer = styled.div`
  font-family: 'Arial, sans-serif';
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  color: #333;
  background: linear-gradient(135deg, #f3f4f6, #ffffff);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Header = styled.header`
  text-align: center;
  padding: 40px 0;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  color: #fff;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #e0e0e0;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const FeaturesSection = styled.section`
  margin: 50px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const FeatureCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
  text-align: center;
  color: #4a4a4a;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ScreenshotsSection = styled.section`
  text-align: center;
  margin: 50px 0;
`;

const Screenshot = styled.img`
  width: 100%;
  max-width: 800px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
`;

const Footer = styled.footer`
  text-align: center;
  padding: 40px 0;
`;

const AccessButton = styled.button`
  padding: 14px 32px;
  font-size: 1.2rem;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin-top: 20px;

  &:hover {
    background: linear-gradient(135deg, #5b0ea6, #1e63d4);
    transform: translateY(-2px);
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 20px;

  a {
    color: #2575fc;
    text-decoration: none;
    transition: color 0.2s;
    
    &:hover {
      color: #1e63d4;
    }
  }
`;

export default LandingPage;
