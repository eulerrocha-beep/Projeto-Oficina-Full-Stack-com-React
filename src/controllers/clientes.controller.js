// Importamos o Service, que contém a lógica de banco de dados (o que deve ser feito)
import { clientesService } from "../services/clientes.service.js";
// Importamos o Schema (Zod), que define as regras de validação (quais dados são aceitos)
import { clienteSchema } from "../schemas/cliente.schema.js";


export const clientesController = {


    /**
     * LISTAR: Retorna todos os clientes do banco.
     */
    async listar(req, res) {
        // Chama o serviço para buscar a lista de clientes
        const clientes = await clientesService.listar(req.userid);
        // Retorna a lista para quem fez a requisição com status 200 (sucesso)
        return res.json(clientes);
    },

    /**
     * CRIAR: Recebe dados, valida e salva um novo cliente.
     */
    async criar(req, res) {
        try {
            // 🔍 Debug controlado (pode remover em produção)
            console.log('USER ID NO CONTROLLER:', req.userId);

            // ❌ Segurança: não deixa passar sem userId
            if (!req.userId) {
                return res.status(401).json({ erro: 'Usuário não autenticado' });
            }

            // ✅ Validação com Zod
            const data = clienteSchema.parse(req.body);

            // ✅ Monta payload corretamente
            const payload = {
                ...data,
                userId: req.userId
            };

            console.log('PAYLOAD:', payload);

            // ✅ Chamada do service
            const cliente = await clientesService.criar(payload);

            return res.status(201).json(cliente);

        } catch (error) {

            // ✅ ERRO ZOD (melhor verificação)
            if (error.name === 'ZodError') {
                return res.status(400).json({ erro: error.errors });
            }

            // ✅ ERRO PRISMA (email duplicado)
            if (error.code === 'P2002') {
                return res.status(400).json({ erro: 'Email já cadastrado' });
            }

            // 🔥 Debug profissional
            console.error('ERRO AO CRIAR CLIENTE:', error);

            return res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    },

    /**
     * ATUALIZAR: Altera os dados de um cliente existente através do ID.
     */
    async atualizar(req, res) {
        // Pega o ID que vem na URL (ex: /clientes/1)
        const { id } = req.params;

        // Pede ao serviço para atualizar o cliente com o ID e os novos dados (req.body)
        const cliente = await clientesService.atualizar(id, req.body);

        // Se o serviço retornar vazio/null, significa que o ID não existe no banco
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        // Se deu certo, retorna o cliente atualizado
        return res.json(cliente);
    },

    /**
     * DELETAR: Remove um cliente do sistema.
     */
    async deletar(req, res) {
        // Pega o ID da URL
        const { id } = req.params;

        // Pede ao serviço para remover o registro
        const removido = await clientesService.deletar(id);

        // Se o serviço não encontrar o cliente para deletar, retorna 404
        if (!removido) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        // Status 204: Significa "Sucesso, mas não tenho nenhum conteúdo para te mostrar agora"
        return res.status(204).send();
    }
};