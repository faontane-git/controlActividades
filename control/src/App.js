// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/pages/Home/HomePage';
import ActividadesPage from './pages/Actividades/ActividadesPage';
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/actividades/:month" element={<ActividadesPage />} />
      </Routes>
    </Router>
  );
}

export default App;

 