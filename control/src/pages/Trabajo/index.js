import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaCheckCircle, FaClipboardList, FaCode, FaBug, FaClipboardCheck } from 'react-icons/fa';

// Función para elegir el color de texto según el color de fondo
const getTextColor = (bgColor) => {
  const lightColors = ['#ffc107', '#28a745', '#f0f0f0', '#f9f871'];
  return lightColors.includes(bgColor) ? '#333' : '#fff';
};

// Contenedor principal del tablero
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJsYWNrYm9hcmQlMjBiYWNrZ3JvdW5kfGVufDB8fHx8MTY0MzI2NzYxNQ&ixlib=rb-1.2.1&q=80&w=400'); 
  background-size: cover;
  background-position: center;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

// Tablero con las columnas
const Board = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); 
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
  width: 280px;
  min-height: 500px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Encabezado de cada columna con el mismo ancho que las tareas
const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black; /* Fondo negro */
  color: white; /* Texto blanco */
  padding: 10px;
  border-radius: 8px 8px 0 0;
  margin: 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  width: 140px;
`;

// Iconos de encabezado para cada columna
const HeaderIcon = styled.div`
  margin-right: 10px;
`;

// Tareas con diseño de notas adhesivas mejoradas y nuevo color de sombra (box-shadow)
const Task = styled.div`
  background-color: ${(props) => props.color}; 
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 10px; 
  box-shadow: 0 4px 15px rgba(0, 0, 139, 0.4); /* Sombra azul oscuro (puedes cambiarlo) */
  width: 140px;
  height: 140px;
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  font-size: 0.8rem;
  transform: rotate(${(props) => (props.rotation || 0)}deg); 
  transition: transform 0.2s ease, box-shadow 0.3s ease, background-color 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${(props) => getTextColor(props.color)}; 
  background-image: url('https://www.transparenttextures.com/patterns/corrugation.png');
  
  &:hover {
    transform: translateY(-5px) rotate(1deg); 
    box-shadow: 0 8px 20px rgba(0, 0, 139, 0.5); /* Sombra azul más intensa */
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
  margin-bottom: 10px;
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

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ColorLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
`;

const SoftwareBoard = () => {
  const [columns, setColumns] = useState({
    backlog: {
      name: 'Backlog',
      items: [{ id: uuidv4(), content: 'Implementar autenticación OAuth', color: '#007bff' }],
    },
    inDevelopment: {
      name: 'En Desarrollo',
      items: [{ id: uuidv4(), content: 'Crear UI para registro de usuarios', color: '#007bff' }],
    },
    codeReview: {
      name: 'Revisión de Código',
      items: [{ id: uuidv4(), content: 'Revisar PR #42', color: '#007bff' }],
    },
    testing: {
      name: 'Pruebas',
      items: [{ id: uuidv4(), content: 'Pruebas unitarias para el módulo de pagos', color: '#007bff' }],
    },
    done: {
      name: 'Terminado',
      items: [{ id: uuidv4(), content: 'Deploy a producción', color: '#007bff' }],
    },
  });

  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskColor, setTaskColor] = useState('#007bff'); 

  const colors = [
    { value: '#007bff', label: 'Azul' },
    { value: '#28a745', label: 'Verde' },
    { value: '#ffc107', label: 'Amarillo' },
    { value: '#dc3545', label: 'Rojo' },
    { value: '#6f42c1', label: 'Morado' },
  ];

  // Función para agregar una nueva tarea
  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setColumns((prevColumns) => ({
      ...prevColumns,
      backlog: {
        ...prevColumns.backlog,
        items: [...prevColumns.backlog.items, { id: uuidv4(), content: newTask, color: taskColor }],
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

      setSelectedTask(null); 
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
        <RadioGroup>
          {colors.map((color) => (
            <ColorLabel key={color.value}>
              <input
                type="radio"
                name="color"
                value={color.value}
                checked={taskColor === color.value}
                onChange={(e) => setTaskColor(e.target.value)}
              />
              <span style={{ color: color.value }}>{color.label}</span>
            </ColorLabel>
          ))}
        </RadioGroup>
        <Button type="submit">Agregar Tarea</Button>
      </Form>

      <Board>
        {Object.entries(columns).map(([columnId, column]) => (
          <Column key={columnId}>
            {selectedTask && selectedTask.fromColumn !== columnId && (
              <MoveButton onClick={() => moveTaskTo(columnId)}>
                Mover aquí
              </MoveButton>
            )}
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
                color={task.color}
                onClick={() => selectTask(task, columnId)}
              >
                {task.content}
              </Task>
            ))}
          </Column>
        ))}
      </Board>
    </Container>
  );
};

export default SoftwareBoard;
