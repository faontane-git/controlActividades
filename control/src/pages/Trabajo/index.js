import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Estilos básicos para el contenedor del tablero y las columnas
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #3b5323; /* Color verde pizarra */
  padding: 20px;
  border: 10px solid white; /* Marco blanco alrededor de la pizarra */
  border-radius: 12px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); /* Sombra para dar efecto de profundidad */
`;

const Board = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1); /* Fondo semi-transparente para las columnas */
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3); /* Sombra para darle efecto de profundidad */
`;

const Column = styled.div`
  background-color: #e0e4e4;
  border-radius: 8px;
  padding: 10px;
  width: 300px;
  min-height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ColumnHeader = styled.h2`
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  margin: 0;
  text-align: center;
`;

// Estilo de las tareas como notas adhesivas
const Task = styled.div`
  background-color: #fef68a; /* Color de nota adhesiva */
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: rotate(${(props) => props.angle}deg); /* Pequeña rotación aleatoria */
  font-family: 'Comic Sans MS', sans-serif; /* Fuente estilo nota */
  color: #333;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05) rotate(${(props) => props.angle}deg); /* Efecto al pasar el mouse */
  }
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TrabajoPage = () => {
  // Estado inicial de las columnas y las actividades
  const [columns, setColumns] = useState({
    todo: {
      name: "Por Hacer",
      items: ['Actividad 1', 'Actividad 2']
    },
    inProgress: {
      name: "En Proceso",
      items: ['Actividad 3']
    },
    done: {
      name: "Terminado",
      items: ['Actividad 4']
    }
  });

  // Estado para manejar el nombre de la nueva actividad
  const [newTask, setNewTask] = useState('');

  // Función que se ejecuta cuando una tarea es arrastrada y soltada
  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    // Si no hay destino (por ejemplo, si se soltó fuera de una columna), no hacemos nada
    if (!destination) return;

    // Si la tarea fue movida dentro de la misma columna
    if (source.droppableId === destination.droppableId) {
      const column = Array.from(columns[source.droppableId].items);
      const [movedTask] = column.splice(source.index, 1);
      column.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: column
        }
      });
    } else {
      // Si la tarea fue movida a una columna diferente
      const sourceColumn = Array.from(columns[source.droppableId].items);
      const destinationColumn = Array.from(columns[destination.droppableId].items);

      const [movedTask] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: sourceColumn
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          items: destinationColumn
        }
      });
    }
  };

  // Función para agregar una nueva actividad a la columna "Por Hacer"
  const addNewTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return; // Evita agregar tareas vacías

    setColumns((prevColumns) => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        items: [...prevColumns.todo.items, newTask]
      }
    }));

    setNewTask(''); // Limpiar el campo de entrada después de agregar
  };

  return (
    <Container>
      {/* Formulario para agregar nueva actividad */}
      <Form onSubmit={addNewTask}>
        <Input
          type="text"
          placeholder="Nueva actividad"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button type="submit">Agregar Actividad</Button>
      </Form>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Board>
          {Object.entries(columns).map(([columnId, column], index) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <Column ref={provided.innerRef} {...provided.droppableProps}>
                  <ColumnHeader>{column.name}</ColumnHeader>
                  {column.items.map((task, taskIndex) => (
                    <Draggable key={task} draggableId={task} index={taskIndex}>
                      {(provided) => (
                        <Task
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          angle={(Math.random() * 4 - 2).toFixed(2)} // Ángulo aleatorio para cada nota adhesiva
                        >
                          {task}
                        </Task>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Column>
              )}
            </Droppable>
          ))}
        </Board>
      </DragDropContext>
    </Container>
  );
};

export default TrabajoPage;
