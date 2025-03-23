import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaClipboardList, FaCode, FaCheckCircle } from 'react-icons/fa';
import NavBar from '../NavBar/Navbar';

const getTextColor = (bgColor) => {
  const lightColors = ['#ffc107', '#28a745', '#f0f0f0', '#f9f871'];
  return lightColors.includes(bgColor) ? '#333' : '#fff';
};

// Animación para el modal
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Estilos del contenedor principal y navbar
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

const NavBarContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

// Estilos del tablero y columnas
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
  position: relative;
`;

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

// Encabezado de la columna con icono
const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-size: 1.1rem;
  text-transform: uppercase;
  width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderIcon = styled.div`
  margin-right: 10px;
`;

// Estilos de las tarjetas (tareas)
const Task = styled.div`
  background-color: ${(props) => props.color};
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 139, 0.4);
  width: 180px;
  height: 140px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 0.8rem;
  text-align: center;
  color: ${(props) => getTextColor(props.color)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px) rotate(1deg);
    box-shadow: 0 8px 20px rgba(0, 0, 139, 0.5);
  }
`;

// Modal de pantalla completa para expandir tarea
const FullscreenModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${(props) => props.color || 'black'};
  width: 90%;
  max-width: 800px;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-size: 1rem;
  position: relative;
  animation: ${fadeInScale} 0.4s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #a61c24;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #a61c24;
  }
`;

// Estilos del formulario para añadir tareas
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

const EditableInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
`;

const EditableTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 1rem;
  min-height: 100px;
`;

const SoftwareBoard = () => {
  const [columns, setColumns] = useState({
    backlog: {
      name: 'Backlog',
      items: [{ id: uuidv4(), content: 'Implementar autenticación OAuth', color: '#007bff', description: '' }],
    },
    inDevelopment: {
      name: 'En Desarrollo',
      items: [{ id: uuidv4(), content: 'Crear UI para registro de usuarios', color: '#007bff', description: '' }],
    },
    done: {
      name: 'Terminado',
      items: [{ id: uuidv4(), content: 'Deploy a producción', color: '#007bff', description: '' }],
    },
  });

  const [newTask, setNewTask] = useState('');
  const [taskColor, setTaskColor] = useState('#007bff');
  const [expandedTask, setExpandedTask] = useState(null);

  const colors = [
    { value: '#007bff', label: 'Azul' },
    { value: '#28a745', label: 'Verde' },
    { value: '#ffc107', label: 'Amarillo' },
    { value: '#dc3545', label: 'Rojo' },
    { value: '#6f42c1', label: 'Morado' },
  ];

  // Agregar nueva tarea
  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setColumns((prevColumns) => ({
      ...prevColumns,
      backlog: {
        ...prevColumns.backlog,
        items: [...prevColumns.backlog.items, { id: uuidv4(), content: newTask, color: taskColor, description: '' }],
      },
    }));
    setNewTask('');
  };

  // Eliminar tarea
  const deleteTask = (taskId, fromColumnId) => {
    const newItems = columns[fromColumnId].items.filter((task) => task.id !== taskId);
    setColumns((prevColumns) => ({
      ...prevColumns,
      [fromColumnId]: {
        ...prevColumns[fromColumnId],
        items: newItems,
      },
    }));
    setExpandedTask(null);
  };

  // Abrir modal en pantalla completa con la tarea seleccionada
  const openTaskInFullscreen = (task) => {
    setExpandedTask(task);
  };

  // Cerrar modal
  const closeModal = () => {
    setExpandedTask(null);
  };

  // Editar contenido de la tarjeta
  const handleTaskChange = (field, value) => {
    setExpandedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  // Guardar cambios en la tarjeta
  const saveTaskChanges = () => {
    const updatedItems = columns[expandedTask.fromColumn].items.map((item) =>
      item.id === expandedTask.id ? { ...item, content: expandedTask.content, description: expandedTask.description } : item
    );
    setColumns((prevColumns) => ({
      ...prevColumns,
      [expandedTask.fromColumn]: {
        ...prevColumns[expandedTask.fromColumn],
        items: updatedItems,
      },
    }));
    closeModal();
  };

  return (
    <Container>
      <NavBarContainer>
        <NavBar />
      </NavBarContainer>

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
                {columnId === 'done' && <FaCheckCircle />}
              </HeaderIcon>
              {column.name}
            </ColumnHeader>
            {column.items.map((task) => (
              <Task
                key={task.id}
                color={task.color}
                onClick={() => openTaskInFullscreen({ ...task, fromColumn: columnId })}
              >
                {task.content}
              </Task>
            ))}
          </Column>
        ))}
      </Board>

      {expandedTask && (
        <FullscreenModal>
          <ModalContent color={expandedTask.color}>
            <EditableInput
              type="text"
              value={expandedTask.content}
              onChange={(e) => handleTaskChange('content', e.target.value)}
              placeholder="Título de la tarea"
            />
            <EditableTextarea
              value={expandedTask.description}
              onChange={(e) => handleTaskChange('description', e.target.value)}
              placeholder="Descripción de la tarea"
            />
            <Button onClick={saveTaskChanges}>Guardar Cambios</Button>
            <CloseButton onClick={closeModal}>Cerrar</CloseButton>
            <DeleteButton onClick={() => deleteTask(expandedTask.id, expandedTask.fromColumn)}>
              Eliminar
            </DeleteButton>
          </ModalContent>
        </FullscreenModal>
      )}
    </Container>
  );
};

export default SoftwareBoard;
