import prisma from '../prisma/cliente.js';

export const veiculosService = {
    
    // Busca veículos filtrados por um cliente específico
    async listarPorCliente(clienteId) {
        // Log para monitoramento no console (ajuda a debugar se o ID está chegando correto)
        console.log('SERVICE CLIENTE ID:', clienteId);

        return await prisma.veiculo.findMany({
            where: {
                clienteId, // Filtra no banco apenas registros onde a FK clienteId coincide
                cliente: true
            }
        });
    },
    /* Esta função é ideal para telas de perfil ou listagens privadas onde 
       o usuário só deve ver os seus próprios veículos. */

    // Busca todos os veículos sem nenhum filtro
    async listar() {
        return await prisma.veiculo.findMany({

            include: {
                cliente: true
            }
        });
        
    },
    /* Retorna um Array com todos os registros da tabela 'veiculo'. 
       Geralmente usada em relatórios administrativos. */

    // Insere um novo veículo na tabela
    async criar(data) {
        return await prisma.veiculo.create({
            data // O objeto 'data' deve conter campos como placa, modelo, clienteId, etc.
        });
    },
    /* Pega as informações enviadas pelo controlador e as persiste no banco de dados. */

    // Remove um registro específico do banco
    async deletar(id) {
        return await prisma.veiculo.delete({
            where: { 
                id // O Prisma usa o campo único (Primary Key) para localizar e apagar
            }
        });
    }
    /* Recebe o ID único do veículo e o exclui permanentemente. 
       Cuidado: essa operação não tem volta no banco de dados. */
};