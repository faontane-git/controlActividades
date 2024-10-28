import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { FaClipboardList, FaCode, FaCheckCircle, FaTrash } from 'react-icons/fa';
import NavBar from '../NavBar/Navbar';

const getTextColor = (bgColor) => {
  const lightColors = ['#ffc107', '#28a745', '#f0f0f0', '#f9f871'];
  return lightColors.includes(bgColor) ? '#333' : '#fff';
};

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
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px) rotate(1deg);
    box-shadow: 0 8px 20px rgba(0, 0, 139, 0.5);
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #dc3545;
  font-size: 1rem;
  transition: color 0.3s ease;
  &:hover {
    color: #a61c24;
  }
`;

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
    done: {
      name: 'Terminado',
      items: [{ id: uuidv4(), content: 'Deploy a producción', color: '#007bff' }],
    },
  });

  const [newTask, setNewTask] = useState('');
  const [taskColor, setTaskColor] = useState('#007bff');

  const colors = [
    { value: '#007bff', label: 'Azul' },
    { value: '#28a745', label: 'Verde' },
    { value: '#ffc107', label: 'Amarillo' },
    { value: '#dc3545', label: 'Rojo' },
    { value: '#6f42c1', label: 'Morado' },
  ];

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

  const deleteTask = (taskId, fromColumnId) => {
    const newItems = columns[fromColumnId].items.filter((task) => task.id !== taskId);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [fromColumnId]: {
        ...prevColumns[fromColumnId],
        items: newItems,
      },
    }));
  };

  const handleDragStart = (e, taskId, fromColumnId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("fromColumnId", fromColumnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, toColumnId) => {
    const taskId = e.dataTransfer.getData("taskId");
    const fromColumnId = e.dataTransfer.getData("fromColumnId");

    if (fromColumnId === toColumnId) return;

    const taskToMove = columns[fromColumnId].items.find((task) => task.id === taskId);
    const newFromColumnItems = columns[fromColumnId].items.filter((task) => task.id !== taskId);

    setColumns((prevColumns) => ({
      ...prevColumns,
      [fromColumnId]: {
        ...prevColumns[fromColumnId],
        items: newFromColumnItems,
      },
      [toColumnId]: {
        ...prevColumns[toColumnId],
        items: [...prevColumns[toColumnId].items, taskToMove],
      },
    }));
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
          <Column
            key={columnId}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, columnId)}
          >
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
                draggable
                onDragStart={(e) => handleDragStart(e, task.id, columnId)}
              >
                {task.content}
                <DeleteButton onClick={() => deleteTask(task.id, columnId)}>
                  <FaTrash />
                </DeleteButton>
              </Task>
            ))}
          </Column>
        ))}
      </Board>
    </Container>
  );
};

export default SoftwareBoard;
