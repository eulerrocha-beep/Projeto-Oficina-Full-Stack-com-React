import '../styles/Ordem.css'

import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import api from '../services/api'

export default function OrdemServico() {

    const [clienteId, setClienteId] =
        useState('');

    const [clientes, setClientes] =
        useState([]);

    const [veiculos, setVeiculos] =
        useState([]);

    const [veiculoId, setVeiculoId] =
        useState('');

    const [descricao, setDescricao] =
        useState('');

    const [valor, setValor] =
        useState('');

    const [status, setStatus] =
        useState('ABERTA');

    const [observacoes, setObservacoes] =
        useState('');

    const [ordens, setOrdens] =
        useState([])

    const navigate = useNavigate();

    useEffect(() => {
        carregarOrdens();
        carregarClientes();
        carregarVeiculos();
    }, []);


    

    async function carregarOrdens() {
        try {

            const res = await api.get('/ordens');

            setOrdens(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function deletarOrdem(id) {
        try {
            await api.delete(`/ordens/${id}`)
            carregarOrdens();
        } catch (error) {
            console.error(error);
            alert('Erro ao deletar OS')
        }
    }

    async function criarOrdem(e) {

        e.preventDefault();

        try {

            await api.post('/ordens', {

                clienteId: Number(clienteId),

                veiculoId: Number(veiculoId),

                descricao,

                valor: Number(valor),

                status,

                observacoes

            });

            carregarOrdens();

            setDescricao('');
            setValor('');
            setObservacoes('');

        } catch (error) {

            console.error(error);

            alert('Erro ao criar ordem');
        }
    }

    async function carregarClientes() {

        try {

            const res = await api.get('/clientes');

            setClientes(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    async function carregarVeiculos() {
        try {

            const res = await api.get('/veiculos');

            setVeiculos(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function atualizarStatus(id, novoStatus) {

        try {

            await api.put(`/ordens/${id}/status`, {
                status: novoStatus
            });

            carregarOrdens();

        } catch (error) {
            console.error(error);

            alert('Erro ao atualizar status')
        }
    }


    return (

        <div className="ordem-page">

            <header className='dashboard'>

                <h1>
                    Dashboard Oficina
                </h1>

                <div className='dashboard-buttons'>

                    <button
                        className='voltar'
                        onClick={() =>
                            navigate('/dashboard')
                        }
                    >
                        Voltar
                    </button>

                </div>

            </header>

            <main className="ordem-content">

                <div className="ordem-form-container">

                    <h1>
                        Nova Ordem de Serviço
                    </h1>

                    <form
                        className="ordem-form"
                        onSubmit={criarOrdem}
                    >

                        <select
                            value={clienteId}
                            onChange={(e) =>
                                setClienteId(e.target.value)
                            }
                        >

                            <option value="">
                                Selecione o cliente
                            </option>

                            {clientes.map(cliente => (

                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >

                                    {cliente.nome}

                                </option>

                            ))}

                        </select>

                        <select
                            value={veiculoId}
                            onChange={(e) =>
                                setVeiculoId(e.target.value)
                            }
                        >

                            <option value="">
                                Selecione o veículo
                            </option>

                            {veiculos.map(veiculo => (

                                <option
                                    key={veiculo.id}
                                    value={veiculo.id}
                                >

                                    {veiculo.modelo}
                                    - {veiculo.placa}

                                </option>

                            ))}

                        </select>

                        <textarea
                            placeholder="Descrição do problema"
                            value={descricao}
                            onChange={(e) =>
                                setDescricao(e.target.value)
                            }
                        />

                        <input
                            type="number"
                            placeholder="Valor"
                            value={valor}
                            onChange={(e) =>
                                setValor(e.target.value)
                            }
                        />

                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value)
                            }
                        >

                            <option value="ABERTA">
                                ABERTA
                            </option>

                            <option value="EM ANDAMENTO">
                                EM ANDAMENTO
                            </option>

                            <option value="FINALIZADA">
                                FINALIZADA
                            </option>

                        </select>

                        <textarea
                            placeholder="Observações"
                            value={observacoes}
                            onChange={(e) =>
                                setObservacoes(e.target.value)
                            }
                        />

                        <button>
                            Criar Ordem
                        </button>

                    </form>

                </div>

                <div className="ordens-lista">

                    {ordens.map(ordem => (

                        <div
                            className="ordem-card"
                            key={ordem.id}
                        >

                            <h3>
                                OS # {ordem.id}
                            </h3>

                            <p>
                                Cliente: {ordem.cliente.nome}
                            </p>

                            <p>
                                Veículo: {ordem.veiculo.modelo}
                            </p>

                            <p>
                                Status: {ordem.status}
                            </p>

                            <p>
                                Valor: R$ {ordem.valor}
                            </p>

                            <p>
                                {ordem.descricao}
                            </p>

                            <div className="acoes">

                                <button
                                    className='start'
                                    onClick={() =>
                                        atualizarStatus(
                                            ordem.id,
                                            'EM ANDAMENTO'
                                        )
                                    }
                                >
                                    Iniciar
                                </button>

                                <button
                                    className='stop'
                                    onClick={() =>
                                        atualizarStatus(
                                            ordem.id,
                                            'FINALIZADA'
                                        )
                                    }
                                >
                                    Finalizar
                                </button>

                            </div>

                            <button
                                className="btn-delete"
                                onClick={() =>
                                    deletarOrdem(ordem.id)
                                }
                            >

                                🗑️

                            </button>

                        </div>

                    ))}

                </div>

            </main>

        </div>
    )
}