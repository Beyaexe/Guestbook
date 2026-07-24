import type { Message } from "../../models/message"
import { MessageBlock } from "../../components/ui/MessageBlock"

interface MessageWallProps {
    messages: Message[],
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
    onReply: (messageId: number, questionId: number) => void
    openEdition: (messageText: string, messageId: number) => void
}


export function MessageWall({
    messages,
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
                  
                        {messages.map((msg) =>
                            <MessageBlock
                                key={msg.id}
                                message={msg}
                                replyingTo={replyingTo}
                                senderName={senderName}
                                answerText={answerText}
                                messageIdEditing={messageIdEditing}
                                setSenderName={setSenderName}
                                setAnswerText={setAnswerText}
                                onSubmitReply={onSubmitReply}
                                onSubmitEdit={onSubmitEdit}
                                onReply={onReply}
                                onCancelReply={onCancelReply}
                                onCancelEdit={onCancelEdit}
                                openEdition={openEdition}
                            />
                            )
                        }

                    </div>

                )
            }
        </>
    )
}