import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import EditTransaction from './components/EditTransaction';
import DeleteTransaction from './components/DeleteTransaction';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div className="header">
            <h1>💰 Finance Tracker</h1>
            <p>Track your income and expenses with ease</p>
          </div>
          
          <Routes>
            <Route path="/" element={<TransactionList />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/:id/edit" element={<EditTransaction />} />
            <Route path="/:id/delete" element={<DeleteTransaction />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;






