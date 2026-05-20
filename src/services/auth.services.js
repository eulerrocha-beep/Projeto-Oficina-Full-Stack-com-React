import prisma from '../database/prisma.js';
import bcrypt from 'bcrypt';

export const authService = {
    /**
     * REGISTER: Cria um novo usuário criptografando a senha.
     */
    async register(data) {
        // Gera um "hash" da senha. O número 10 é o "salt", que define o nível de segurança.
        // Isso transforma "senha123" em algo como "$2b$10$X728...".
        const hash = await bcrypt.hash(data.password, 10);

        return await prisma.user.create({
            data: {
                ...data,      // Copia todos os campos enviados (nome, email, etc.)
                password: hash // Substitui a senha original pela versão criptografada
            }
        });
    },
    // Nunca salve senhas sem criptografia; se o banco vazar, os usuários estarão protegidos.

    /**
     * LOGIN: Verifica se o e-mail existe e se a senha está correta.
     */
    async login(email, password) {
        // 1. Tenta encontrar o usuário pelo e-mail único.
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // 2. Se o e-mail não existir no banco, interrompe o login retornando null.
        if (!user) return null;

        // 3. Compara a senha digitada com o hash salvo no banco.
        // O bcrypt faz o processo inverso para validar sem "descriptografar".
        const valid = await bcrypt.compare(password, user.password);

        // 4. Se a senha estiver errada, retorna null.
        if (!valid) return null;

        // 5. Se tudo estiver certo, retorna os dados do usuário (exceto a senha, idealmente).
        return user;
    }
    // O Controller usará esse retorno para gerar um Token (JWT) de acesso.
}