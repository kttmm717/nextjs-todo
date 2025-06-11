import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const todos = [
        { todo: '音読', time: 30 },
        { todo: '計算ドリル', time: 45 },
        { todo: '歴史暗記', time: 10 },
    ]

    try {
        for (const todo of todos) {
            await prisma.todo.upsert({
                where: { todo: todo.todo },
                update: {},
                create: { todo: todo.todo, time: todo.time }
            });
        }
    } catch (error) {
        console.error(error)
        process.exit(1)
    } finally {
        await prisma.$disconnect();
    }
}
main();