import type { Question } from "../models/questions"
import { Grimoire } from "../components/ui/Grimoire"


interface QuestionBlockProps { //basicamente um contrato. Ao utilizar o componente, tem que seguir isso abaixo
  currentQuestion: Question | null
  isLoading: boolean
  isOpenGrimoire: boolean
  onSort: () => void
  onToggleModal: () => void
  onSelectQuestion: (question: Question) => void
}

export function QuestionBlock({ currentQuestion, onSort, isLoading, isOpenGrimoire, onToggleModal, onSelectQuestion}: QuestionBlockProps) {

  return (
    <div>
      {currentQuestion ? (
        <div>

          <p>
            <strong>✨{currentQuestion.id}: </strong>
            {currentQuestion.text}
          </p>

          <button onClick={onSort} disabled={isLoading}>
            {isLoading ? "Consultando os astros... ⏳" : "Sortear outra 🔮"}
          </button>
          <button onClick={onToggleModal}>
            Abrir Grimório 📜
          </button>

          {isOpenGrimoire ? (
            <Grimoire
              onToggleModal={onToggleModal} 
              onSelectQuestion={onSelectQuestion}          
            />

          ) : (null)}

        </div>
      ) : (
        <>
          <p>Clique no botão para invocar uma pergunta do grimório!</p>
          <button onClick={onSort} disabled={isLoading}>
            {isLoading ? "Invocando... ⏳" : "Invocar Pergunta 🔮"}
          </button>
        </>
      )}
    </div>
  );


}