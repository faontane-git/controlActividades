import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const VerHistorico = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    // Simula una carga de datos desde una base de datos o API
    const cargarHistorico = () => {
      const datosSimulados = [
        { id: 1, descripcion: 'Producto A', cantidad: 2, total: 50, fecha: '2024-10-01' },
        { id: 2, descripcion: 'Producto B', cantidad: 1, total: 30, fecha: '2024-10-02' },
        { id: 3, descripcion: 'Producto C', cantidad: 3, total: 90, fecha: '2024-10-03' },
      ];
      setHistorico(datosSimulados);
    };

    cargarHistorico();
  }, []);

  return (
    <Container>
      <Header>Historial de Facturas</Header>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Fecha</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {historico.map((factura) => (
            <TableRow key={factura.id}>
              <TableCell>{factura.id}</TableCell>
              <TableCell>{factura.descripcion}</TableCell>
              <TableCell>{factura.cantidad}</TableCell>
              <TableCell>${factura.total}</TableCell>
              <TableCell>{factura.fecha}</TableCell> {/* Se muestra la fecha aquí */}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default VerHistorico;
