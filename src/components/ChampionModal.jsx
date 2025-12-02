import { useState, useEffect } from 'react';
import "../App.css";

function ChampionModal({ championId, version, onClose }) {
  const [championData, setChampionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Este useEffect se ejecuta CADA VEZ que el 'championId' cambia
  useEffect(() => {
    // Evita hacer fetch si no hay ID
    if (!championId) return;

    const fetchChampionDetails = async () => {
      setLoading(true);
      setError(null);
      setChampionData(null); // Limpia datos anteriores
      
      const URL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/es_MX/champion/${championId}.json`;

      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('No se pudo cargar la información del campeón.');
        }
        const data = await response.json();
        
        // El campeón viene dentro de la propiedad "data"
        const championDetails = data.data[championId];
        setChampionData(championDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionDetails();
  }, [championId, version]); // Dependencias

  // Función para que al hacer clic en el fondo, se cierre el modal
  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times; {/* Este es el símbolo 'x' */}
        </button>

        {/* Mostramos estados de carga/error DENTRO del modal */}
        {loading && <div className="status-message">Cargando...</div>}
        {error && <div className="status-message error">{error}</div>}

        {/* Si tenemos datos, los mostramos */}
        {championData && (
          <>
            {/* Imagen Splash */}
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`}
              alt={`${championData.name} Splash Art`}
              className="modal-splash"
            />
            
            <div className="modal-header">
              <h2>{championData.name}</h2>
              <h3>{championData.title}</h3>
            </div>

            {/* Lore */}
            <div className="modal-section">
              <h4>Lore</h4>
              <p className="modal-lore">{championData.lore}</p>
            </div>

            {/* Habilidades */}
            <div className="modal-section">
              <h4>Habilidades</h4>
              <div className="abilities-grid">
                
                {/* Pasiva */}
                <div className="ability-card">
                  <img 
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${championData.passive.image.full}`} 
                    alt={championData.passive.name} 
                  />
                  <div>
                    <strong>{championData.passive.name} (Pasiva)</strong>
                    {/* Quitamos etiquetas HTML de la descripción */}
                    <p dangerouslySetInnerHTML={{ __html: championData.passive.description }} />
                  </div>
                </div>

                {/* Habilidades (Q, W, E, R) */}
                {championData.spells.map((spell) => (
                  <div className="ability-card" key={spell.id}>
                    <img 
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`} 
                      alt={spell.name} 
                    />
                    <div>
                      <strong>{spell.name} ({spell.id.slice(-1)})</strong>
                      <p dangerouslySetInnerHTML={{ __html: spell.description }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ChampionModal;