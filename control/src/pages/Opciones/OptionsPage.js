import React, { useState, useEffect } from 'react';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import actividades from '../../../src/recursos/actividades.docx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../Actividades/firebase'; // Importa tu configuración de Firestore

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

const BackLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 16px;
  margin-top: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const ProgressBarContainer = styled.div`
  width: 80%;
  max-width: 800px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProgressBar = styled.div`
  height: 20px;
  background-color: #28a745;
  width: ${({ width }) => width}%;
  transition: width 0.3s ease;
`;

const App = () => {
  const [bosses, setBosses] = useState([
    { name: 'Ing. Lenin Eduardo Freire Cobo', position: 'Gerente de Tecnologías y Sistemas De Información' },
    { name: 'Ing. José Francisco Rodríguez Rojas', position: 'Director de Desarrollo de Aplicaciones' },
  ]);

  const [documentCount, setDocumentCount] = useState(0);
  const [totalSize, setTotalSize] = useState(0);

  // Definir el límite de almacenamiento en KB (1 GB = 1,048,576 KB)
  const storageLimitKB = 1048576;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'datos'));
        const totalDocs = querySnapshot.size;
        let estimatedSize = 0;

        // Calcula el tamaño aproximado de cada documento
        querySnapshot.forEach((doc) => {
          const docData = JSON.stringify(doc.data());
          estimatedSize += new Blob([docData]).size; // Estima el tamaño del documento
        });

        setDocumentCount(totalDocs);
        setTotalSize(estimatedSize); // Establece el tamaño total estimado
      } catch (error) {
        console.error('Error al obtener documentos: ', error);
      }
    };

    fetchDocuments();
  }, []);

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

  // Calcular el porcentaje de uso del almacenamiento
  const usagePercentage = Math.min((totalSize / 1024) / storageLimitKB * 100, 100);

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

      <h2>Métricas de Firestore</h2>
      <p>Total de documentos en Firestore: {documentCount}</p>
      <p>Tamaño total aproximado: {(totalSize / 1024).toFixed(2)} KB de {storageLimitKB / 1024} MB</p>

      <ProgressBarContainer>
        <ProgressBar width={usagePercentage} />
      </ProgressBarContainer>
      <p>{usagePercentage.toFixed(2)}% del límite de almacenamiento utilizado</p>

      <BackLink to="/">Volver al Menú Principal</BackLink>
    </Container>
  );
};

export default App;
