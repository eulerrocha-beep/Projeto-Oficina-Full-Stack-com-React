/*
  Warnings:

  - You are about to drop the column `observacao` on the `OrdemServico` table. All the data in the column will be lost.
  - Added the required column `observacoes` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrdemServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "observacoes" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ABERTA',
    "valor" REAL NOT NULL DEFAULT 0,
    "clienteId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrdemServico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrdemServico_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrdemServico" ("clienteId", "createdAt", "descricao", "id", "status", "valor", "veiculoId") SELECT "clienteId", "createdAt", "descricao", "id", "status", "valor", "veiculoId" FROM "OrdemServico";
DROP TABLE "OrdemServico";
ALTER TABLE "new_OrdemServico" RENAME TO "OrdemServico";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
