import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import LolPage from './components/LolPage';
import MoviesPage from './components/MoviesPage';
import WeatherPage from './components/WeatherPage';
import './App.css';

// --- COMPONENTE DE PROTECCIÓN (GUARDIÁN) ---
// Verifica si el usuario ha iniciado sesión.
// Si hay usuario en localStorage, muestra el contenido (children).
// Si no, lo redirige a la página de inicio (Login).
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('activeUser');
  if (!user) {
    // 'replace' evita que el usuario pueda volver atrás con el botón del navegador
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    // Usamos HashRouter en lugar de BrowserRouter para compatibilidad con GitHub Pages
    <HashRouter>
      <Routes>
        {/* Ruta pública: Login (Raíz) */}
        <Route path="/" element={<LoginPage />} />
        
        {/* --- RUTAS PROTEGIDAS --- */}
        
        {/* Dashboard Principal */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* App de League of Legends */}
        <Route path="/lol" element={
          <ProtectedRoute>
            <LolPage />
          </ProtectedRoute>
        } />
        
        {/* App de Películas */}
        <Route path="/movies" element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        } />
        
        {/* App del Clima */}
        <Route path="/weather" element={
          <ProtectedRoute>
            <WeatherPage />
          </ProtectedRoute>
        } />

      </Routes>
    </HashRouter>
  );
}

export default App;