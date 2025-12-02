import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Aseguramos que cargue los estilos

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // ⚠️ RECUERDA PEGAR TU API KEY REAL AQUÍ
  const API_KEY = 'c51eff3ebf7fda5095334ba9c9a66e41'; 

  // URL base para imágenes
  const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
  
  // URLs de la API
  const API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`;
  const API_SEARCH = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-MX&query=`;

  // Cargar películas populares al iniciar
  useEffect(() => {
    getMovies(API_POPULAR);
  }, []);

  // Función genérica para obtener películas (sirve para populares y búsqueda)
  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Manejar el envío del formulario de búsqueda
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      // Si hay texto, buscamos usando el endpoint de búsqueda
      getMovies(API_SEARCH + searchTerm);
    } else {
      // Si borran el texto y dan enter, volvemos a mostrar las populares
      getMovies(API_POPULAR);
    }
  };

  return (
    <div className="App"> {/* Usamos la clase App para centrar todo igual que en LoL */}
      <nav style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <Link to="/dashboard" style={{ color: '#64ffda', textDecoration: 'none' }}>
          ← Volver al Dashboard
        </Link>
      </nav>

      <h1>Cartelera de Cine</h1>
      
      {/* Formulario de Búsqueda */}
      <form onSubmit={handleSearch} style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Buscar película (ej. Matrix, Avengers...)" 
          className="search-bar" // Reutilizamos el estilo del buscador de LoL
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Grid de Películas */}
      <div className="grid-movies">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              {/* Validamos si la película tiene imagen, si no, mostramos un gris */}
              {movie.poster_path ? (
                <img src={IMG_PATH + movie.poster_path} alt={movie.title} />
              ) : (
                <div className="no-image">Sin Imagen</div>
              )}
              
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <span className={`tag ${movie.vote_average >= 8 ? 'green' : 'orange'}`}>
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron películas.</p>
        )}
      </div>
    </div>
  );
}

export default MoviesPage;