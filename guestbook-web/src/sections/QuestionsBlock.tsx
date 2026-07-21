import type { Question } from "../models/questions"

interface QuestionBlockProps{ //basicamente um contrato. Ao utilizar o componente, tem que seguir isso abaixo
    currentQuestion: Question | null
    isLoading: boolean
    onSort: () => void
}

export function QuestionBlock({currentQuestion, onSort, isLoading}: QuestionBlockProps){

   return (
    <div>
      {currentQuestion ? (
        <div>
          <p>
            <strong>✨{currentQuestion.id}: </strong>
            {currentQuestion.text}
          </p>
          <button onClick={onSort} disabled={isLoading}>
            {isLoading ? "Consultando os astros... ⏳": "Sortear outra 🔮"}
          </button>
        </div>
      ) : (
        <>
          <p>Clique no botão para invocar uma pergunta do grimório!</p>
          <button onClick={onSort} disabled={isLoading}>
            {isLoading? "Invocando... ⏳" :  "Invocar Pergunta 🔮"}
          </button>
        </>
      )}
    </div>
  );


}