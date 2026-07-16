import { useState } from "react"
import type { Question } from "./models/questions"
import { questionsList } from "./models/questions"

function App() {

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)

  function handleSort(){

    const randomIndex = Math.floor(Math.random() * questionsList.length)
    const randomQuestion = questionsList[randomIndex]

    setCurrentQuestion(randomQuestion)
  }

  return (
    <div>
      <h1>Grimório de Mensagens 🧙‍♂️</h1>
      <p>Em breve, a magia acontece aqui!</p>
    </div>
  )
}

export default App