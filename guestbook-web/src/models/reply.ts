export interface Reply {
 id: number;
  text: string;
  senderName: string;
  createdAt: string;
  updateAt: string,
  questionId: number;
  parentId?: number;
  replies?: []
}

