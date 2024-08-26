import React, { useState } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import actividades from '../../../src/recursos/actividades.docx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 80%;
  max-width: 800px;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
  font-size: 16px;
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
  font-size: 14px;
`;

const EditableInput = styled.input`
  width: 100%;
  padding: 8px;
  border: none;
  font-size: 14px;
  background-color: transparent;
  &:focus {
    outline: none;
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #218838;
  }
`;

const App = () => {
  const [bosses, setBosses] = useState([
    { name: 'Ing. Lenin Eduardo Freire Cobo', position: 'Gerente de Tecnologías y Sistemas De Información' },
    { name: 'Ing. José Francisco Rodríguez Rojas', position: 'Director de Desarrollo de Aplicaciones' },
  ]);

  const handleInputChange = (index, field, value) => {
    const updatedBosses = bosses.map((boss, i) =>
      i === index ? { ...boss, [field]: value } : boss
    );
    setBosses(updatedBosses);
  };

  const generateDocument = () => {
    fetch(actividades)
      .then(response => response.arrayBuffer())
      .then(content => {
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        // Puedes ajustar aquí el dato para reemplazar el marcador de posición {JEFE_INMEDIATO}
        const jefeInmediato = bosses[0].name; // Por ejemplo, usamos el nombre del primer jefe

        doc.setData({ JEFE_INMEDIATO: jefeInmediato });

        try {
          doc.render();
        } catch (error) {
          console.error(error);
        }

        const out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });

        saveAs(out, "documento_generado.docx");
      })
      .catch(error => console.error("Error al cargar la plantilla:", error));
  };

  return (
    <Container>
      <Header>Generar Documento de Word desde Plantilla</Header>
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
      <SubmitButton onClick={generateDocument}>Descargar Documento</SubmitButton>
    </Container>
  );
};

export default App;
