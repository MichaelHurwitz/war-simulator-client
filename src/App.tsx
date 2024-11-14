import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StorePage from './pages/StorePage';
import NavBar from './components/NavBar';
import { FC } from 'react';

const App: FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/store" element={<StorePage />} />
      </Routes>
    </Router>
  );
};

export default App;
