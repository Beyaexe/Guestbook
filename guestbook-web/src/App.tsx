import { useState } from "react"
import { useEffect } from "react"
import type { Question } from "./models/questions"
import type { Message } from "./models/message"
import { QuestionBlock } from "./sections/QuestionsBlock"
import { questionsList } from "./models/questions"
import { MessageForm } from "./sections/MessageForm"
import { MessageWall } from "./sections/MessageWall"


function App() {

  //Questão sendo exibida
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  //Controle do usuário no form
  const [answerText, setAnswerText] = useState("")
  const [senderName, setSenderName] = useState("");

  //Mural de mensagens
  const [messages, setMessages] = useState<Message[]>([])

  //Controle de estado para o reply
  const [replyingTo, setReplyingTo] = useState<number | null>(null)


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


    const payload = {
      senderName: senderName,
      text: answerText,
      questionId: currentQuestion.id
    }

    try {
      const response = await axios.post("http://localhost:3000/api/answers", payload)
      alert("Mensagem enviada com sucesso para o grimório! 🌟");

      setAnswerText("")
      setSenderName("")
      setCurrentQuestion(null)

      getMessages()
    }
    catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Houve um erro mágico ao tentar enviar sua mensagem...");
    }

  }

  async function getMessages(questionId?: number) {

    try {
      const url = questionId ?
        `http://localhost:3000/api/answers?questionId=${questionId}`
        : "http://localhost:3000/api/answers"

      const response = await axios.get(url)
      setMessages(response.data)
    }
    catch (error) {
      console.log(error)
    }
  }

  // useEffect
  useEffect(() => {
    if (currentQuestion) {
      getMessages(currentQuestion.id)
    }
    else {
      getMessages()
    }

  }, [currentQuestion])


  return (
    <div>
      <h1>Grimoire of Messages 🧙‍♂️</h1>


      <QuestionBlock
        currentQuestion={currentQuestion}
        onSort={handleSort}
      />

      {currentQuestion &&
        (
          <MessageForm
            senderName={senderName}
            answerText={answerText}
            setSenderName={setSenderName}
            setAnswerText={setAnswerText}
            onSubmit={handleSubmit}
          />
        )
      }

      <hr style={{ margin: "30px 0" }} />
      <h2>Mural de Mensagens Assinadas 📜</h2>

      <MessageWall
        messages={messages}
      />

    </div>
  )
}

export default App