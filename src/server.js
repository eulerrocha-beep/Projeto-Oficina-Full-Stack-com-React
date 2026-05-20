import 'dotenv/config'
import app from './app.js';
import veiculosRoutes from './routes/veiculos.routes.js';
import ordemRoutes from './routes/ordem.routes.js';


// Usar as rotas de veículos
app.use('/veiculos', veiculosRoutes);
app.use('/ordens', ordemRoutes);
/**
 * DEFINIÇÃO DA PORTA
 * process.env.PORT: Tenta ler uma porta definida pelo ambiente (comum em servidores como Heroku ou AWS).
 * || 3000: Se não houver uma porta definida no ambiente, ele usa a 3000 como padrão (fallback).
 */
const PORT = process.env.PORT || 3000;

/**
 * LIGANDO O SERVIDOR
 * app.listen: Faz o servidor "ficar ouvindo" as requisições que chegam na porta especificada.
 */
app.listen(PORT, () => {
    // Esta função de callback executa apenas UMA VEZ, assim que o servidor inicia com sucesso.
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse em: http://localhost:${PORT}`);
});
