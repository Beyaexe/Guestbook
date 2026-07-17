import type { Reply } from "./reply"; // Não esqueça de importar a Reply!

export interface Message {
  id: number;
  text: string;
  senderName: string;
  createdAt: string;
  updateAt: string,
  questionId: number;
  parentId?: number;
  replies?: Reply[];
}

