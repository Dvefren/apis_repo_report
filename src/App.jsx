import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import LolPage from './components/LolPage'; 
import MoviesPage from './components/MoviesPage';
import WeatherPage from './components/WeatherPage';
import './App.css';

// --- COMPONENTE DE PROTECCIÓN ---
// Verifica si existe 'activeUser' en localStorage.
// Si existe, muestra el contenido (children). Si no, redirige a Login.
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('activeUser');
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Rutas Protegidas (Envueltas en ProtectedRoute) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/lol" element={
          <ProtectedRoute>
            <LolPage />
          </ProtectedRoute>
        } />
        
        <Route path="/movies" element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        } />
        
        <Route path="/weather" element={
          <ProtectedRoute>
            <WeatherPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;