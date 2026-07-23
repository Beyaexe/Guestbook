interface MessageEditProps {
    answerText: string,
    setAnswerText: (value: string) => void
    onSubmitEdit: (e: React.SubmitEvent<HTMLFormElement>) => void
    onCancel: () => void
}

export function MessageEditBlock({
    answerText,
    setAnswerText,
    onSubmitEdit,
    onCancel,
}: MessageEditProps) {

    return (
        <>
                <form onSubmit={onSubmitEdit}> 

                    <div>
                      <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        rows={4}
                        cols={40}
                        required
                        maxLength={500}
                      />
                    </div>
        
    
                    <button type="button" onClick={onCancel} style={{ color: "red" }}>Cancelar</button>

                    <button type="submit">
                      Enviar Mensagem 📜
                    </button>
        
        
                  </form>

        </>
    )
}