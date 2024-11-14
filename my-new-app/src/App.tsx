import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { TableProvider } from './context/tablecontext';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Users from './pages/users';

function App() {
  return (
    <Router>
      <TableProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </TableProvider>
    </Router>
  );
}

export default App;
