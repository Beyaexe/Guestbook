import type { Reply } from "../models/reply"
import type { Message } from "../models/message"
import { questionsList } from "../models/questions"

interface MessageWallProps {
    messages: Message[],
}


export function MessageWall({ messages }: MessageWallProps) {

    return (
        <>
            {
                messages.length === 0 ? (
                    <p>Nenhuma mensagem flutua por este grimório ainda...</p>
                ) : (
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
                                </div>


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