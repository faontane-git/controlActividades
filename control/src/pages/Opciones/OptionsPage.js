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

const Table = styled.table`
  width: 100%;
  max-width: 800px;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  background-color: #fff;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const EditableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: transparent;
  &:focus {
    outline: none;
    background-color: #f0f0f0;
  }
`;

const FileInput = styled.input`
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const OptionButton = styled.a`
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const OptionsPage = () => {
  const [file, setFile] = useState(null);
  const [bosses, setBosses] = useState([
    { name: 'Juan Pérez', position: 'Director' },
    { name: 'Ana Gómez', position: 'Jefa de Finanzas' },
    { name: 'Carlos López', position: 'Jefe de Operaciones' },
  ]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Aquí podrías implementar la lógica para manejar el archivo subido
    console.log('Archivo subido:', file);
  };

  const handleInputChange = (index, field, value) => {
    const updatedBosses = bosses.map((boss, i) => (
      i === index ? { ...boss, [field]: value } : boss
    ));
    setBosses(updatedBosses);
  };

  return (
    <Container>
      <Header>Opciones</Header>
      <Table>
        <thead>
          <tr>
            <TableHeader>Nombre</TableHeader>
            <TableHeader>Cargo</TableHeader>
          </tr>
        </thead>
        <tbody>
          {bosses.map((boss, index) => (
            <TableRow key={index}>
              <TableCell>
                <EditableInput
                  type="text"
                  value={boss.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                />
              </TableCell>
              <TableCell>
                <EditableInput
                  type="text"
                  value={boss.position}
                  onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <FileInput type="file" onChange={handleFileChange} />
      <SubmitButton onClick={handleSubmit}>Subir Documento</SubmitButton>
      <OptionButton href="/home">Volver a la Página Principal</OptionButton>
    </Container>
  );
};

export default OptionsPage;
