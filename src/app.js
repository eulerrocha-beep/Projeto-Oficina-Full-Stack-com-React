import express from 'express';
import cors from 'cors';
import clientesRoutes from './routes/clientes.routes.js';
import authRoutes from './routes/auth.routes.js';
import veiculosRoutes from './routes/veiculos.routes.js';

// Inicializa o Express. O 'app' é o objeto principal que representa sua aplicação.
const app = express();

app.use(cors());
/**
 * O CORS (Cross-Origin Resource Sharing) permite que seu frontend (ex: React ou Vue)
 * consiga acessar esta API mesmo que estejam em endereços ou portas diferentes.
 */

app.use(express.json());
/**
 * Este middleware converte o corpo das requisições (body) para o formato JSON.
 * Essencial para que funções como 'criar' ou 'atualizar' consigam ler os dados enviados.
 */

app.use('/clientes', clientesRoutes);
/**
 * Define que todas as rotas de clientes terão o prefixo '/clientes'.
 * Exemplo: Uma rota '/' no arquivo de rotas vira 'GET /clientes' no navegador.
 */

app.get('/', (req, res) => {
    res.send('Bem-vindo à API da Oficina!');
});
/**
 * Rota raiz simples. É o "Olá Mundo" da API, útil para testar se o servidor
 * subiu corretamente sem precisar de autenticação ou parâmetros.
 */

app.use('/auth', authRoutes);
/**
 * Agrupa as rotas de autenticação (como Login e Cadastro de usuários) 
 * sob o prefixo '/auth'. Ex: 'POST /auth/login'.
 */

app.use(veiculosRoutes);
/**
 * Registra as rotas de veículos. Como não foi passado um prefixo (como '/veiculos'),
 * as rotas usarão os caminhos exatos definidos dentro do arquivo 'veiculosRoutes'.
 */

export default app;
/**
 * Exporta a configuração para que o arquivo principal (geralmente server.js) 
 * possa ligar o servidor e começar a ouvir as requisições em uma porta específica.
 */