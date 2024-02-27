import { z } from "zod";

export const UserSchema = z.object({
    email: z.string(),
    id: z.number(),
    image: z.nullable(z.string()),
    is_staff: z.boolean(),
    is_superuser: z.boolean(),
    name: z.string(),
})

export type UserType = z.infer<typeof UserSchema>

export const ListUserSchema = z.array(UserSchema).min(0)
export type ListUserType = z.infer<typeof ListUserSchema>