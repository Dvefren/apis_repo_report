import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function LoginPage() {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [isRegistering, setIsRegistering] = useState(false); // ¿Está en modo registro?
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Si ya hay una sesión activa, redirigir al dashboard automáticamente
  useEffect(() => {
    const activeUser = localStorage.getItem('activeUser');
    if (activeUser) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // --- LÓGICA DE REGISTRO ---
    if (isRegistering) {
      if (username.trim() === '' || password.trim() === '') {
        setError('Todos los campos son obligatorios');
        return;
      }
      
      // Guardamos el usuario "en la base de datos" (LocalStorage)
      // OJO: En un app real, esto se envía a un servidor backend.
      const userData = { username, password };
      localStorage.setItem('registeredUser', JSON.stringify(userData));
      
      alert('Usuario registrado con éxito. ¡Ahora inicia sesión!');
      setIsRegistering(false); // Cambiar a modo Login
      setPassword(''); // Limpiar contraseña
    } 
    
    // --- LÓGICA DE LOGIN ---
    else {
      // 1. Recuperar el usuario registrado
      const storedUserStr = localStorage.getItem('registeredUser');
      
      if (!storedUserStr) {
        setError('No hay usuarios registrados. Crea una cuenta primero.');
        return;
      }

      const storedUser = JSON.parse(storedUserStr);

      // 2. Validar credenciales
      if (username === storedUser.username && password === storedUser.password) {
        // 3. Crear "Sesión"
        localStorage.setItem('activeUser', username);
        navigate('/dashboard');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    }
  };

  return (
    <div className="login-container">
      <h1>{isRegistering ? 'Crear Cuenta' : 'Bienvenido'}</h1>
      
      <form onSubmit={handleSubmit} className="login-form">
        <input 
          type="text" 
          placeholder="Usuario" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button type="submit">
          {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
        </button>

        {error && <p style={{ color: '#ff6464', fontSize: '0.9rem' }}>{error}</p>}
      </form>

      <p style={{ marginTop: '1rem', color: '#8892b0' }}>
        {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
        <button 
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
          }}
          style={{ background: 'none', color: '#64ffda', padding: '0 5px', textDecoration: 'underline' }}
        >
          {isRegistering ? 'Inicia Sesión' : 'Regístrate aquí'}
        </button>
      </p>
    </div>
  );
}

export default LoginPage;