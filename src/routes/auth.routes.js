import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const route = Router();

/**
 * ROTA DE REGISTRO (Cadastro)
 * Caminho: POST /auth/register
 */
route.post('/register', authController.register);
/* 
   Envia os dados do novo usuário (nome, e-mail, senha) para o controlador.
   O controlador, por sua vez, chamará o serviço para criptografar a senha 
   e salvar no banco de dados.
*/

/**
 * ROTA DE LOGIN (Acesso)
 * Caminho: POST /auth/login
 */
route.post('/login', authController.login);
/* 
   Recebe as credenciais (e-mail e senha). Se os dados estiverem corretos, 
   o servidor geralmente responde com um Token de acesso (JWT) para que 
   o usuário possa acessar as outras partes da API.
*/

export default route;