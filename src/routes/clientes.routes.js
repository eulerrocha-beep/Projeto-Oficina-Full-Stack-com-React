// 1. Importamos o Router do Express para criar um roteador isolado
import { Router } from 'express';
// 2. Importamos o Controller que você criou, que contém a lógica de cada função
import { clientesController } from '../controllers/clientes.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

// Inicializamos o roteador
const router = Router();

/**
 * DEFINIÇÃO DAS ROTAS (ENDPOINTS)
 * O caminho '/' aqui é relativo ao que foi definido no seu arquivo principal (geralmente /clientes)
 */

// Rota GET: Quando o usuário acessa para buscar informações
// Exemplo: GET /clientes -> Chama a função 'listar'
router.get('/', authMiddleware, clientesController.listar);

// Rota POST: Quando o usuário envia dados para cadastrar algo novo
// Exemplo: POST /clientes -> Chama a função 'criar'
router.post('/', authMiddleware, clientesController.criar);

// Rota PUT: Usada para atualização completa de um registro
// O ':id' é um parâmetro variável. Exemplo: PUT /clientes/123
router.put('/:id', authMiddleware, clientesController.atualizar);

// Rota DELETE: Usada para remover um registro
// Exemplo: DELETE /clientes/123 -> Chama a função 'deletar'
router.delete('/:id', authMiddleware, clientesController.deletar);

// Exportamos o roteador para que o arquivo principal (app.js ou server.js) possa usá-lo
export default router;