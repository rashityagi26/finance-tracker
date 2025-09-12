# 💰 Personal Finance Tracker

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) for tracking personal income and expenses with full CRUD functionality.

## 🚀 Features

- **Add Transactions**: Create new income or expense entries
- **View All Transactions**: See all your financial transactions in one place
- **Edit Transactions**: Update existing transaction details
- **Delete Transactions**: Remove transactions you no longer need
- **Real-time Balance**: See your current financial balance
- **Category Management**: Organize transactions by categories
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - Frontend library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd finance-tracker
```

### 2. Install Dependencies

Install dependencies for both backend and frontend:

```bash
# Install root dependencies
npm install

# Install all dependencies (backend + frontend)
npm run install-all
```

Or install them separately:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 3. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (macOS/Linux)
sudo systemctl start mongod
```

The application will connect to MongoDB at `mongodb://localhost:27017/finance-tracker` by default.

### 4. Environment Configuration

Create a `.env` file in the backend directory:

```bash
cd backend
touch .env
```

Add the following environment variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-tracker
```

## 🏃‍♂️ Running the Application

### Development Mode (Recommended)

Run both backend and frontend concurrently:

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

### Running Separately

If you prefer to run them separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

## 📱 Usage

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Add a transaction** by clicking "Add Transaction"
3. **View all transactions** on the home page
4. **Edit transactions** by clicking the "Edit" button
5. **Delete transactions** by clicking the "Delete" button

### Transaction Fields

- **Title**: Description of the transaction (e.g., "Grocery Shopping")
- **Amount**: Positive for income, negative for expenses
- **Date**: When the transaction occurred
- **Category**: Predefined categories like Food, Transportation, etc.

## 🗂️ Project Structure

```
finance-tracker/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   └── Transaction.js       # Transaction schema
│   ├── routes/
│   │   └── transactions.js      # API routes
│   ├── package.json
│   └── server.js               # Express server
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TransactionList.js
│   │   │   ├── AddTransaction.js
│   │   │   ├── EditTransaction.js
│   │   │   └── DeleteTransaction.js
│   │   ├── services/
│   │   │   └── api.js          # API service
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── package.json
└── README.md
```

## 🔌 API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get single transaction
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/health` - Health check

## 🎨 Customization

### Adding New Categories

To add new transaction categories, update the category options in:
- `frontend/src/components/AddTransaction.js`
- `frontend/src/components/EditTransaction.js`

### Styling

The application uses custom CSS. You can modify the styles in:
- `frontend/src/index.css`

### Database Schema

The transaction schema can be modified in:
- `backend/models/Transaction.js`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection string in your `.env` file

2. **Port Already in Use**
   - Change the PORT in your `.env` file
   - Kill processes using the ports: `lsof -ti:5000 | xargs kill -9`

3. **CORS Issues**
   - The backend is configured to allow CORS from `http://localhost:3000`
   - Check the CORS configuration in `backend/server.js`

4. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with the MERN stack
- Icons from Unicode emojis
- Styling inspired by modern web design principles

---

**Happy Tracking! 💰📊**






