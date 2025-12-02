import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem('activeUser');

  const handleLogout = () => {
    // Borramos la sesión activa
    localStorage.removeItem('activeUser');
    // (Opcional) Si quieres borrar también el registro, usa localStorage.clear()
    
    navigate('/'); // Redirige al login
  };

  return (
    <div className="dashboard-container">
      <header>
        <h2>Hola, <span style={{color: '#64ffda'}}>{user}</span></h2>
        <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
      </header>
      
      <h1>Selecciona una Aplicación</h1>
      
      <div className="app-options">
        <Link to="/lol" className="app-card lol-theme">
          <h3>League of Legends</h3>
          <p>Buscador de Campeones</p>
        </Link>

        <Link to="/movies" className="app-card movie-theme">
          <h3>Películas</h3>
          <p>Cartelera TMDB</p>
        </Link>

        <Link to="/weather" className="app-card weather-theme">
          <h3>Clima</h3>
          <p>Consultar el tiempo</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;