import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import './DatePickerStyles.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  min-height: 100vh;
  padding: 20px;
`;

const Header = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const DatePickerWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center; /* Center the items horizontally */
`;

const Label = styled.label`
  margin-right: 10px; /* Space between label and date picker */
  color: #333;
`;

const ActivityInputWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
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

  &:hover {
    background-color: #0056b3;
  }
`;

const ActivityListWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
  max-width: 600px;
`;

const ActivityList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ActivityListItem = styled.li`
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ActivityDate = styled.strong`
  color: #333;
`;

const MonthHeader = styled.h3`
  color: #555;
  margin: 20px 0 10px;
`;

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activity, setActivity] = useState('');
  const [activities, setActivities] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleAddActivity = () => {
    const newActivity = { date: selectedDate, activity };
    setActivities([...activities, newActivity]);
    setActivity('');
  };

  const getMonthYear = (date) => {
    const options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('es-ES', options);
  };

  const groupedActivities = activities.reduce((acc, activity) => {
    const monthYear = getMonthYear(new Date(activity.date));
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(activity);
    return acc;
  }, {});

  return (
    <Container>
      <Header>Registro de Actividades Diarias</Header>

      <DatePickerWrapper>
        <Label htmlFor="date-picker">Selecciona una Fecha:</Label>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="custom-datepicker"
        />
      </DatePickerWrapper>

      <ActivityInputWrapper>
        <Input
          type="text"
          value={activity}
          onChange={handleActivityChange}
          placeholder="Escribe tu actividad"
        />
        <Button onClick={handleAddActivity}>Agregar Actividad</Button>
      </ActivityInputWrapper>

      <ActivityListWrapper>
        <h2>Actividades Guardadas</h2>
        {Object.keys(groupedActivities).map((monthYear, index) => (
          <div key={index}>
            <MonthHeader>{monthYear}</MonthHeader>
            <ActivityList>
              {groupedActivities[monthYear].map((item, idx) => (
                <ActivityListItem key={idx}>
                  <ActivityDate>{new Date(item.date).toLocaleDateString('es-ES')}</ActivityDate>: {item.activity}
                </ActivityListItem>
              ))}
            </ActivityList>
          </div>
        ))}
      </ActivityListWrapper>
    </Container>
  );
}

export default App;
