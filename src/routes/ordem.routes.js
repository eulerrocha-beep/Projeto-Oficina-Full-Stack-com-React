import { Router } from 'express';        
import { ordemController } from '../controllers/ordem.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js'; 

const router = Router();


router.use(authMiddleware);

// aplica o middleware de autenticação em todas as rotas abaixo

router.get(
    '/',
    ordemController.listar
);

router.get(
    '/cliente/:id',
    ordemController.listarPorCliente
);

router.post(
    '/',
    ordemController.criar
);

router.delete(
    '/:id',
    ordemController.deletar
);

router.put(
    '/:id/status',
    ordemController.atualizarStatus
);

export default router;