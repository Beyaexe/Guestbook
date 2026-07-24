import { QuestionBlock } from "./sections/QuestionsBlock/QuestionsBlock"
import { MessageForm } from "./sections/MessageForm/MessageForm"
import { MessageWall } from "./sections/MessageWall/MessageWall"
import { useGrimoire } from "./hooks/useGrimoire"
import { HeroSection } from "./sections/Hero/Hero"

import "./App.css"

function App() {

  const grimoire = useGrimoire()

  return (

    <>
      <HeroSection />

      <div className="grimoire-paper">
        <header className="editorial-header">
          <h1>Grimoire Of Messages</h1>
        </header>

        {/* CORPO: 3 Colunas Separadas por Tinta */}
        <main className="grimoire-grid">

          {/* Coluna Esquerda */}
          <aside className="editorial-section left-column">
            <h2>📜 Viajantes</h2>
            <p>Registro daqueles que deixaram sua marca no Grimório...</p>
            {/* Componente <TravelersList /> futuramente */}
          </aside>

          {/* Coluna Central */}
          <section className="editorial-section center-column">
            {/* Formulário de Invocação */}
            <div className="form-section">
              <QuestionBlock
                currentQuestion={grimoire.currentQuestion}
                onSort={grimoire.handleSort}
                isLoading={grimoire.isLoadingButton}
                isOpenGrimoire={grimoire.isOpenGrimoire}
                onToggleModal={() => { grimoire.setOpenGrimoire(!grimoire.isOpenGrimoire) }}
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

            </div>

            {/* Divisor Editorial */}
            <hr className="ink-divider" />

            {/* Mural (O texto flutua direto na imagem de fundo) */}
            <div className="message-wall">
              <h2>Mural de Mensagens 📜</h2>

              <MessageWall
                messages={grimoire.messages}
                replyingTo={grimoire.replyingTo}
                senderName={grimoire.senderName}
                answerText={grimoire.answerText}
                messageIdEditing={grimoire.messageIdEditing}

                setSenderName={grimoire.setSenderName}
                setAnswerText={grimoire.setAnswerText}

                //Reply//
                onReply={(messageId, questionId) => {
                  grimoire.setReplyingTo(messageId)        //Abre a caixa de texto
                  grimoire.setQuestionIdReply(questionId)  //Guarda a ID da pergunta pro envio
                }}

                onCancelReply={() => {
                  grimoire.setReplyingTo(null);
                  grimoire.setQuestionIdReply(null);
                }}

                onSubmitReply={grimoire.handleSubmitReply}
                openEdition={(messageText, messageId) => {
                  grimoire.handleEdition(messageText, messageId)
                }}


                //Edit//
                onSubmitEdit={grimoire.handleEditionSubmit}
                onCancelEdit={() => {
                  grimoire.setMessageIdEditing(null)
                  grimoire.setAnswerText('')
                }}
              />

            </div>
          </section>

          {/* Coluna Direita */}
          <aside className="editorial-section right-column">
            <h2>🕯️ Eventos & Crônicas</h2>
            <p>Curiosidades, notas do autor e atualizações sobre o Grimório.</p>
          </aside>

        </main>

      </div>

    </>
  )
}

export default App