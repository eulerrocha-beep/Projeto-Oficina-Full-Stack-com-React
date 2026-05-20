import '../styles/Veiculos.css';

import { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import api from '../services/api';


export default function Veiculos() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [veiculos, setVeiculos] = useState([]);

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [ano, setAno] = useState('');

    useEffect(() => {

        carregarVeiculos();

    }, []);

    async function carregarVeiculos() {

        try {

            const res = await api.get(`/veiculos/cliente/${id}`);

            setVeiculos(res.data);

        } catch (error) {

            console.error(error);
        }
    }

    async function cadastrarVeiculo(e) {

        e.preventDefault();

        try {

            await api.post('/veiculos', {
                marca,
                modelo,
                placa,
                ano,
                clienteId: Number(id)
            });

            setMarca('');
            setModelo('');
            setPlaca('');
            setAno('');

            carregarVeiculos();

        } catch (error) {

            console.error(error);

            alert('Erro ao cadastrar veículo');
        }
    }

    async function deletarVeiculo(idVeiculo) {

        try {

            await api.delete(
                `/veiculos/${idVeiculo}`
            );

            carregarVeiculos();

        } catch (error) {

            console.error(error);

            alert('Erro ao deletar veículo');
        }
    }

    return (

        <div className="veiculos-container">

            <div className="veiculos-header">

                <h1>
                    Veículos do Cliente #{id}
                </h1>

                <button
                    className="btn-voltar"
                    onClick={() => navigate('/clientes')}
                >
                    Voltar
                </button>

            </div>

            <form
                className="veiculo-form"
                onSubmit={cadastrarVeiculo}
            >

                <input
                    placeholder="Marca"
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                />

                <input
                    placeholder="Modelo"
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}
                />

                <input
                    placeholder="Placa"
                    value={placa}
                    onChange={e => setPlaca(e.target.value)}
                />

                <input
                    placeholder="Ano"
                    value={ano}
                    onChange={e => setAno(e.target.value)}
                />

                <button className="btn-cadastrar">
                    Cadastrar Veículo
                </button>

            </form>

            <div className="veiculos-lista">

                {veiculos.map(v => (

                    <div
                        className="veiculo-card"
                        key={v.id}
                    >

                        <h3>
                            {v.marca} {v.modelo}
                        </h3>

                        <p>
                            Placa: {v.placa}
                        </p>

                        <p>
                            Ano: {v.ano}
                        </p>

                        <button
                            className="btn-delete"
                            onClick={() => deletarVeiculo(v.id)}
                        >
                            Deletar
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}