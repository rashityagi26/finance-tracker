import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { transactionAPI } from '../services/api';

const DeleteTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  const fetchTransaction = async () => {
    try {
      setFetching(true);
      setError(null);
      const response = await transactionAPI.getById(id);
      setTransaction(response.data);
    } catch (err) {
      setError('Failed to fetch transaction. Please try again.');
      console.error('Error fetching transaction:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await transactionAPI.delete(id);
      navigate('/', { state: { message: 'Transaction deleted successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete transaction. Please try again.');
      console.error('Error deleting transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  if (fetching) {
    return (
      <div className="loading">
        <h3>Loading transaction...</h3>
      </div>
    );
  }

  if (error && !transaction) {
    return (
      <div className="error">
        <h3>Error</h3>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchTransaction}>
          Try Again
        </button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="error">
        <h3>Transaction not found</h3>
        <p>The transaction you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Transactions
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="navigation">
        <Link to="/">All Transactions</Link>
        <Link to="/add">Add Transaction</Link>
        <Link to="/" className="active">Delete Transaction</Link>
      </div>

      <div className="card">
        <h2>Delete Transaction</h2>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#dc3545' }}>
            ⚠️ Are you sure you want to delete this transaction? This action cannot be undone.
          </p>
          
          <div className="transaction-item" style={{ marginBottom: '1rem' }}>
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
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Yes, Delete Transaction'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransaction;






