import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { transactionAPI } from '../services/api';

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    date: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  

  const fetchTransaction = async () => {
    try {
      setFetching(true);
      setError(null);
      const response = await transactionAPI.getById(id);
      const transaction = response.data;
      
      setFormData({
        title: transaction.title,
        amount: transaction.amount.toString(),
        date: new Date(transaction.date).toISOString().split('T')[0],
        category: transaction.category
      });
    } catch (err) {
      setError('Failed to fetch transaction. Please try again.');
      console.error('Error fetching transaction:', err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [fetchTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.amount || formData.amount === '0') {
      setError('Amount is required and cannot be zero');
      return;
    }
    if (!formData.category.trim()) {
      setError('Category is required');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };
      
      await transactionAPI.update(id, transactionData);
      navigate('/', { state: { message: 'Transaction updated successfully!' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update transaction. Please try again.');
      console.error('Error updating transaction:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (fetching) {
    return (
      <div className="loading">
        <h3>Loading transaction...</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="navigation">
        <Link to="/">All Transactions</Link>
        <Link to="/add">Add Transaction</Link>
        <Link to="/" className="active">Edit Transaction</Link>
      </div>

      <div className="card">
        <h2>Edit Transaction</h2>
        
        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery shopping, Salary, etc."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="amount">Amount *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-control"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                required
              />
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                Use positive for income, negative for expenses (amount in ₹)
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Income">Income</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Bills & Utilities">Bills & Utilities</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Transaction'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;






