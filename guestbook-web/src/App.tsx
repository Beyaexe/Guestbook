import { useState } from "react"
import type { Question } from "./models/questions"
import { questionsList } from "./models/questions"

function App() {

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

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
            <p><strong>✨{currentQuestion.id}: </strong>{currentQuestion.text}</p>
          </div>
        ) : 
        (
          <p>Clique no botão para invocar uma pergunta do grimório...</p>
        )
      }

      <button onClick={handleSort}>Sortear Pergunta 🔮</button>
    </div>
  )
}

export default App