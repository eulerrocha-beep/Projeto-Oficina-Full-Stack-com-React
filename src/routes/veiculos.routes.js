import { Router } from "express";
import { veiculosController } from "../controllers/veiculos.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// Aplica o middleware de autenticação em todas as rotas abaixo
router.use(authMiddleware);
/* 
   Qualquer requisição feita para este arquivo passará primeiro pelo 'authMiddleware'.
   Isso garante que apenas usuários logados consigam acessar os dados de veículos.
*/

// Rota para listar todos os veículos
router.get(
    '/',
    veiculosController.listar
);
/* 
   Caminho: GET /
   Ação: Chama a função 'listar' do controlador para buscar todos os registros.
*/

// Rota para listar veículos de um cliente específico via ID na URL
router.get(
    '/cliente/:id',
    veiculosController.listarPorCliente
);
/* 
   Caminho: GET /cliente/123
   Ação: O ':id' é um parâmetro variável. O controlador usa esse ID para filtrar
   os veículos que pertencem exclusivamente a esse cliente.
*/

// Rota para cadastrar um novo veículo
router.post(
    '/',
    veiculosController.criar
);
/* 
   Caminho: POST /
   Ação: Recebe dados no corpo da requisição (JSON) e envia para a função
   de criação no controlador.
*/

// Rota para excluir um veículo específico pelo ID
router.delete(
    '/:id',
    veiculosController.deletar
);
/* 
   Caminho: DELETE /123
   Ação: Identifica o veículo pelo ID passado na URL e solicita a remoção
   definitiva do banco de dados.
*/

export default router;