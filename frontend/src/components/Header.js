import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = ({ title, subtitle }) => {
  const { user, logout } = useAuth();

  return (
    <div className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon">💰</div>
            <h1 className="logo-text">FinanceFlow</h1>
          </div>
          {title && (
            <div className="page-title">
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
          )}
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <span className="user-name">👋 Hi, {user?.name}</span>
            <button 
              className="btn btn-secondary btn-sm logout-btn"
              onClick={logout}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
