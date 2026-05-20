import { ordemService } from "../services/ordem.services.js";

export const ordemController = {
    // Lista todas as ordens de serviço cadastradas no sistema
    async listar (req, res) {
        try {
            const ordem = await ordemService.listar();

            return res.json(ordem);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao listar ordens de serviço'
            });
        }
    },

    async listarPorCliente (req, res) {
        try {
            const { id } =req.params;

            const ordem = await ordemService.listarPorCliente(Number(id));

            return res.json(ordem);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao listar ordens de serviço'
            });
        }
    },

    async criar (req, res) {
        try {
            const ordem = await ordemService.criar(req.body);

            return res.status(201).json(ordem);
        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao criar ordem'
            });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;

            await ordemService.deletar(Number(id));

            return res.json({
                mensagem: 'Ordem deletada'
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao deletar ordem'
            })
        }
    },

    async atualizarStatus(req, res) {

        try {
            
            const { id } = req.params

            const { status } = req.body
            
            const ordem = 
            await ordemService.atualizarStatus(
                Number(id), 
                status
            );

            return res.json(ordem)

        } catch (error) {
            
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao atualizar status'
            })
        }
    }


}