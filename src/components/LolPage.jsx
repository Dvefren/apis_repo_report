import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChampionModal from './ChampionModal'; // Asegúrate de que este archivo esté en la carpeta components también
// Si ChampionModal está fuera de 'components', usa: import ChampionModal from '../ChampionModal';

// Como movimos el archivo, tenemos que subir un nivel (..) para encontrar el CSS
import '../App.css'; 

const LOL_VERSION = '14.9.1';
const CHAMPIONS_LIST_URL = `https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}/data/es_MX/champion.json`;

function LolPage() {
  const [allChampions, setAllChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el Modal
  const [selectedChampionId, setSelectedChampionId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await fetch(CHAMPIONS_LIST_URL);
        if (!response.ok) {
          throw new Error('Error al conectar con la API');
        }
        const data = await response.json();
        const championsArray = Object.values(data.data);
        setAllChampions(championsArray);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChampions();
  }, []);

  const handleChampionClick = (championId) => {
    setSelectedChampionId(championId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChampionId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredChampions = allChampions.filter((champion) =>
    champion.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="App">
        <nav><Link to="/dashboard">← Volver al Dashboard</Link></nav>
        <div className="status-message">Cargando campeones...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <nav><Link to="/dashboard">← Volver al Dashboard</Link></nav>
        <div className="status-message error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Botón para regresar */}
      <nav style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <Link to="/dashboard" style={{ color: '#64ffda', textDecoration: 'none', fontSize: '1.1rem' }}>
           ← Volver al Dashboard
        </Link>
      </nav>

      <h1>Buscador de Campeones</h1>
      <h2>League of Legends</h2>
      
      <input
        type="text"
        placeholder="Buscar campeón (ej. Ahri, Zed...)"
        className="search-bar"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className="champion-grid">
        {filteredChampions.length > 0 ? (
          filteredChampions.map((champion) => (
            <div
              className="champion-card"
              key={champion.id}
              onClick={() => handleChampionClick(champion.id)}
            >
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${LOL_VERSION}/img/champion/${champion.id}.png`}
                alt={champion.name}
              />
              <h3>{champion.name}</h3>
              <p>{champion.title}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron campeones con ese nombre.</p>
        )}
      </div>

      {isModalOpen && (
        <ChampionModal
          championId={selectedChampionId}
          version={LOL_VERSION}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default LolPage;