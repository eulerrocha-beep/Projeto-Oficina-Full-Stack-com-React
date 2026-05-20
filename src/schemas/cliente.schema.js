// 1. Importamos a biblioteca Zod, que é excelente para validação de dados em TypeScript/JavaScript
import { z } from 'zod';

/**
 * Criamos e exportamos o 'clienteSchema'.
 * Ele define o "formato" que um objeto de cliente DEVE ter para ser aceito pelo sistema.
 */
export const clienteSchema = z.object({
  
  // O campo 'nome' deve ser uma string e ter no mínimo 3 caracteres.
  // Se for menor, ele retorna a mensagem personalizada: 'Nome muito curto'
  nome: z.string().min(3, 'Nome muito curto'),

  // O campo 'email' deve ser uma string e seguir o formato padrão de e-mail (ex: nome@email.com)
  // Se o formato estiver errado, retorna: 'Email inválido'
  email: z.string().email('Email inválido'),

  // O campo 'telefone' deve ser uma string com no mínimo 8 caracteres.
  // Se for menor, retorna: 'Telefone inválido'
  telefone: z.string().min(8, 'Telefone inválido')

});