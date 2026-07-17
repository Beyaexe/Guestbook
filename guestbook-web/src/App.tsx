import { useState } from "react"
import { useEffect } from "react"
import type { Question } from "./models/questions"
import { questionsList } from "./models/questions"
import axios from "axios"
import type {Reply} from "../src/models/reply"

function App() {

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [senderName, setSenderName] = useState("");
  const [messages, setMessages] = useState<any[]>([])

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

      {currentQuestion ? (
        <div>
          <div>
            <p><strong>✨{currentQuestion.id}: </strong>{currentQuestion.text}</p>
            <button onClick={handleSort}>Sortear Pergunta 🔮</button>
          </div>

          <form onSubmit={(e) => {
            handleSubmit(e)
          }}>

            {/* Nome */}
            <div>
              <label htmlFor="nameInput">Quem é você? </label>
              <input
                id="nameInput"
                type="text"
                placeholder="Herbert Richards"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                required
              />
            </div>

            {/* Caixa de texto para da resposta */}
            <div>
              <textarea
                placeholder="Registre sua resposta mágica aqui..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={4}
                cols={40}
                required
                maxLength={500}
              />
            </div>

            {/* O Enviar */}
            <button type="submit">
              Enviar Mensagem 📜
            </button>


          </form>
        </div>
      ) : (
        <>
          <p>Clique no botão para invocar uma pergunta do grimório!</p>
          <button onClick={handleSort}>Sortear Pergunta 🔮</button>
        </>
      )}


      <hr style={{ margin: "30px 0" }} />
      <h2>Mural de Mensagens Assinadas 📜</h2>

      {messages.length === 0 ? (
        <p>Nenhuma mensagem flutua por este grimório ainda...</p>
      ) : (
        //resposta principal
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "8px" }}>
              <p><strong>{msg.senderName}</strong> assinou:</p>
              <p>"{msg.text}"</p>
              <small style={{ color: "#777" }}>
                Enviado em: {new Date(msg.createdAt).toLocaleDateString("pt-BR")}
              </small>

              {/* Reply */}
              {msg.replies && msg.replies.length > 0 ? (
                <div style={{
                  marginTop: "12px",
                  marginLeft: "20px",
                  paddingLeft: "15px",
                  borderLeft: "2px solid #555", // Um detalhe visual para parecer uma resposta encadeada
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px"
                }}>
                  {msg.replies.map((reply:Reply) => (
                    <div key={reply.id}>
                      <p style={{ margin: "2px 0" }}>
                        <strong>{reply.senderName}</strong> respondeu:
                      </p>
                      <p style={{ margin: "2px 0"}}>
                        "{reply.text}"
                      </p>
                      <small style={{ color: "#777" }}>
                        Respondido em: {new Date(reply.createdAt).toLocaleDateString("pt-BR")}
                      </small>
                    </div>
                  ))}
                </div>
              ) : null}

              
            </div>

          ))}
        </div>
      )}

    </div>
  )
}

export default App