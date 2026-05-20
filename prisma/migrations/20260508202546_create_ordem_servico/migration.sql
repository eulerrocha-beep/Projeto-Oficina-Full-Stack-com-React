-- CreateTable
CREATE TABLE "OrdemServico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ABERTA',
    "valor" REAL NOT NULL DEFAULT 0,
    "clienteId" INTEGER NOT NULL,
    "veiculoId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrdemServico_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrdemServico_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "Veiculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
