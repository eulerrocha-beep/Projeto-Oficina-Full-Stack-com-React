import jwt from 'jsonwebtoken';
import { authService } from '../services/auth.services.js';

// A chave secreta usada para assinar o token e garantir que ele não foi alterado.
// Em produção, isso deve ficar em um arquivo .env (variável de ambiente).
const secret = 'segredo_super';

export const authController = {

    /**
     * REGISTER: Recebe os dados do novo usuário e os envia para o serviço.
     */
    async register(req, res) {
        // O req.body contém os dados enviados pelo formulário de cadastro.
        const user = await authService.register(req.body);

        // Retorna o usuário criado com o status 201 (Created).
        return res.status(201).json(user);
    },

    /**
     * LOGIN: Valida as credenciais e gera o Token de acesso.
     */
    async login(req, res) {
        // Extrai e-mail e senha do corpo da requisição.
        const { email, password } = req.body;

        // Chama o serviço para verificar se o usuário existe e se a senha bate.
        const user = await authService.login(email, password);

        // Se o serviço retornar null (usuário ou senha inválidos), barramos o acesso.
        if (!user) {
            return res.status(401).json({ message: 'invalid credentials'});
        }

        // Se os dados estão corretos, geramos o Token JWT.
        const token = jwt.sign(
            { id: user.id }, // Payload: O que vamos "esconder" dentro do token (ID do usuário).
            secret,          // A chave secreta para assinar o token.
            { expiresIn: '1h' } // Tempo de validade: após 1 hora, o usuário precisará logar novamente.
        );

        // Retorna o token para o frontend. 
        // O frontend deve salvar isso (ex: localStorage) e enviar no cabeçalho das próximas chamadas.
        return res.json({ token });
    }
}