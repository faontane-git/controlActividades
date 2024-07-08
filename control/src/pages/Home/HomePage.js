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
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 10px; /* Ajusta el margen si es necesario */
`;

const SubHeader = styled.h2`
  color: #666;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1000px;
`;

const Card = styled.div`
  background-color: #007bff;
  color: white;
  padding: 0;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px; /* Ajusta el tamaño de la imagen */
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const CardContent = styled.div`
  padding: 10px;
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
        <img src={logo} alt="Logo" className="logo" style={{ width: '100px', height: 'auto' }} />
      </div>
      <Header>Bienvenido</Header>
      <SubHeader>Seleccione un mes</SubHeader>
      <CardGrid>
        {months.map((month) => (
          <Link key={month.value} to={`/actividades/${month.value}`}>
            <Card>
              <CardContent>
                {month.name}
              </CardContent>
              <CardImage src={month.image} alt={month.name} />
            </Card>
          </Link>
        ))}

      </CardGrid>
    </Container>
  );
};

export default HomePage;