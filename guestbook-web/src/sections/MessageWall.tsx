import type { Reply } from "../models/reply"
import type { Message } from "../models/message"
import { questionsList } from "../models/questions"
import { MessageReply } from "../components/ui/MessageReply"

interface MessageWallProps {
    messages: Message[],
    replyingTo: number | null
    senderName: string
    answerText: string

    setSenderName: (val: string) => void
    setAnswerText: (val: string) => void
    onSubmitReply: (e: React.SubmitEvent<HTMLFormElement>) => void

    onCancelReply: () => void
    onReply: (messageId: number, questionId: number) => void
}


export function MessageWall({
    messages,
    replyingTo,
    senderName,
    answerText,
    setSenderName,
    setAnswerText,
    onSubmitReply,
    onReply,
    onCancelReply
}: MessageWallProps) {

    return (
        <>
            {
                messages.length === 0 ? (
                    <p>Nenhuma mensagem flutua por este grimório ainda...</p>
                ) : (

                    //==========================================//
                    //resposta principal
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        {messages.map((msg) => (
                            <div key={msg.id} style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "8px" }}>
                                <p><strong>"{questionsList[msg.questionId - 1].text}"</strong></p>
                                <p><strong>{msg.senderName}</strong> assinou:</p>
                                <p>{msg.text}</p>
                                <div style={{ display: "flex" }}>
                                    <small style={{ color: "#777" }}>
                                        Enviado em: {new Date(msg.createdAt).toLocaleDateString("pt-BR")}
                                    </small>

                                    {
                                        msg.updateAt && (
                                            <small style={{ color: "#777" }}>{"["}Editado em: {new Date(msg.updateAt).toLocaleDateString("pt-BR")}{"]"}
                                            </small>
                                        )}

                                    <button
                                        onClick={() => msg.id && onReply(msg.id, msg.questionId)}
                                        style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", padding: 0 }}
                                    >
                                        Responder 💬
                                    </button>
                                </div>

                                {replyingTo === msg.id && (
                                    <MessageReply
                                        personName={msg.senderName}
                                        senderName={senderName}
                                        answerText={answerText}
                                        setSenderName={setSenderName}
                                        setAnswerText={setAnswerText}
                                        onSubmit={onSubmitReply}
                                        onCancel={onCancelReply}
                                    />

                                )}



                                {/* //==========================================// */}
                                {/* Reply */}

                                {msg.replies && msg.replies.length > 0 ? (
                                    <div style={{
                                        marginTop: "12px",
                                        marginLeft: "20px",
                                        paddingLeft: "15px",
                                        borderLeft: "2px solid #555", // Um detalhe visual para parecer uma resposta encadeada
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px"
                                    }}>
                                        {msg.replies.map((reply: Reply) => (
                                            <div key={reply.id}>
                                                <p style={{ margin: "2px 0" }}>
                                                    <strong>{reply.senderName}</strong> respondeu:
                                                </p>
                                                <p style={{ margin: "2px 0" }}>
                                                    "{reply.text}"
                                                </p>
                                                <small style={{ color: "#777" }}>
                                                    Respondido em: {new Date(reply.createdAt).toLocaleDateString("pt-BR")}
                                                </small>

                                                {
                                                    reply.updateAt && (
                                                        <small style={{ color: "#777" }}>{"["}Editado em: {new Date(reply.updateAt).toLocaleDateString("pt-BR")}{"]"} 
                                                        </small>
                                                    )}

                                                <button
                                                    onClick={() => reply.id && onReply(reply.id, reply.questionId)}
                                                    style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", padding: 0 }}
                                                >
                                                    Responder 💬
                                                </button>

                                                {replyingTo === reply.id && (
                                                <MessageReply
                                                    personName={reply.senderName}
                                                    senderName={senderName}
                                                    answerText={answerText}
                                                    setSenderName={setSenderName}
                                                    setAnswerText={setAnswerText}
                                                    onSubmit={onSubmitReply}
                                                    onCancel={onCancelReply}
                                                />
                                            )}
                                            </div>
                                            
                                        ))}
                                    </div>

                                ) : null}


                            </div>

                        ))}
                    </div>
                )
            }
        </>
    )
}