import { useState } from 'react';
import { Link } from 'react-router-dom';

function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. PEGA TU KEY DE WEATHERAPI.COM AQUÍ (Se activa al instante)
  const API_KEY = '38c7f8c4bbec452589c234911251911'; 

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;
    
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      // La URL cambia ligeramente
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=es`
      );
      
      if (!response.ok) {
        throw new Error("Ciudad no encontrada");
      }

      const data = await response.json();
      setWeather(data);
      
    } catch (err) {
      setError("No se encontró la ciudad o hubo un error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
       <nav><Link to="/dashboard">← Volver al Dashboard</Link></nav>
       <h1>App del Clima</h1>

       {/* Aviso si falta la key */}
       {API_KEY === 'TU_NUEVA_API_KEY_AQUI' && (
         <p style={{color:'red'}}>⚠️ Falta pegar tu API Key de WeatherAPI</p>
       )}

       <form onSubmit={getWeather}>
         <input 
           type="text" 
           placeholder="Escribe una ciudad (ej. Madrid, Lima...)" 
           value={city}
           onChange={(e) => setCity(e.target.value)}
         />
         <button type="submit" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
         </button>
       </form>

       {error && <p style={{ color: '#ff6464' }}>{error}</p>}

       {weather && (
         <div className="weather-result">
           {/* WeatherAPI devuelve la estructura diferente: location y current */}
           <h2>{weather.location.name}, {weather.location.country}</h2>
           
           <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
             <img src={weather.current.condition.icon} alt="icono clima" />
             <p className="temp">{Math.round(weather.current.temp_c)}°C</p>
           </div>

           <p>{weather.current.condition.text}</p>
           <p>Humedad: {weather.current.humidity}%</p>
           <p>Viento: {weather.current.wind_kph} km/h</p>
         </div>
       )}
    </div>
  );
}

export default WeatherPage;