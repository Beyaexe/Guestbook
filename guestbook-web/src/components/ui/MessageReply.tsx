import React from "react";

interface MessageReplyProps{
    personName: string
    senderName: string
    answerText: string
    setSenderName: (val: string) => void
    setAnswerText: (val: string) => void
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
    onCancel: () => void
}

export function MessageReply({
    personName, answerText, senderName, setSenderName, setAnswerText, onSubmit, onCancel
}:MessageReplyProps){

    return (
    <form onSubmit={onSubmit} style={{ marginTop: "10px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <p style={{ margin: "0 0 8px 0" }}><strong>Respondendo a: </strong>{personName}</p>
      
      <input 
        type="text" 
        placeholder="Quem é você?" 
        value={senderName} 
        onChange={(e) => setSenderName(e.target.value)} 
        required 
      />
      
      <textarea 
        placeholder="Responda aqui!" 
        value={answerText} 
        onChange={(e) => setAnswerText(e.target.value)} 
        rows={3}
        style={{ display: "block", width: "100%", margin: "8px 0" }}
        required 
      />
      
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit">Enviar Mensagem 📜</button>
        <button type="button" onClick={onCancel} style={{ color: "red" }}>Cancelar</button>
      </div>
    </form>
  );
}
