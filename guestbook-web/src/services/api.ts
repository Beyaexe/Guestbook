import axios from "axios";

export const messageService = {
    //Enviar uma nova resposta
    async createMessage(payload: { senderName: string, text: string, questionId: number }) {
        const response = await axios.post("http://localhost:3000/api/answers", payload)
        console.log("Resposta exata da API:", response);
        return response.data
    },

    //Enviar uma reply para uma resposta
    async createReply(payload: { senderName: string, text: string, questionId: number, parentId: number }) {
        const response = await axios.post("http://localhost:3000/api/answers", payload)

        return response.data
    },

    //Editar mensagem
    async editMessage(payload: {text: string, id: number}) {
        const response = await axios.put(`http://localhost:3000/api/answers/${payload.id}`, {
        text: payload.text
        })

        return response.data
    },

    //Buscar as mensagens (filtradas por pergunta ou não)
    async getMessages(questiondId?: number){
        const url = questiondId ? `http://localhost:3000/api/answers?questionId=${questiondId}`
            : "http://localhost:3000/api/answers"

        const response = await axios.get(url)
        return response
    }
}