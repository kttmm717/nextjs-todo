'use server';

import { revalidatePath } from 'next/cache';
import postgres from 'postgres';
import { z } from 'zod';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
    id: z.string(),
    todo: z.string().min(1, { message: 'todoを入力してください' }),
    time: z.coerce.number().min(1, { message: '時間を入力してください' }),
});

export type State = {
    errors?: {
        todo?: string[];
        time?: string[];
    };
    message?: string | null;
}

const CreateTodo = FormSchema.omit({ id: true });

// todo作成
export async function createTodo(prevState: State, formData: FormData) {

    const validatedFields = CreateTodo.safeParse({
        todo: formData.get('todo'),
        time: formData.get('time'),
    });

    if (!validatedFields.success) {
        console.log("バリデーションエラー詳細:", validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'todo作成に失敗しました',
        };
    }

    const { todo, time } = validatedFields.data;
    console.log("Inserting into DB:", { todo, time });

    try {
        await sql`
            INSERT INTO todos (todo, time)
                VALUES (${todo}, ${time})
        `;
    } catch (error) {
        console.error("SQL Error:", error);
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/');

    return {
        errors: {},
        message: 'Success',
    };
}

// todo削除
export async function deleteTodo(formData: FormData) {
    const id = formData.get('id');
    
    if (typeof id !== 'string') throw new Error('Invalid id');

    await sql`
        DELETE FROM todos
        WHERE id = ${id}
    `;

    revalidatePath('/');
}