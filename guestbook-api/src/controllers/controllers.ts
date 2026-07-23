import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js"

/* =================== GET API's ===================*/
export function renderHome(req: Request, res: Response) {
    res.json({
        message: "Bem-vindo à API do Grimório de Mensagens! 🧙‍♂️",
        status: "online"
    });
}

export async function getAnswers(req: Request, res: Response) {

    try {
        //caso queira filtrar uma answer com uma question especifica.
        const { questionId } = req.query

        const whereClause: any = {
            parentId: null // Sempre traz apenas as threads principais no topo
        };

        if (questionId) {
            whereClause.questionId = Number(questionId); //Se tiver questionId, vira uma reply
        }

        const answers = await prisma.answer.findMany({
            where: whereClause,
            include: {
                replies: {
                    orderBy: {
                        createdAt: "asc" // Mas, inclui também as respostas dentro da thread em ordem cronológica
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        }
        )

        res.status(200).json(answers)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar as respostas no banco de dados." });
    }

}


/* =================== POST API's ===================*/
export async function postAnswer(req: Request, res: Response) {

    try {
        const { questionId, text, senderName, parentId } = req.body

        const newAnswer = await prisma.answer.create({
            data: {
                questionId: Number(questionId),
                text: text,
                senderName: senderName,
                parentId: parentId ? Number(parentId) : null //uma condição ternária só
            }
        })


        res.status(201).json({ //201 é created, pode ser ideal para POST.
            message: "Mensagem enviada! =)",
            allAnswers: newAnswer
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao salvar a resposta no banco de dados." });
    }
}

export async function postReply(req: Request, res: Response) {

    try {
        const { questionId, text, senderName, parentId } = req.body

        if (!parentId) {
            res.status(400).json({ error: "Para criar uma réplica, o campo parentId é obrigatório!" });
            return;
        }

        const newReply = await prisma.answer.create({
            data: {
                questionId: Number(questionId),
                text: text,
                senderName: senderName,
                parentId: Number(parentId)
            }
        })

        res.status(201).json({
            message: "Mensagem enviada! =)",
        })
    }
    catch (error) {
        console.error("Erro ao salvar réplica:", error);
        res.status(500).json({ error: "Erro ao salvar a resposta no banco de dados." })
    }
}


/* =================== PUT API's ===================*/
export async function updateAnswer(req: Request, res: Response) {

    try {
        const { id } = req.params //o Id da answer sendo editada
        const { text } = req.body //o novo texto

        if (!text || text.trim() === '') {
            res.status(400).json({ error: "O texto da resposta não pode ficar vazio!" })
            return
        }

        const updatedAnswer = await prisma.answer.update({
            where: { id: Number(id) },
            data: { 
                text: text,
                updateAt: new Date()
            }
        });

        res.status(200).json({
            message: "Resposta atualizada com sucesso! =)",
            answer: updatedAnswer
        })
    }
    catch (error) {
        console.error("Erro ao atualizar resposta:", error);
        res.status(500).json({ error: "Erro ao atualizar a resposta no banco de dados." })
    }
}