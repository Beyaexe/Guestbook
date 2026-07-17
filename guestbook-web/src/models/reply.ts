export interface Reply {
  id: number;
  text: string;
  senderName: string;
  createdAt: string;
  questionId: number;
  parentId?: number;
}

