import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login({ setToken }) {

  const navigate = useNavigate(); // 👈 AQUI

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    console.log('clicou login');

    try {
      const res = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/clientes');
      navigate('/dashboard'); 
    } catch (error) {
      console.error('erro login:', error);

      alert('Erro no login');
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}