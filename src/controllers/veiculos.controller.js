import { number } from "zod";
import { veiculosService } from "../services/veiculos.service.js";

export const veiculosController = {
    
    // Lista todos os veículos cadastrados no sistema
    async listar(req, res) {
        try {
            // Chama o serviço para buscar a lista completa no banco de dados
            const veiculos = await veiculosService.listar();

            // Retorna a lista encontrada com o status padrão 200 (Sucesso)
            return res.json(veiculos);
        } catch (error) {
            // Caso ocorra algum erro no banco ou no código, exibe no terminal
            console.error(error);

            // Retorna um erro 500 (Erro interno do servidor) para o cliente
            return res.status(500).json({
                erro: 'Erro ao listar veículos'
            });
        }
    },

    // Lista veículos de um cliente específico baseado no ID enviado na URL
    async listarPorCliente(req, res) {
        try {
            // Extrai o ID da URL (ex: /veiculos/cliente/5)
            const { id } = req.params;

            // Chama o serviço convertendo o ID de String para Número
            const veiculos = await veiculosService.listarPorCliente(Number(id));

            return res.json(veiculos);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao buscar veículos'
            });
        }
    },

    // Cria um novo veículo com os dados enviados no corpo da requisição
    async criar(req, res) {
        try {
            // Pega o JSON enviado pelo frontend (marca, modelo, etc) e passa para o serviço
            const veiculo = await veiculosService.criar(req.body);

            // Retorna o veículo criado com status 201 (Criado com sucesso)
            return res.status(201).json(veiculo);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao criar veículo'
            });
        }
    },

    // Deleta um veículo baseado no ID enviado na URL
    async deletar(req, res) {
        try {
            // Converte o ID da URL usando a função 'number' do Zod e chama a exclusão
            await veiculosService.deletar(Number(req.params.id));

            // Retorna uma mensagem confirmando que a operação funcionou
            return res.json({
                message: 'Veículo deletado com sucesso'
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao deletar veículo'
            });
        }
    }
};