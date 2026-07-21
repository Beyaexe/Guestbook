// models/questions.ts
export interface Question {
  id: number
  text: string
}

export const questionsList: Question[] = [
  { id: 1, text: "Se você fosse explorar uma masmorra comigo, que item utilitário levaria?" },
  { id: 2, text: "Que superpoder nós teríamos se fôssemos uma dupla de heróis?" },
  { id: 3, text: "Se nós fôssemos teletransportados para dentro de um jogo, qual você escolheria jogar comigo?" },
  { id: 4, text: "Qual é a lição mais valiosa ou mais engraçada que você aprendeu comigo?" },
  { id: 5, text: "Se eu fosse um boss de RPG, qual seria a minha fraqueza?" },
  { id: 6, text: "Qual superpoder você me daria?" }
]