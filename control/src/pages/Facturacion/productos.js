import React, { useState } from 'react';
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #666;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
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

const CrearProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState({ codigo: '', descripcion: '', precio: 0 });

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarProducto = () => {
    setProductos((prev) => [...prev, productoActual]);
    setProductoActual({ codigo: '', descripcion: '', precio: 0 });
  };

  return (
    <Container>
      <Header>Crear Producto</Header>

      <Form>
        <Label>Código del Producto</Label>
        <Input
          type="text"
          name="codigo"
          value={productoActual.codigo}
          onChange={handleProductoChange}
          required
        />

        <Label>Descripción del Producto</Label>
        <Input
          type="text"
          name="descripcion"
          value={productoActual.descripcion}
          onChange={handleProductoChange}
          required
        />

        <Label>Precio Unitario</Label>
        <Input
          type="number"
          name="precio"
          value={productoActual.precio}
          onChange={handleProductoChange}
          required
        />

        <Button type="button" onClick={agregarProducto}>
          Agregar Producto
        </Button>
      </Form>

      <h2>Lista de Productos</h2>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Código</TableHeader>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Precio Unitario</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell>{producto.codigo}</TableCell>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>${producto.precio}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CrearProductos;