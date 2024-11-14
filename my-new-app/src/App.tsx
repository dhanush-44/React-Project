import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { TableProvider } from './context/tablecontext';
import { LoadingProvider } from './context/loadingcontext';
import { useLoading } from './context/loadingcontext';
import Login from './pages/login';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Users from './pages/users';
import LoadingSpinner from './components/loadingpage';

function App() {
  return (
    <LoadingProvider>
      <Router>
        <TableProvider>
          <AppContent />
        </TableProvider>
      </Router>
    </LoadingProvider>
  );
}

const AppContent = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && <LoadingSpinner />} 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
};

export default App;
