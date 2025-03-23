import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import enero from '../../../src/recursos/enero.jpg';
import febrero from '../../../src/recursos/febrero.jpg';
import marzo from '../../../src/recursos/marzo.jpg';
import abril from '../../../src/recursos/abril.png';
import mayo from '../../../src/recursos/mayo.jpg';
import junio from '../../../src/recursos/junio.jpg';
import julio from '../../../src/recursos/julio.jpg';
import agosto from '../../../src/recursos/agosto.jpg';
import septiembre from '../../../src/recursos/septiembre.jpg';
import octubre from '../../../src/recursos/octubre.png';
import noviembre from '../../../src/recursos/noviembre.jpg';
import diciembre from '../../../src/recursos/diciembre.jpg';
import logo from '../../../src/recursos/logo.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  background-color: #eaeaea;
  min-height: 100vh;
  padding: 20px;
  position: relative;
`;

const Header = styled.h1`
  color: #222;
  margin-bottom: 10px;
  font-size: 2.5rem;
  font-weight: bold;
`;

const SubHeader = styled.h2`
  color: #555;
  margin-bottom: 30px;
  font-size: 1.8rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  background-color: #f7f9fc;
  color: #000;
  padding: 0;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px 12px 0 0;
`;

const CardContent = styled.div`
  padding: 15px;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
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
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const months = [
  { name: 'Enero', value: '2024-01', image: enero },
  { name: 'Febrero', value: '2024-02', image: febrero },
  { name: 'Marzo', value: '2024-03', image: marzo },
  { name: 'Abril', value: '2024-04', image: abril },
  { name: 'Mayo', value: '2024-05', image: mayo },
  { name: 'Junio', value: '2024-06', image: junio },
  { name: 'Julio', value: '2024-07', image: julio },
  { name: 'Agosto', value: '2024-08', image: agosto },
  { name: 'Septiembre', value: '2024-09', image: septiembre },
  { name: 'Octubre', value: '2024-10', image: octubre },
  { name: 'Noviembre', value: '2024-11', image: noviembre },
  { name: 'Diciembre', value: '2024-12', image: diciembre },
];

const HomePage = () => {
  return (
    <Container>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" style={{ width: '120px', height: 'auto' }} />
      </div>
      <Header>Sistema de control de actividades</Header>
      <SubHeader>Seleccione un mes</SubHeader>
      <CardGrid>
        {months.map((month) => (
          <StyledLink key={month.value} to={`/actividades/${month.value}`}>
            <Card>
              <CardImage src={month.image} alt={month.name} />
              <CardContent>{month.name}</CardContent>
            </Card>
          </StyledLink>
        ))}
      </CardGrid>
      <ButtonContainer>
        <Link to="/opciones">
          <Button>Opciones</Button>
        </Link>
        <Link to="/trabajo">
          <Button>Trabajo</Button>
        </Link>
        <Link to="/facturacion">
          <Button>Facturación</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default HomePage;
