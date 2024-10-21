import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaCheckCircle, FaClipboardList, FaCode, FaBug, FaClipboardCheck } from 'react-icons/fa';

// Contenedor principal del tablero
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url('https://your-image-url.com/pizarra.jpg'); /* URL de la imagen de pizarra */
  background-size: cover; /* Ajustar la imagen de fondo al tamaño de la pantalla */
  background-position: center;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

// Tablero con las columnas
const Board = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Fondo blanco con un poco de transparencia */
  border-radius: 12px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
`;

// Columnas del tablero
const Column = styled.div`
  background-color: #f7f9fc;
  border-radius: 12px;
  padding: 20px;
  width: 300px;
  min-height: 500px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

// Encabezado de cada columna
const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  margin: 0;
  font-size: 1.2rem;
  text-transform: uppercase;
`;

// Iconos de encabezado para cada columna
const HeaderIcon = styled.div`
  margin-right: 10px;
`;

// Tareas con diseño limpio y moderno
const Task = styled.div`
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-left: 5px solid #007bff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

// Botones para mover tareas
const MoveButton = styled.button`
  padding: 8px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 10px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Estilos para el formulario de nueva tarea
const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ddd;
  width: 300px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SoftwareBoard = () => {
  const [columns, setColumns] = useState({
    backlog: {
      name: 'Backlog',
      items: [{ id: uuidv4(), content: 'Implementar autenticación OAuth' }],
    },
    inDevelopment: {
      name: 'En Desarrollo',
      items: [{ id: uuidv4(), content: 'Crear UI para registro de usuarios' }],
    },
    codeReview: {
      name: 'Revisión de Código',
      items: [{ id: uuidv4(), content: 'Revisar PR #42' }],
    },
    testing: {
      name: 'Pruebas',
      items: [{ id: uuidv4(), content: 'Pruebas unitarias para el módulo de pagos' }],
    },
    done: {
      name: 'Terminado',
      items: [{ id: uuidv4(), content: 'Deploy a producción' }],
    },
  });

  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null); // Estado para manejar la tarea seleccionada

  // Función para agregar una nueva tarea
  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setColumns((prevColumns) => ({
      ...prevColumns,
      backlog: {
        ...prevColumns.backlog,
        items: [...prevColumns.backlog.items, { id: uuidv4(), content: newTask }],
      },
    }));
    setNewTask('');
  };

  // Función para seleccionar una tarea
  const selectTask = (task, columnId) => {
    setSelectedTask({ ...task, fromColumn: columnId });
  };

  // Función para mover la tarea seleccionada a la columna de destino
  const moveTaskTo = (destinationColumnId) => {
    if (!selectedTask) return;

    const { fromColumn } = selectedTask;

    // Remover la tarea de la columna de origen
    const sourceColumn = Array.from(columns[fromColumn].items);
    const destinationColumn = Array.from(columns[destinationColumnId].items);

    const taskToMove = sourceColumn.find((task) => task.id === selectedTask.id);
    if (taskToMove) {
      sourceColumn.splice(sourceColumn.indexOf(taskToMove), 1);
      destinationColumn.push(taskToMove);

      setColumns({
        ...columns,
        [fromColumn]: {
          ...columns[fromColumn],
          items: sourceColumn,
        },
        [destinationColumnId]: {
          ...columns[destinationColumnId],
          items: destinationColumn,
        },
      });

      setSelectedTask(null); // Deseleccionar tarea después de moverla
    }
  };

  return (
    <Container>
      <Form onSubmit={addNewTask}>
        <Input
          type="text"
          placeholder="Nueva tarea para el Backlog"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="submit">Agregar Tarea</Button>
      </Form>

      <Board>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column key={columnId}>
            <ColumnHeader>
              <HeaderIcon>
                {columnId === 'backlog' && <FaClipboardList />}
                {columnId === 'inDevelopment' && <FaCode />}
                {columnId === 'codeReview' && <FaBug />}
                {columnId === 'testing' && <FaClipboardCheck />}
                {columnId === 'done' && <FaCheckCircle />}
              </HeaderIcon>
              {column.name}
            </ColumnHeader>
            {column.items.map((task) => (
              <Task
                key={task.id}
                onClick={() => selectTask(task, columnId)}
              >
                {task.content}
              </Task>
            ))}
            {selectedTask && selectedTask.fromColumn !== columnId && (
              <MoveButton onClick={() => moveTaskTo(columnId)}>
                Mover aquí
              </MoveButton>
            )}
          </Column>
        ))}
      </Board>
    </Container>
  );
};

export default SoftwareBoard;
