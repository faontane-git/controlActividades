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
import { useParams, Link } from 'react-router-dom';
import styles from './styles';
import logo from '../../../src/recursos/logo.png';

const {
  Container, Header, MonthSelect, ActivityInputWrapper, Input, Button, ActivityListWrapper,
  ActivityTable, ActivityTableHead, ActivityTableBody, ActivityTableRow, ActivityTableHeader,
  ActivityTableCell, ActivityDate, DeleteButton, ModifyButton, Checkbox, CompleteButton,
  ModalWrapper, MonthSelectWrapper, ModalHeader, ModalButton, CloseButton, FilterSelect,
  GenerateExcelButton, FilterSelectWrapper,Footer
} = styles;

function ActividadesPage() {
  const { month } = useParams();
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
    if (month) {
      const [year, monthNum] = month.split('-').map(Number);
      const startDate = new Date(Date.UTC(year, monthNum - 1, 1));
      const endDate = new Date(Date.UTC(year, monthNum, 0));
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
  }, [month, activities]);

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

  const getMonthName = (monthString) => {
    const [year, month] = monthString.split('-').map(Number);
    const date = new Date(year, month - 1);
    // Solo obtener el nombre del mes
    const monthName = date.toLocaleDateString('es-ES', { month: 'long' });
    // Capitalizar la primera letra
    return monthName.charAt(0).toUpperCase() + monthName.slice(1);
  };

  return (
    <Container>
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" style={{ width: '100px', height: 'auto' }} />
        </Link>
      </div>
      <Header>{getMonthName(month)}</Header>
      <ActivityInputWrapper>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Selecciona una fecha"
        />
        <Input
          type="text"
          value={activity}
          onChange={handleActivityChange}
          placeholder="Agregar actividad"
          style={{ marginLeft: '10px', marginRight: '10px' }}
        />
        <Button onClick={handleAddActivity}>Añadir</Button>
      </ActivityInputWrapper>

      <FilterSelectWrapper>
        {/*
        <FilterSelect value={filterOption} onChange={handleFilterChange}>
          <option value="all">Todos</option>
          <option value="completed">Completados</option>
          <option value="incomplete">Pendientes</option>
        </FilterSelect>
        */}
        <GenerateExcelButton onClick={handleGenerateExcel}>
          Generar Excel
        </GenerateExcelButton>
      </FilterSelectWrapper>


      <ActivityListWrapper>
        <Header style={{ textAlign: 'center' }}>Lista de actividades del mes</Header>
        <ActivityTable>
          <ActivityTableHead>
            <ActivityTableRow>
              <ActivityTableHeader>Fecha</ActivityTableHeader>
              <ActivityTableHeader>Actividad</ActivityTableHeader>
              <ActivityTableHeader>Estado</ActivityTableHeader>
              <ActivityTableHeader>Acción 1</ActivityTableHeader>
              <ActivityTableHeader>Acción 2</ActivityTableHeader>
              <ActivityTableHeader>Acción 3</ActivityTableHeader>
            </ActivityTableRow>
          </ActivityTableHead>
          <ActivityTableBody>
            {filteredActivities.map((activity, index) => (
              <ActivityTableRow key={activity.id}>
                <ActivityDate>{new Date(activity.date).toLocaleDateString('es-ES', { timeZone: 'UTC' })}</ActivityDate>
                <ActivityTableCell>{activity.activity}</ActivityTableCell>
                <ActivityTableCell>{activity.estado ? 'Finalizado' : 'Pendiente'}</ActivityTableCell>
                <ActivityTableCell>
                  <CompleteButton onClick={() => handleCompleteActivity(activity.id)}>
                    Finalizar
                  </CompleteButton>
                </ActivityTableCell>
                <ActivityTableCell>
                  <ModifyButton onClick={() => handleOpenModal(activity)}>Modificar</ModifyButton>
                </ActivityTableCell>
                <ActivityTableCell>
                  <DeleteButton onClick={() => handleDeleteActivity(activity.id)}>Eliminar</DeleteButton>
                </ActivityTableCell>
              </ActivityTableRow>
            ))}
          </ActivityTableBody>
        </ActivityTable>
      </ActivityListWrapper>



      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Editar Actividad"
        ariaHideApp={false}
        style={ModalWrapper}
      >
        <ModalHeader>
          <h2>Modificar Actividad</h2>
          <CloseButton onClick={handleCloseModal}>×</CloseButton>
        </ModalHeader>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
        />
        <Input
          type="text"
          value={activity}
          onChange={handleActivityChange}
          placeholder="Actividad"
        />
        <ModalButton onClick={handleSaveEdit}>Guardar Cambios</ModalButton>
      </ReactModal>

      <Footer>
        <p>© 2024 Fabrizzio Soft Solutions. Todos los derechos reservados.</p>
      </Footer>

    </Container >
  );
}

export default ActividadesPage;
