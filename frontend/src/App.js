import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';
import DeleteTransaction from './components/DeleteTransaction';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <TransactionList />
              </ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            } />
            <Route path="/:id/edit" element={
              <ProtectedRoute>
                <EditTransaction />
              </ProtectedRoute>
            } />
            <Route path="/:id/delete" element={
              <ProtectedRoute>
                <DeleteTransaction />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;






