import { useState } from "react"
import { useEffect } from "react"
import type { Question } from "../models/questions"
import type { Message } from "../models/message"
import { questionsList } from "../models/questions"
import * as api from "../services/api"

export function useGrimoire() {

  //Questão sendo exibida
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  //Controle do usuário no form
  const [answerText, setAnswerText] = useState("")
  const [senderName, setSenderName] = useState("");

  //Mural de mensagens
  const [messages, setMessages] = useState<Message[]>([])

  //Controle de estado para o reply
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [questionIdReply, setquestionIdReply] = useState<number | null>(null)
  /*===================================*/


  
  //sortear outra pergunta
  function handleSort() {

    const randomIndex = Math.floor(Math.random() * questionsList.length)
    const randomQuestion = questionsList[randomIndex]

    setCurrentQuestion(randomQuestion)
  }


  //requisição API com axios para enviar uma resposta
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

    e.preventDefault() //para não recarregar a página ao enviar
    if (!currentQuestion) return 

    try {
      await api.messageSerive.createMessage({
        senderName: senderName,
        text: answerText,
        questionId: currentQuestion.id
      })

      console.log("Mensagem enviada com sucesso para o grimório! 🌟")
      setAnswerText("")
      setSenderName("")
      setCurrentQuestion(null)
      setReplyingTo(null)
    }
    catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro mágico ao tentar enviar sua mensagem...");
    }

  }


  //requisição API com axios para enviar uma Reply para uma resposta
  async function handleSubmitReply(e: React.SubmitEvent<HTMLFormElement>) {

    e.preventDefault() //para não recarregar a página ao enviar
    if (!questionIdReply || !replyingTo) return;

    try {
      await api.messageSerive.createReply({
        senderName: senderName,
        text: answerText,
        questionId: questionIdReply,
        parentId: replyingTo
      })

      console.log("Resposta enviada com sucesso para o grimório! 🌟")
      setAnswerText("")
      setSenderName("")
      setquestionIdReply(null)
      setReplyingTo(null)
    }
    catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro mágico ao tentar enviar sua mensagem...");
    }

  }


  //Popular message walls
  async function getMessages() {
    try {
      const response = await api.messageSerive.getMessages(currentQuestion?.id)
      setMessages(response.data)
    }
    catch (error) {
      console.error("Erro ao buscar mensagens:", error)
    }
  }


  // useEffects
  useEffect(() => {
    getMessages()
  }, [currentQuestion, replyingTo])


  return {
    currentQuestion,
    answerText,
    senderName,
    messages,
    replyingTo,
    setAnswerText,
    setSenderName,
    setReplyingTo,
    setquestionIdReply,
    handleSort,
    handleSubmit,
    handleSubmitReply,
    getMessages, //Caso precise recarregar de fora
  }
}