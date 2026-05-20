import prisma from '../prisma/cliente.js';

export const ordemService = {
    // Busca ordens filtradas por um cliente específico

    async listarPorCliente(clienteId) {
        console.log('SERVICE CLIENTE ID:', clienteId);

        return await prisma.ordemServico.findMany({
            where: {
                clienteId
            },

            include: {
                cliente: true,
                veiculo: true
            }
        });
    },
    /* Esta função é ideal para telas de perfil ou listagens privadas onde 
       o usuário só deve ver as suas próprias ordens. */

    async listar() {
        return await prisma.ordemServico.findMany({

            include: {
                cliente: true, // Inclui os dados do cliente relacionado a cada ordem
                veiculo: true  // Inclui os dados do veículo relacionado a cada ordem
            }
        });
    },

    async criar(data) {
        return await prisma.ordemServico.create({
            data  // O objeto 'data' deve conter campos como descrição, clienteId, veiculoId, etc.
        })
    },

    async deletar(id) {
        return await prisma.ordemServico.delete({
            where: {
                id
            }
        });
    },

    async atualizarStatus(id, status) {

        return await prisma.ordemServico.update({
            where: { id },
            data: { status }
        });
    },

    async atualizar(id, data) {
        return await prisma.ordemServico.update({
            where: { id },
            data  // O objeto 'data' deve conter os campos que deseja atualizar, como descrição, status, etc.
        });
    },

    async buscarPorId(id) {
        return await prisma.ordemServico.findUnique({
            where: { id },
            include: {
                cliente: true,
                veiculo: true
            }
        });
    }
};