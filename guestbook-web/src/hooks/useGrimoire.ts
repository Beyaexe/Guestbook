import { useState } from "react"
import { useEffect } from "react"
import type { Question } from "../models/questions"
import type { Message } from "../models/message"
import { questionsList } from "../models/questions"
import * as api from "../services/api"

export function useGrimoire() {

  //Questão sendo exibida
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  //Array de questão em cache
  const [seenQuestionIds, setSeenQuestionIds] = useState<number[]>(() => {
    const saved = sessionStorage.getItem("@grimoire:seen_questions")
    return saved ? JSON.parse(saved) : []
  })

  //Controle do estado grimoire aberto
  const [isOpenGrimoire, setOpenGrimoire] = useState(false)

  //Controle do usuário no form
  const [answerText, setAnswerText] = useState("")
  const [senderName, setSenderName] = useState("");

  //Mural de mensagens
  const [messages, setMessages] = useState<Message[]>([])

  //Controle de estado para o reply
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [questionIdReply, setQuestionIdReply] = useState<number | null>(null)

  //Controle de estado do botão de invocar pergunta
  const [isLoadingButton, setLoadingButton] = useState(false)

  /*===================================*/


  //Questions

  //sortear outra pergunta
  function handleSort() {
    setLoadingButton(true)
    setTimeout(() => {

      let availableQuestions = questionsList.filter(
        (q) => !seenQuestionIds.includes(q.id)
      )

      let baseSeenIds = seenQuestionIds

      //todas já foram sorteadas?
      if (availableQuestions.length === 0) {
        availableQuestions = questionsList
        baseSeenIds = []
      }


      const randomIndex = Math.floor(Math.random() * availableQuestions.length)
      const selectedQuestion = availableQuestions[randomIndex]

      setCurrentQuestion(selectedQuestion)

      const updatedIds = [...baseSeenIds, selectedQuestion.id]

      setSeenQuestionIds(updatedIds)
      sessionStorage.setItem("@grimoire:seen_questions", JSON.stringify(updatedIds))

      setLoadingButton(false)
    }, 500)

  }


  function handleGrimoireQuestion(questionSelected: Question){
    setCurrentQuestion(questionSelected)
    setOpenGrimoire(false)
  }


/*===================================*/

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
      const response = await api.messageSerive.createReply({
        senderName: senderName,
        text: answerText,
        questionId: questionIdReply,
        parentId: replyingTo
      })

      console.log("Resposta enviada com sucesso para o grimório! 🌟")

      const novaReplica = response.allAnswers;


      setMessages((mensagensAntigas) =>
        mensagensAntigas.map((msg) => {

          if (msg.id === replyingTo) {
            return {
              ...msg,
              replies: [...(msg.replies || []), novaReplica]
            }
          }
          return msg;
        })
      );

      setAnswerText("")
      setSenderName("")
      setQuestionIdReply(null)
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
  }, [currentQuestion])


  return {
    currentQuestion,
    answerText,
    senderName,
    messages,
    replyingTo,
    isLoadingButton,
    isOpenGrimoire,
    setAnswerText,
    setSenderName,
    setReplyingTo,
    setOpenGrimoire,
    setQuestionIdReply,
    setLoadingButton,
    handleSort,
    handleSubmit,
    handleSubmitReply,
    handleGrimoireQuestion,
    getMessages, //Caso precise recarregar de fora
  }
}