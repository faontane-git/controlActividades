import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase'; // Importa tu configuración de Firestore
import './DatePickerStyles.css'; // Importa tu archivo CSS aquí
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // Importa xlsx para manejar archivos Excel
import ReactModal from 'react-modal';

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
  max-width: 800px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ActivityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const ActivityTableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const ActivityTableBody = styled.tbody``;

const ActivityTableRow = styled.tr``;

const ActivityTableHeader = styled.th`
  padding: 15px;
`;

const ActivityTableCell = styled.td`
  padding: 15px;
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
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const ModifyButton = styled.button`
  padding: 10px 20px;
  background-color: #FFC107;  
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #FFA000;
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
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const ModalWrapper = styled(ReactModal)`
  position: fixed;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  max-width: 90%;
`;

const ModalHeader = styled.h2`
  margin-top: 0;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #c82333;
  }
`;

const FilterSelect = styled.select`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
`;

const GenerateExcelButton = styled(Button)`
  margin-top: 20px;
`;

function ActividadesPage() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [editingActivity, setEditingActivity] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterOption, setFilterOption] = useState('all');
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(null);
  const [editableActivity, setEditableActivity] = useState({ date: null, activity: '', completed: false });

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'datos'));
        const activitiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error al cargar actividades: ', error);
      }
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
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setFilteredActivities(filtered);
    } else {
      const sortedActivities = [...activities].sort((a, b) => new Date(a.date) - new Date(b.date));
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
        Swal.fire('Eliminado', 'La actividad ha sido eliminada correctamente.', 'success')
          .then(() => {
            window.location.reload(); // Recargar la página después de eliminar
          });
      } catch (error) {
        console.error('Error al eliminar la actividad: ', error);
        Swal.fire('Error', 'Se produjo un error al eliminar la actividad.', 'error');
      }
    }
  };


  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleCompleteActivity = async (itemId) => {
    const activityRef = doc(firestore, 'datos', itemId);
    try {
      await updateDoc(activityRef, { estado: true });
      const updatedActivities = activities.map((item) =>
        item.id === itemId ? { ...item, completed: true } : item
      );
      setActivities(updatedActivities);
      Swal.fire('¡Éxito!', 'Actividad finalizada con éxito, eres un crack.', 'success')
        .then(() => {
          window.location.reload(); // Recargar la página después de marcar como completada
        });
    } catch (error) {
      console.error('Error al marcar la actividad como completada: ', error);
      Swal.fire('Error', 'Se produjo un error al marcar la actividad como completada.', 'error');
    }
  };


  const handleOpenModal = (activity) => {
    setEditingActivity(activity);
    setSelectedDate(new Date(activity.date));
    setActivity(activity.activity);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setEditingActivity(null);
    setSelectedDate(null);
    setActivity('');
    setModalIsOpen(false);
  };

  const handleSaveEdit = async () => {
    if (!editingActivity) return;

    const updatedActivity = {
      ...editingActivity,
      date: selectedDate.toISOString().split('T')[0],
      activity,
    };

    try {
      const activityRef = doc(firestore, 'datos', editingActivity.id);
      await updateDoc(activityRef, updatedActivity);
      const updatedActivities = activities.map((item) =>
        item.id === editingActivity.id ? updatedActivity : item
      );
      setActivities(updatedActivities);
      handleCloseModal();
      Swal.fire('¡Éxito!', 'Actividad modificada con éxito.', 'success');
    } catch (error) {
      console.error('Error al modificar la actividad: ', error);
      Swal.fire('Error', 'Se produjo un error al modificar la actividad.', 'error');
    }
  };

  const handleGenerateExcel = () => {
    const data = filteredActivities.map(item => ({
      Fecha: new Date(item.date).toLocaleDateString('es-ES', { timeZone: 'UTC' }),
      Actividad: item.activity,
      Estado: item.estado ? 'FINALIZADO' : 'NO FINALIZADO'
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Actividades');

    const fileName = 'actividades.xlsx';
    XLSX.writeFile(wb, fileName);
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
        <div>
          <FilterSelect value={filterOption} onChange={handleFilterChange}>
            <option value="all">Mostrar Todas</option>
            <option value="completed">Mostrar Finalizadas</option>
            <option value="uncompleted">Mostrar No Finalizadas</option>
          </FilterSelect>
        </div>
        {/*Tabla de Actividades*/}
        <ActivityTable>
          <ActivityTableHead>
            <tr>
              <ActivityTableHeader>Fecha</ActivityTableHeader>
              <ActivityTableHeader>Actividad</ActivityTableHeader>
              <ActivityTableHeader>Estado</ActivityTableHeader>
              <ActivityTableHeader>Acción 1</ActivityTableHeader>
              <ActivityTableHeader>Acción 2</ActivityTableHeader>
              <ActivityTableHeader>Acción 3</ActivityTableHeader>
            </tr>
          </ActivityTableHead>
          <ActivityTableBody>
            {filteredActivities.map((item, index) => {
              if (filterOption === 'completed' && !item.estado) return null; // Filtrar actividades no finalizadas si se está mostrando solo finalizadas
              if (filterOption === 'uncompleted' && item.estado) return null; // Filtrar actividades finalizadas si se está mostrando solo no finalizadas
              return (
                <ActivityTableRow key={item.id}>
                  <ActivityTableCell>
                    <ActivityDate>{new Date(item.date).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</ActivityDate>
                  </ActivityTableCell>
                  <ActivityTableCell>{item.activity}</ActivityTableCell>
                  <ActivityTableCell>{item.estado ? 'FINALIZADO' : 'NO FINALIZADO'}</ActivityTableCell>
                  <ActivityTableCell>
                    <CompleteButton onClick={() => handleCompleteActivity(item.id)}>Finalizar</CompleteButton>
                  </ActivityTableCell>
                  <ActivityTableCell>
                    <ModifyButton onClick={() => handleOpenModal(index)}>Modificar</ModifyButton>
                  </ActivityTableCell>
                  <ActivityTableCell>
                    <DeleteButton onClick={() => handleDeleteActivity(item.id)}>Eliminar</DeleteButton>
                  </ActivityTableCell>
                </ActivityTableRow>
              );
            })}
          </ActivityTableBody>
        </ActivityTable>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <GenerateExcelButton onClick={handleGenerateExcel}>Generar Excel</GenerateExcelButton>
        </div>
      </ActivityListWrapper>

      <ModalWrapper
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modificar Actividad"
      >
        <ModalHeader>Modificar Actividad</ModalHeader>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona una Fecha"
        />
        <Input
          type="text"
          value={activity}
          onChange={handleActivityChange}
          placeholder="Escribe tu actividad"
          style={{ width: '100%', marginTop: '20px' }}
        />
        <ModalButton onClick={handleSaveEdit}>Guardar Cambios</ModalButton>
        <CloseButton onClick={handleCloseModal}>Cancelar</CloseButton>
      </ModalWrapper>
    </Container>
  );
}

export default ActividadesPage;
