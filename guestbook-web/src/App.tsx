import { useState } from "react"
import type { Question } from "./models/questions"
import { questionsList } from "./models/questions"

function App() {

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [answerText, setAnswerText] = useState("")
  const [senderName, setSenderName] = useState("");

  function handleSort() {

    const randomIndex = Math.floor(Math.random() * questionsList.length)
    const randomQuestion = questionsList[randomIndex]

    setCurrentQuestion(randomQuestion)
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
            e.preventDefault(); // Evita que a página recarregue
            alert(`Enviando...`);
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
                placeholder="Digite sua resposta mágica aqui..."
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
          <p>Clique no botão para invocar uma pergunta do grimório...</p>
          <button onClick={handleSort}>Sortear Pergunta 🔮</button>
        </>
      )}

    </div>
  )
}

export default App