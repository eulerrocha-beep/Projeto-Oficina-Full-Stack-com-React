// 1. Importamos a classe PrismaClient do pacote oficial que o Prisma gerou para o seu projeto.
// Esse pacote contém todos os métodos (findMany, create, update, etc) baseados no seu arquivo schema.prisma.
import { PrismaClient } from '@prisma/client'

// 2. Criamos uma nova instância (um "objeto") do Prisma Client.
// É através desta constante 'prisma' que o seu código Node.js vai "conversar" com o banco de dados.
const prisma = new PrismaClient()

// 3. Exportamos essa instância como 'default'. 
// Isso permite que você importe esse mesmo objeto 'prisma' em qualquer outro arquivo 
// (como nos seus Services ou Controllers), garantindo que toda a aplicação use a mesma conexão.
export default prisma