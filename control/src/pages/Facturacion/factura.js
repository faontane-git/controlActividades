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

const GenerarFactura = () => {
  const [formData, setFormData] = useState({
    cliente: '',
    productos: [],
    iva: 12,  // IVA por defecto 12%
  });

  const [productoActual, setProductoActual] = useState({ descripcion: '', cantidad: 0, precio: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProductoChange = (e) => {
    const { name, value } = e.target;
    setProductoActual((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const agregarProducto = () => {
    setFormData((prev) => ({
      ...prev,
      productos: [...prev.productos, productoActual],
    }));
    setProductoActual({ descripcion: '', cantidad: 0, precio: 0 });
  };

  const calcularTotal = () => {
    return formData.productos.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);
  };

  const calcularIVA = () => {
    const subtotal = calcularTotal();
    return (subtotal * (formData.iva / 100)).toFixed(2);
  };

  return (
    <Container>
      <Header>Generar Factura</Header>

      <Form>
        <Label>Nombre del Cliente</Label>
        <Input
          type="text"
          name="cliente"
          value={formData.cliente}
          onChange={handleChange}
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

        <Label>Cantidad</Label>
        <Input
          type="number"
          name="cantidad"
          value={productoActual.cantidad}
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

        <Label>IVA (%)</Label>
        <Input
          type="number"
          name="iva"
          value={formData.iva}
          onChange={handleChange}
          required
        />

        <Button type="button" onClick={agregarProducto}>
          Agregar Producto
        </Button>
      </Form>

      <h2>Factura para: {formData.cliente}</h2>

      <Table>
        <thead>
          <TableRow>
            <TableHeader>Descripción</TableHeader>
            <TableHeader>Cantidad</TableHeader>
            <TableHeader>Precio Unitario</TableHeader>
            <TableHeader>Total</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {formData.productos.map((producto, index) => (
            <TableRow key={index}>
              <TableCell>{producto.descripcion}</TableCell>
              <TableCell>{producto.cantidad}</TableCell>
              <TableCell>${producto.precio}</TableCell>
              <TableCell>${producto.cantidad * producto.precio}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan="3">Subtotal</TableCell>
            <TableCell>${calcularTotal()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan="3">IVA ({formData.iva}%)</TableCell>
            <TableCell>${calcularIVA()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan="3"><strong>Total</strong></TableCell>
            <TableCell><strong>${(parseFloat(calcularTotal()) + parseFloat(calcularIVA())).toFixed(2)}</strong></TableCell>
          </TableRow>
        </tbody>
      </Table>
    </Container>
  );
};

export default GenerarFactura;
