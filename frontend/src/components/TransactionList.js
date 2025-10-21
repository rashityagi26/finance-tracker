import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { transactionAPI } from '../services/api';
import Header from './Header';

const TransactionList = () => {
  const location = useLocation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchTransactions();
    
    // Check for success message from navigation state
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clear the message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
      // Clear the location state to prevent message from showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const calculateTotal = () => {
    return transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  if (loading) {
    return (
      <div className="loading">
        <h3>Loading transactions...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Error</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchTransactions}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <Header 
        title="💰 Your Financial Dashboard" 
        subtitle="Track, manage, and optimize your money flow" 
      />
      
      <div className="container">
        <div className="navigation">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Link to="/" className="active">📊 All Transactions</Link>
              <Link to="/add">➕ Add Transaction</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#667eea', fontWeight: '600' }}>
                💰 Total Balance: {formatAmount(calculateTotal())}
              </span>
            </div>
          </div>
        </div>

      {successMessage && (
        <div className="success">
          {successMessage}
        </div>
      )}

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Transaction History</h2>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: calculateTotal() >= 0 ? '#28a745' : '#dc3545' }}>
              {formatAmount(calculateTotal())}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Total Balance</div>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="empty-state">
            <h3>No transactions found</h3>
            <p>Start by adding your first transaction!</p>
            <Link to="/add" className="btn btn-primary">
              Add Transaction
            </Link>
          </div>
        ) : (
          <div>
            {transactions.map((transaction) => (
              <div key={transaction._id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-title">{transaction.title}</div>
                  <div className="transaction-details">
                    <span>📅 {formatDate(transaction.date)}</span>
                    <span>🏷️ {transaction.category}</span>
                  </div>
                </div>
                <div className="transaction-amount">
                  <span className={transaction.amount >= 0 ? 'amount-positive' : 'amount-negative'}>
                    {formatAmount(transaction.amount)}
                  </span>
                </div>
                <div className="transaction-actions">
                  <Link 
                    to={`/${transaction._id}/edit`} 
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>
                  <Link 
                    to={`/${transaction._id}/delete`} 
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default TransactionList;
