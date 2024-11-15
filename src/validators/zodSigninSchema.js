

import { z } from 'zod';

export const zodSigninSchema = z.object({

    email: z.string().min(),
    password: z.string().min(5)
})