// Importamos a instância do Prisma que configuramos no arquivo de banco de dados
import prisma from '../database/prisma.js';

export const clientesService = {

    /**
     * LISTAR: Recupera todos os clientes que pertencem ao usuário logado.
     */
    async listar(userId) {
        // O Prisma traduz isso para um: SELECT * FROM cliente WHERE userId = ?
        return await prisma.cliente.findMany({
            where: {
                userId // Garante que um usuário não veja os clientes de outro usuário
            }
        });
    },
    // Retorna uma lista (array) de objetos de clientes.

    /**
     * CRIAR: Salva um novo cliente no banco de dados.
     */
    async criar(data) {
        // O objeto 'data' contém nome, email, cpf e o userId do dono do registro
        return await prisma.cliente.create({
            data
        });
    },
    // Retorna o objeto do cliente recém-criado, incluindo o ID gerado pelo banco.

    /**
     * ATUALIZAR: Altera os dados de um cliente existente.
     */
    async atualizar(id, data) {
        // 1. Busca no banco para verificar se esse ID realmente existe
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) }
        });

        // 2. Se a busca não retornar nada, o service avisa o Controller enviando 'null'
        if (!cliente) return null;

        // 3. Se o cliente existe, o Prisma aplica as mudanças apenas nos campos enviados em 'data'
        return await prisma.cliente.update({
            where: { id: Number(id) },
            data
        });
    },
    // Esta função evita erros de "registro não encontrado" durante o update.

    /**
     * DELETAR: Remove um cliente permanentemente.
     */
    async deletar(id) {
        // 1. Verifica se o registro existe antes de tentar deletar (boa prática)
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) }
        });

        // 2. Se o ID for inválido ou não existir, retorna 'false'
        if (!cliente) return false;

        // 3. Executa a remoção física no banco de dados
        await prisma.cliente.delete({
            where: { id: Number(id) }
        });

        // 4. Retorna 'true' para o Controller confirmar o sucesso para o usuário
        return true;
    }
    // Uma deleção segura que confirma se a operação foi possível.
}