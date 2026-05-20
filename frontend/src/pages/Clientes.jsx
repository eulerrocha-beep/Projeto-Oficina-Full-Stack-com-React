import { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Clientes.css'

export default function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  useEffect(() => {
    carregarClientes();
  }, []);

  async function carregarClientes() {
    const res = await api.get('/clientes');
    setClientes(res.data);
  }

  async function criarCliente(e) {
    e.preventDefault();


    await api.post('/clientes', { nome, email, telefone });

    setNome('');
    setEmail('');
    setTelefone('');

    carregarClientes();
  }

  async function deletarCliente(id) {
    try {
      await api.delete(`/clientes/${id}`);
      carregarClientes();
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar cliente');
    }
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  return (
    <div className='cliente'>
      <div className='header'>
        <h2>Clientes</h2>

        <p>Total clientes: {clientes.length}</p>

        <div className='forms'>

          <form onSubmit={criarCliente}>

            <input
              placeholder="Nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              placeholder="Telefone"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />

            <div className='form-buttons'>

              <button type="submit">
                Cadastrar
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
              >
                Voltar
              </button>

            </div>

          </form>

        </div>
      </div>
      <div className='all-clientes'>

        {clientes.map(c => (

          <div
            className='cliente-card'
            key={c.id}
          >

            <div className='cliente-info'>

              <h3>
                {c.nome}
              </h3>

              <p>
                {c.email}
              </p>

            </div>

            <div className='cliente-buttons'>

              <button
                className='btn-veiculos'
                onClick={() =>
                  navigate(`/clientes/${c.id}/veiculos`)
                }
              >
                Ver Veículos
              </button>

              <button
                className='btn-delete'
                onClick={() =>
                  deletarCliente(c.id)
                }
              >
                Deletar
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  )
}