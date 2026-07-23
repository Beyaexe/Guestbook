import type { Message } from "../../models/message"
import { questionsList } from "../../models/questions"
import { MessageReply } from "./MessageReply"
import type { Reply } from "../../models/reply"
import { MessageEditBlock } from "./MessageEdit"
// *=========================* //




interface MessageProps {
    message: Message
    replyingTo: number | null
    senderName: string
    answerText: string
    messageIdEditing: number | null

    setSenderName: (val: string) => void
    setAnswerText: (val: string) => void
    onSubmitEdit: (e: React.SubmitEvent<HTMLFormElement>) => void
    onSubmitReply: (e: React.SubmitEvent<HTMLFormElement>) => void

    onCancelReply: () => void
    onCancelEdit: () => void
    onReply: (messageId: number, questionId: number) => void,
    openEdition: (messageText: string, messageId: number) => void
}

function canEdit(message?: Message, reply?: Reply) {

    const actualId = message ? message.id : reply?.id;
    const actualDate = message ? message.createdAt : reply?.createdAt;

    if (!actualId || !actualDate) return false;

    const myIds = JSON.parse(localStorage.getItem("@grimoire:my_answers") || "[]");
    if (!myIds.includes(actualId)) return false;

    const dataBackend = new Date(actualDate).getTime();
    const now = Date.now();
    const limitTime = 24 * 60 * 60 * 1000;

    //Retorna true se a diferença for menor que 24h
    return (now - dataBackend) < limitTime;
}

export function MessageBlock({
    message,
    replyingTo,
    senderName,
    answerText,
    messageIdEditing,
    setSenderName,
    setAnswerText,
    onSubmitReply,
    onSubmitEdit,
    onReply,
    onCancelReply,
    onCancelEdit,
    openEdition,
}: MessageProps) {

    return (
        <>
            <div style={{ border: "1px solid #ccc", padding: "4px", borderRadius: "8px", "position": "relative" }}>
                <p><strong>"{questionsList[message.questionId - 1].text}"</strong></p>
                <p><strong>{message.senderName}</strong> assinou:</p>
               
                {/* Está editando? */}
                {messageIdEditing == message.id ? ( 
                    <MessageEditBlock
                        answerText={answerText}
                        setAnswerText={setAnswerText}
                        onSubmitEdit={onSubmitEdit}
                        onCancel={onCancelEdit}
                    
                    />
                ): (
                    <p>{message.text}</p>
                )}

                <div style={{ display: "flex" }}>
                    <small style={{ color: "#777" }}>
                        Enviado em: {new Date(message.createdAt).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                    </small>

                    {
                        message.updateAt && (
                            <small style={{ color: "#777" }}>{"["}Editado em: {new Date(message.updateAt).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}{"]"}
                            </small>
                        )}


                    <button
                        onClick={() => message.id && onReply(message.id, message.questionId)}
                        style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", padding: 0 }}
                    >
                        Responder 💬
                    </button>

                    {/* Edit button */}
                    {canEdit(message) ? (
                        <button 
                        style={{
                            "border": "none",
                            "position": "absolute",
                            "top": "10px", //está bugado
                            "right": "10px"

                        }}
                        onClick={() => openEdition(message.text, message.id)}>
                            <svg
                                viewBox="0 0 512.005 512.005"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="currentColor"
                            >
                                <g>
                                    <rect
                                        x="57.6"
                                        y="221.513"
                                        transform="matrix(0.7071 -0.7071 0.7071 0.7071 -138.3304 242.63)"
                                        width="332.229"
                                        height="133.564"
                                    />
                                </g>

                                <g>
                                    <rect
                                        x="359.903"
                                        y="68.64"
                                        transform="matrix(0.7071 -0.7071 0.7071 0.7071 14.5451 305.959)"
                                        width="33.391"
                                        height="133.564"
                                    />
                                </g>

                                <g>
                                    <polygon points="41.325,388.045 0.005,512.005 123.965,470.685" />
                                </g>

                                <g>
                                    <rect
                                        x="401.078"
                                        y="6.825"
                                        transform="matrix(0.7071 -0.7071 0.7071 0.7071 76.3539 331.5492)"
                                        width="74.629"
                                        height="133.564"
                                    />
                                </g>
                            </svg>
                        </button>
                    ) : null}


                </div>


                {replyingTo === message.id && (
                    <MessageReply
                        personName={message.senderName}
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

                {message.replies && message.replies.length > 0 ? (
                    <div style={{
                        marginTop: "12px",
                        marginLeft: "20px",
                        paddingLeft: "15px",
                        borderLeft: "2px solid #555", // Um detalhe visual para parecer uma resposta encadeada
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px"
                    }}>
                        {message.replies.map((reply: Reply) => (
                            <div key={reply.id} style={{position: "relative"}}>
                                <p style={{ margin: "2px 0" }}>
                                    <strong>{reply.senderName}</strong> respondeu:
                                </p>

                                {/* Está editando? */}
                                {messageIdEditing == reply.id ? ( 
                                    <MessageEditBlock
                                        answerText={answerText}
                                        setAnswerText={setAnswerText}
                                        onSubmitEdit={onSubmitEdit}
                                        onCancel={onCancelEdit}
                                    
                                    />
                                ): (
                                    <p>{reply.text}</p>
                                )}

                                {/* <p style={{ margin: "2px 0" }}>
                                    {reply.text}
                                </p> */}
                                <small style={{ color: "#777" }}>
                                    Respondido em: {new Date(reply.createdAt).toLocaleString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                </small>

                                {
                                    reply.updateAt && (
                                        <small
                                            style={{ color: "#777" }}>
                                            {"["}Editado em: {new Date(reply.updateAt).toLocaleString("pt-BR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}{"]"}
                                        </small>
                                    )}

                                <button
                                    onClick={() => reply.id && onReply(reply.id, reply.questionId)}
                                    style={{ background: "none", border: "none", color: "#0070f3", cursor: "pointer", padding: 0 }}
                                >
                                    Responder 💬
                                </button>

                                {/* Edit button */}
                                {canEdit(reply) ? (
                                    <button 
                                    style={{
                                        "border": "none",
                                        "position": "absolute",
                                        "top": "10px", //está bugado
                                        "right": "10px"

                                    }}
                                    onClick={() => openEdition(reply.text, reply.id)}>
                                        <svg
                                            viewBox="0 0 512.005 512.005"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={20}
                                            height={20}
                                            fill="currentColor"
                                        >
                                            <g>
                                                <rect
                                                    x="57.6"
                                                    y="221.513"
                                                    transform="matrix(0.7071 -0.7071 0.7071 0.7071 -138.3304 242.63)"
                                                    width="332.229"
                                                    height="133.564"
                                                />
                                            </g>

                                            <g>
                                                <rect
                                                    x="359.903"
                                                    y="68.64"
                                                    transform="matrix(0.7071 -0.7071 0.7071 0.7071 14.5451 305.959)"
                                                    width="33.391"
                                                    height="133.564"
                                                />
                                            </g>

                                            <g>
                                                <polygon points="41.325,388.045 0.005,512.005 123.965,470.685" />
                                            </g>

                                            <g>
                                                <rect
                                                    x="401.078"
                                                    y="6.825"
                                                    transform="matrix(0.7071 -0.7071 0.7071 0.7071 76.3539 331.5492)"
                                                    width="74.629"
                                                    height="133.564"
                                                />
                                            </g>
                                        </svg>
                                    </button>
                                ) : null}
                                

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
        </>
    )
}