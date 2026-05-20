import { use, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboardstyle.css';

import MetricCard from '../components/MetricCards';

import { FaCar, FaUsers, FaTools, FaClipboardList, FaMoneyBill } from 'react-icons/fa';
import OrdemServico from './Ordem';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { date } from 'zod';

export default function Dashboard() {

    const [clientes, setClientes] = useState([]);
    const [user, setUser] = useState(null);
    const [veiculos, setVeiculos] = useState([]);
    const navigate = useNavigate();
    const [ordens, setOrdens] = useState([])

    //    Faturamento Total da empresa

    const faturamento = ordens.filter(ordem =>
        ordem.status === 'FINALIZADA'
    )
        .reduce((total, ordem) => total + ordem.valor, 0);

    //    Serviços total Finalizados

    const servicoTotais = ordens.filter(ordem =>
        ordem.status === 'FINALIZADA'
    ).length


    const dadosGrafico = [

        {
            nome: 'Clientes',
            total: clientes.length
        },

        {
            nome: 'Veículos',
            total: veiculos.length
        },

        {
            nome: 'OS',
            total: ordens.length
        },

        {
            nome: 'Serviços',
            total: servicoTotais
        },

        {
            nome: 'Faturamento',
            total: faturamento
        }

    ];

    const hoje = new Date();

    const mesAtual = hoje.getMonth();

    const anoAtual = hoje.getFullYear();

    // Percentual de crescimento de faturamento

    const ordensFinalizadas =
        ordens.filter(
            ordem =>
                ordem.status === 'FINALIZADA'
        );

    const faturamentoMesAtual =
        ordensFinalizadas
            .filter(ordem => {

                const data =
                    new Date(ordem.createdAt);

                return (
                    data.getMonth() === mesAtual &&
                    data.getFullYear() === anoAtual
                );
            })
            .reduce(
                (total, ordem) =>
                    total + ordem.valor,
                0
            );

    const faturamentoMesAnterior =
        ordensFinalizadas
            .filter(ordem => {

                const data =
                    new Date(ordem.createdAt);

                return (
                    data.getMonth() ===
                    mesAtual - 1 &&
                    data.getFullYear() ===
                    anoAtual
                );
            })
            .reduce(
                (total, ordem) =>
                    total + ordem.valor,
                0
            );

    const porcentagemCrescimento =
        faturamentoMesAnterior > 0

            ? (
                (
                    faturamentoMesAtual -
                    faturamentoMesAnterior
                ) /
                faturamentoMesAnterior
            ) * 100

            : 0;

    const aumentou =
        faturamentoMesAtual >
        faturamentoMesAnterior;

    // Percentual de crescimento de Clientes

    const clientesMesAtual =
        clientes.filter(cliente => {

            const data =
                new Date(cliente.createdAt);

            return (
                data.getMonth() === mesAtual &&
                data.getFullYear() === anoAtual
            );
        }).length;

    const clientesMesAnterior =
        clientes.filter(cliente => {

            const data =
                new Date(cliente.createdAt);

            return (
                data.getMonth() === mesAtual - 1 &&
                data.getFullYear() === anoAtual
            );
        }).length;

    const crescimentoClientes =
        clientesMesAnterior > 0

            ? (
                (
                    clientesMesAtual -
                    clientesMesAnterior
                ) /
                clientesMesAnterior
            ) * 100

            : 0;

    const clientesAumentaram =
        clientesMesAtual >
        clientesMesAnterior;

    // Crescimento Percentual Veiculos 

    const veiculosMesAtual =

        veiculos.filter(veiculo => {

            const data =

                new Date(veiculo.createdAt);

            return (

                data.getMonth() === mesAtual &&

                data.getFullYear() === anoAtual

            );

        }).length;


    const veiculosMesAnterior =

        veiculos.filter(veiculo => {

            const data =

                new Date(veiculo.createdAt);

            return (

                data.getMonth() === mesAtual - 1 &&

                data.getFullYear() === anoAtual

            );

        }).length;


    const crescimentoVeiculos =

        veiculosMesAnterior > 0

            ? (

                (

                    veiculosMesAtual -

                    veiculosMesAnterior

                ) /

                veiculosMesAnterior

            ) * 100

            : 0;


    const veiculosAumentaram =

        veiculosMesAtual >

        veiculosMesAnterior;

    const ordensMesAtual =

        ordens.filter(ordem => {

            const data =

                new Date(ordem.createdAt);

            return (

                data.getMonth() === mesAtual &&

                data.getFullYear() === anoAtual

            );

        }).length;


    const ordensMesAnterior =

        ordens.filter(ordem => {

            const data =

                new Date(ordem.createdAt);

            return (

                data.getMonth() === mesAtual - 1 &&

                data.getFullYear() === anoAtual

            );

        }).length;


    const crescimentoOrdens =

        ordensMesAnterior > 0

            ? (

                (

                    ordensMesAtual -

                    ordensMesAnterior

                ) /

                ordensMesAnterior

            ) * 100

            : 0;


    const ordensAumentaram =

        ordensMesAtual >

        ordensMesAnterior;

    const servicosMesAtual =

        ordens.filter(ordem => {

            const data =

                new Date(ordem.createdAt);

            return (

                ordem.status === 'FINALIZADA' &&

                data.getMonth() === mesAtual &&

                data.getFullYear() === anoAtual

            );

        }).length;

    const servicosMesAnterior =

        ordens.filter(ordem => {

            const data =

                new Date(ordem.createdAt);

            return (

                ordem.status === 'FINALIZADA' &&

                data.getMonth() === mesAtual - 1 &&

                data.getFullYear() === anoAtual

            );

        }).length;

    const crescimentoServicos =

        servicosMesAnterior > 0

            ? (

                (

                    servicosMesAtual -

                    servicosMesAnterior

                ) /

                servicosMesAnterior

            ) * 100

            : 0;

    const servicosAumentaram =

        servicosMesAtual >

        servicosMesAnterior;

    const ultimosClientes = [...clientes].slice(-5).reverse()

    const ordensEmAberto = ordens
        .filter(ordem => ordem.status === 'EM ANDAMENTO')
        .slice(-5)
        .reverse();


    useEffect(() => {
        carregarDados();
    }, []);

    useEffect(() => {
        carregarVeiculos();
    }, []);

    useEffect(() => {
        carregarOrdens();
    }, [])

    async function carregarDados() {
        try {
            const resClientes = await api.get('/clientes');
            setClientes(resClientes.data);
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
        }
    }

    async function carregarOrdens() {
        try {
            const resOrdens = await api.get('/ordens')
            setOrdens(resOrdens.data);
        } catch (error) {
            console.log('Erro ao carregar Ordens')
        }
    }

    async function carregarVeiculos() {
        try {
            const resVeiculos = await api.get('/veiculos');
            setVeiculos(resVeiculos.data);
        } catch (error) {
            console.error('Erro ao carregar veículos:', error);
        }
    }

    function logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div>
            <header>
                <div className='dashboard'>
                    <h1> Dashboard Oficina</h1>
                    <div className='dashboard-buttons'>
                        <button className='ordens' onClick={() => navigate('/ordens')}>Ordens</button>
                        <button className='cadastro' onClick={() => navigate('/clientes')}>Cadastrar Clientes</button>
                        <button className='logout' onClick={logout}>Sair</button>
                    </div>
                </div>
            </header>


            <nav className='nav-cards'>
                <MetricCard
                    titulo="Clientes"
                    valor={clientes.length}
                    icon={FaUsers}
                    crescimento={crescimentoClientes}
                    aumento={aumentou}
                />

                <MetricCard
                    titulo="Veículos"
                    valor={veiculos.length}
                    icon={FaCar}
                    crescimento={crescimentoVeiculos}
                    aumento={veiculosAumentaram}
                />

                <MetricCard
                    titulo="Ordens de Serviço"
                    valor={ordens.length}
                    icon={FaClipboardList}
                    crescimento={crescimentoOrdens}
                    aumento={ordensAumentaram}
                />

                <MetricCard
                    titulo="Faturamento"
                    valor={`R$ ${faturamento.toFixed(2)}`}
                    icon={FaMoneyBill}
                    crescimento={porcentagemCrescimento}
                    aumento={clientesAumentaram}
                />

                <MetricCard
                    titulo="Serviços"
                    valor={servicoTotais}
                    icon={FaTools}
                    crescimento={crescimentoServicos}
                    aumento={servicosAumentaram}
                />
            </nav>
            <div className='dashboard-grafico'>
                <div className="grafico-container">

                    <h2>
                        Visão Geral
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={600}
                    >

                        <BarChart data={dadosGrafico}>

                            <XAxis dataKey="nome" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="total"
                                fill="#2563eb"
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                <div className="clientes-recentes">

                    <h2>
                        Últimos Clientes
                    </h2>

                    {ultimosClientes.map(cliente => (

                        <div
                            className="cliente-item"
                            key={cliente.id}
                        >

                            <h4>
                                {cliente.nome}
                            </h4>

                            <p>
                                {cliente.email}
                            </p>

                        </div>

                    ))}

                </div>
            </div>

            <div className='ordens-aberto'>
                <div>
                    <h2>
                        Ordens de Serviço em Aberto
                    </h2>
                </div>

                <div className='name'>
                    <p>
                        ID
                    </p>

                    <p>
                        Cliente
                    </p>

                    <p>
                        Serviço
                    </p>

                    <p>
                        Status
                    </p>
                </div>

            </div>

            <div className='ordens-status'>

                {ordensEmAberto.map(ordem => (

                    <div
                        className='ordens-item'
                        key={ordem.id}
                    >

                        <p>
                            {ordem.id}
                        </p>

                        <p>
                            {ordem.cliente.nome}
                        </p>

                        <p>
                            {ordem.descricao}
                        </p>

                        <p>
                            {ordem.status}
                        </p>

                    </div>

                ))}
            </div>
        </div>

    );

}