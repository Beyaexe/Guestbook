
//Modelo de dados que vai chegar via props
interface MessageFormProps{
    senderName: string,
    answerText: string,
    setSenderName: (value: string) => void
    setAnswerText: (value: string) => void
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
    
}

export function MessageForm({senderName, answerText, setSenderName, setAnswerText, onSubmit}: MessageFormProps){


    return(
        <form onSubmit={onSubmit}>
        
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

    )
}