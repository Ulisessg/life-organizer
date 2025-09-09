import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth';
import { BAD_REQUEST_RESPONSE, SERVER_ERROR_RESPONSE, UNAUTHORIZED_RESPONSE } from '@/app/api/responses'
import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '../api';
import { deleteUserIngredientSchema, GetUserIngredientSchema } from '@/schemas/userIngredientSchema';
import { createUserIngredientSchema } from '@/schemas/userIngredientSchema'
import { ZodError } from 'zod'
import { query } from '@/db/connector';

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return UNAUTHORIZED_RESPONSE
        }
        const user_uuid = session.user.id
        const userIngredients: GetUserIngredientSchema[] = await query('SELECT id,name FROM user_ingredient WHERE user_uuid = ?', [user_uuid])
        const response: ApiResponse<GetUserIngredientSchema[]> = {
            data: userIngredients,
            error: false,
            message: ''
        }
        return new NextResponse(JSON.stringify(response), {
            status: 200
        })
    } catch {
        return SERVER_ERROR_RESPONSE()
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return UNAUTHORIZED_RESPONSE
        const user_uuid = session.user.id
        const body = await req.json()
        const userIngredient = await createUserIngredientSchema.parseAsync(body)
        const createdUserIngredient: [GetUserIngredientSchema] = await query
            ('INSERT INTO user_ingredient (id, name, user_uuid) VALUES (?,?,?) RETURNING id, name', [null, userIngredient.name, user_uuid])

        const response: ApiResponse<GetUserIngredientSchema> = {
            data: createdUserIngredient[0],
            error: false,
            message: 'user ingredient created'
        }
        return new NextResponse(JSON.stringify(response), { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return BAD_REQUEST_RESPONSE()
        }
        // @ts-expect-error Validates if database throws a duplicated entry
        if (error?.errno === 1062) {
            return BAD_REQUEST_RESPONSE('Duplicated')
        }
        return SERVER_ERROR_RESPONSE()
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return UNAUTHORIZED_RESPONSE
        const user_uuid = session.user.id
        const body = await req.json()
        const userIngredient = await deleteUserIngredientSchema.parseAsync(body)
        await query(`DELETE FROM user_ingredient
            WHERE id = ? AND user_uuid = ?`, [userIngredient.id, user_uuid])
        const response: ApiResponse<number> = {
            data: userIngredient.id,
            error: false,
            message: 'User ingredient deleted'
        }
        return new NextResponse(JSON.stringify(response), {
            status: 200
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return BAD_REQUEST_RESPONSE()
        }
        return SERVER_ERROR_RESPONSE()
    }
}