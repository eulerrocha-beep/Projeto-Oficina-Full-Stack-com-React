# 🚀 Oficina API - Sistema de Gestão de Clientes (Full Stack)

Sistema full stack para gerenciamento de clientes com autenticação JWT, desenvolvido com foco em boas práticas de arquitetura, segurança e integração entre frontend e backend.

---

## 🧠 Sobre o Projeto

Este projeto simula um sistema real onde um usuário autenticado pode:

- 🔐 Fazer login com JWT
- 👥 Gerenciar seus próprios clientes
- ➕ Criar clientes
- 📋 Listar clientes
- ❌ Deletar clientes
- 🔒 Acessar dados protegidos por autenticação

Cada cliente é vinculado ao usuário autenticado (**multi-tenant básico**).

---

## ⚙️ Tecnologias utilizadas

### Backend
- Node.js
- Express
- Prisma ORM
- JWT (JSON Web Token)
- Zod (validação)

### Frontend
- React
- Vite
- Axios

### Banco de dados
- SQLite / PostgreSQL (via Prisma)

---

## 🔐 Autenticação

A autenticação é feita via JWT:

```http
Authorization: Bearer TOKEN





Login → recebe token
↓
Token enviado no header
↓
Middleware valida
↓
req.userId disponível nas rotas protegidas





src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── prisma/





PrismaClientValidationError:

Invalid `prisma.cliente.create()` invocation:

{
  data: {
    nome: "Euler Rocha",
    email: "euler@email.com",
    telefone: "99999999",
    userId: undefined,
+   user: {
+     create: ...
+     connect: ...
+   }
  }
}

Argument `user` is missing.


❌ Problema 1 — Token mal tratado
Código incorreto:
const token = req.headers.authorization;
Header recebido:
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
🔥 Erro:
token inválido
✅ Correção:
const authHeader = req.headers.authorization;
const token = authHeader.split(' ')[1];




❌ Problema 2 — userId undefined
Log:
REQ.USERID: undefined
Token decodificado:
DECODED: { id: 1, iat: ..., exp: ... }
Código incorreto:
req.user = decoded;
Uso no controller:
req.userId ❌
✅ Correção:
req.userId = decoded.id;





❌ Problema 3 — Nome de variável errado
userid ❌
userId ✅
Resultado:
userId: undefined



❌ Problema 4 — Variável usada antes da declaração
Código:
const payload = {
  ...data,
  userId: req.userId
};

const data = clienteSchema.parse(req.body);
🔥 Erro:
ReferenceError: Cannot access 'data' before initialization
✅ Correção:
const data = clienteSchema.parse(req.body);

const payload = {
  ...data,
  userId: req.userId
};



❌ Problema 5 — Causa raiz (BUG REAL)
Service:
async criar(data, userId) {
  return prisma.cliente.create({
    data: {
      ...data,
      userId
    }
  });
}
Controller:
clientesService.criar(payload);
⚠️ O que o JavaScript fez
data = payload ✅
userId = undefined ❌

JavaScript NÃO valida quantidade de parâmetros.

💥 Resultado
userId: undefined

→ Prisma não conseguiu criar relação
→ erro: Argument user is missing

✅ Solução final (padrão profissional)
✔ Controller:
const data = clienteSchema.parse(req.body);

const payload = {
  ...data,
  userId: req.userId
};

await clientesService.criar(payload);
✔ Service:
async criar(data) {
  return prisma.cliente.create({
    data
  });
}
🔐 Middleware de autenticação
import jwt from 'jsonwebtoken';

const secret = 'segredo_super';

export function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'token não fornecido'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;
        next();
    } catch {
        return res.status(401).json({ message: 'token inválido' });
    }
}
📡 Endpoints
Auth
POST /login
POST /register
Clientes
GET /clientes
POST /clientes
DELETE /clientes/:id