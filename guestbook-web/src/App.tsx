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
        onReply={grimoire.setReplyingTo}
        onCancelReply={() => grimoire.setReplyingTo(null)}
        onSubmitReply={grimoire.handleSubmit}
      />

    </div>
  )
}

export default App