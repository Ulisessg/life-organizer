import { uuid, number } from 'zod'

export const user_uuid = uuid()
export const id = number().positive()