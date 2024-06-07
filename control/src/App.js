import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase'; // Importa tu configuración de Firestore
import './DatePickerStyles.css'; // Importa tu archivo CSS aquí
import Swal from 'sweetalert2';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

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

const MonthSelect = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
`;

const ActivityInputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ActivityListWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ActivityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* Ajusta el ancho de la tabla aquí */
`;


const ActivityTableHead = styled.thead`
background-color: #007bff;
color: white;
/* Ajusta el ancho del encabezado de la tabla aquí */
`;

const ActivityTableBody = styled.tbody``;

const ActivityTableRow = styled.tr``;

const ActivityTableHeader = styled.th`
padding: 15px; /* Ajusta el padding de las celdas del encabezado aquí */
`;

const ActivityTableCell = styled.td`
padding: 15px; /* Ajusta el padding de las celdas de la tabla aquí */
`;

const ActivityDate = styled.strong`
  color: #007bff;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const CompleteButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

function App() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'datos'));
        const activitiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error al cargar actividades: ', error);
      }
      console.log(activities);
    };
    loadActivities();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-').map(Number);
      const startDate = new Date(Date.UTC(year, month - 1, 1));
      const endDate = new Date(Date.UTC(year, month, 0));
      const filtered = activities
        .filter(activity => {
          const activityDate = new Date(activity.date);
          return activityDate >= startDate && activityDate <= endDate;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordenar las actividades por fecha
      setFilteredActivities(filtered);
    } else {
      const sortedActivities = [...activities].sort((a, b) => new Date(a.date) - new Date(b.date)); // Ordenar las actividades por fecha
      setFilteredActivities(sortedActivities);
    }
  }, [selectedMonth, activities]);


  const handleMonthChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedMonth(selectedValue);

    const [year, month] = selectedValue.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    setDateRange({ startDate, endDate });

    setSelectedDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleAddActivity = async () => {
    if (!selectedDate) {
      alert('Por favor, selecciona una fecha.');
      return;
    }

    const newActivity = { date: selectedDate.toISOString().split('T')[0], activity, completed: false };

    try {
      const docRef = await addDoc(collection(firestore, 'datos'), newActivity);
      const activityWithId = { ...newActivity, id: docRef.id };
      setActivities([...activities, activityWithId]);
      setActivity('');
    } catch (error) {
      console.error('Error al agregar la actividad: ', error);
    }
  };

  const handleDeleteActivity = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#007bff',
      confirmButtonText: 'Sí, eliminarlo'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(firestore, 'datos', id));
        setActivities(activities.filter(activity => activity.id !== id));
        // Mostrar un mensaje de éxito
        Swal.fire('Eliminado', 'La actividad ha sido eliminada correctamente.', 'success');
      } catch (error) {
        console.error('Error al eliminar la actividad: ', error);
        // Mostrar un mensaje de error
        Swal.fire('Error', 'Se produjo un error al eliminar la actividad.', 'error');
      }
    }
  };

  const handleCompleteActivity = async (itemId) => {
    const activityRef = doc(firestore, 'datos', itemId);
    try {
      await updateDoc(activityRef, { estado: true });
      const updatedActivities = activities.map((item) =>
        item.id === itemId ? { ...item, completed: true } : item // Marcar la actividad como completada
      );
      setActivities(updatedActivities);
      Swal.fire('¡Éxito!', 'Actividad finalizada con éxito, eres un crack.', 'success'); // Mostrar notificación de éxito
    } catch (error) {
      console.error('Error al marcar la actividad como completada: ', error);
      Swal.fire('Error', 'Se produjo un error al marcar la actividad como completada.', 'error'); // Mostrar notificación de error
    }
  };

  return (
    <Container>
      <Header>Registro de Actividades Diarias</Header>

      <MonthSelect value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Selecciona un Mes</option>
        <option value="2024-01">Enero</option>
        <option value="2024-02">Febrero</option>
        <option value="2024-03">Marzo</option>
        <option value="2024-04">Abril</option>
        <option value="2024-05">Mayo</option>
        <option value="2024-06">Junio</option>
        <option value="2024-07">Julio</option>
        <option value="2024-08">Agosto</option>
        <option value="2024-09">Septiembre</option>
        <option value="2024-10">Octubre</option>
        <option value="2024-11">Noviembre</option>
        <option value="2024-12">Diciembre</option>
      </MonthSelect>

      {selectedMonth && (
        <>
          <DatePicker
            id="datePicker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una Fecha"
            minDate={dateRange.startDate}
            maxDate={dateRange.endDate}
          />

          <ActivityInputWrapper style={{ marginTop: '20px' }}>
            <Input
              type="text"
              value={activity}
              onChange={handleActivityChange}
              placeholder="Escribe tu actividad"
            />
            <Button onClick={handleAddActivity}>Agregar Actividad</Button>
          </ActivityInputWrapper>
        </>
      )}

      <ActivityListWrapper>
        <h2>Actividades Guardadas</h2>
        <ActivityTable>
          <ActivityTableHead>
            <tr>
              <ActivityTableHeader>Fecha</ActivityTableHeader>
              <ActivityTableHeader>Actividad</ActivityTableHeader>
              <ActivityTableHeader>Estado</ActivityTableHeader>
              <ActivityTableHeader>Acción 1</ActivityTableHeader>
              <ActivityTableHeader>Acción 2</ActivityTableHeader>
            </tr>
          </ActivityTableHead>
          <ActivityTableBody>
            {filteredActivities.map((item) => (
              <ActivityTableRow key={item.id}>
                <ActivityTableCell>
                  <ActivityDate>{new Date(item.date).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</ActivityDate>
                </ActivityTableCell>
                <ActivityTableCell>{item.activity}</ActivityTableCell>
                <ActivityTableCell>{item.estado ? 'FINALIZADO' : 'NO FINALIZADO'}</ActivityTableCell> {/* Aquí se muestra el estado */}
                <ActivityTableCell>
                  <CompleteButton onClick={() => handleCompleteActivity(item.id)}>Finalizar</CompleteButton>
                </ActivityTableCell>
                <ActivityTableCell>
                  <DeleteButton onClick={() => handleDeleteActivity(item.id)}>Eliminar</DeleteButton>
                </ActivityTableCell>
              </ActivityTableRow>
            ))}
          </ActivityTableBody>
        </ActivityTable>
      </ActivityListWrapper>
    </Container>
  );
}

export default App;
