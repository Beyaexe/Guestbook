import { useState } from "react"
import type { Question } from "./models/questions"
import { questionsList } from "./models/questions"
import axios from "axios"

function App() {

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [senderName, setSenderName] = useState("");

  //sortear outra pergunta
  function handleSort() {

    const randomIndex = Math.floor(Math.random() * questionsList.length)
    const randomQuestion = questionsList[randomIndex]

    setCurrentQuestion(randomQuestion)
  }

  //requisição API com axios
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {

    e.preventDefault() //para não recarregar a página ao enviar
    if (!currentQuestion) return


    const payload = {
      senderName: senderName,
      text: answerText,
      questionId: currentQuestion.id
    }

    try{
      const response = await axios.post("http://localhost:3000/api/answers", payload)
      alert("Mensagem enviada com sucesso para o grimório! 🌟");

      setAnswerText("")
    }
    catch (error){
      console.error("Erro ao enviar:", error);
      alert("Houve um erro mágico ao tentar enviar sua mensagem...");
    }

}



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

    </div>
  )
}

export default App