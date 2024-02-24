// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyTable from './components/MyTable';
import AuthSuccess from './components/AuthSuccess'; // Component to handle successful authentication
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/auth/success' element={<AuthSuccess />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<MyTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
