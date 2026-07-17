import type { Question } from "../models/questions"

interface QuestionBlockProps{ //basicamente um contrato. Ao utilizar o componente, tem que seguir isso abaixo
    currentQuestion: Question | null
    onSort: () => void
}

export function QuestionBlock({currentQuestion, onSort}: QuestionBlockProps){

   return (
    <div>
      {currentQuestion ? (
        <div>
          <p>
            <strong>✨{currentQuestion.id}: </strong>
            {currentQuestion.text}
          </p>
          <button onClick={onSort}>Invocar Pergunta 🔮</button>
        </div>
      ) : (
        <>
          <p>Clique no botão para invocar uma pergunta do grimório!</p>
          <button onClick={onSort}>Invocar Pergunta 🔮</button>
        </>
      )}
    </div>
  );


}