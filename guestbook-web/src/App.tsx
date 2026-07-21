import { QuestionBlock } from "./sections/QuestionsBlock"
import { MessageForm } from "./sections/MessageForm"
import { MessageWall } from "./sections/MessageWall"
import { useGrimoire } from "./hooks/useGrimoire"

function App() {

  const grimoire = useGrimoire()

  return (
    <div>
      <h1>Grimoire of Messages 🧙‍♂️</h1>


      <QuestionBlock
        currentQuestion={grimoire.currentQuestion}
        onSort={grimoire.handleSort}
        isLoading={grimoire.isLoadingButton}
        isOpenGrimoire={grimoire.isOpenGrimoire}
        onToggleModal={() => {grimoire.setOpenGrimoire(!grimoire.isOpenGrimoire)}}
        onSelectQuestion={grimoire.handleGrimoireQuestion}
       
      />

      {grimoire.currentQuestion &&
        (
          <MessageForm
            senderName={grimoire.senderName}
            answerText={grimoire.answerText}
            setSenderName={grimoire.setSenderName}
            setAnswerText={grimoire.setAnswerText}
            onSubmit={grimoire.handleSubmit}
          />
        )
      }

      <hr style={{ margin: "30px 0" }} />
      <h2>Mural de Mensagens Assinadas 📜</h2>

      <MessageWall
        messages={grimoire.messages}
        replyingTo={grimoire.replyingTo}
        senderName={grimoire.senderName}
        answerText={grimoire.answerText}

        setSenderName={grimoire.setSenderName}
        setAnswerText={grimoire.setAnswerText}
        
        onReply={(messageId, questionId) => {
           grimoire.setReplyingTo(messageId)        //Abre a caixa de texto
           grimoire.setQuestionIdReply(questionId)  //Guarda a ID da pergunta pro envio
        }}

        onCancelReply={() => {
           grimoire.setReplyingTo(null);
           grimoire.setQuestionIdReply(null);
        }}


        onSubmitReply={grimoire.handleSubmitReply}
      />

    </div>
  )
}

export default App