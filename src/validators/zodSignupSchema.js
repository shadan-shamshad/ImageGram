
import { z } from 'zod';

export const zodSignupSchema = z.object({

    username: z.string().min(5),
    email: z.string().min(),
    password: z.string().min(5)
})