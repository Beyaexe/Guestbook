// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialQuestions = [
  { id: 1, text: "Se você fosse explorar uma masmorra comigo, que item utilitário levaria?" },
  { id: 2, text: "Que superpoder nós teríamos se fôssemos uma dupla de heróis?" },
  { id: 3, text: "Se nós fôssemos teletransportados para dentro de um jogo, qual você escolheria jogar comigo?" },
  { id: 4, text: "Qual é a lição mais valiosa ou mais engraçada que você aprendeu comigo?" },
  { id: 5, text: "Se eu fosse um boss de RPG, qual seria a minha fraqueza?" },
  { id: 6, text: "Qual superpoder você me daria?" }
];

async function main() {
  console.log("Semeando perguntas no banco de dados...");

  for (const q of initialQuestions) {
    // O upsert garante: se o ID existir, atualiza. Se não existir, cria!
    await prisma.question.upsert({
      where: { id: q.id },
      update: { text: q.text },
      create: { id: q.id, text: q.text}
    });
  }

  console.log("Perguntas semeadas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });