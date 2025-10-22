import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { BAD_REQUEST_RESPONSE, SERVER_ERROR_RESPONSE, UNAUTHORIZED_RESPONSE } from "../responses";
import { query } from "@/db/connector";
import { createSharedIngredientSchema, deleteSharedIngredientSchema, GetSharedIngredientsSchema } from "@/schemas/sharedIngredientsSchema";
import { ApiResponse } from "../api";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const sharedIngredients: GetSharedIngredientsSchema[] = await query('SELECT * FROM shared_ingredient', [])
    const response: ApiResponse<GetSharedIngredientsSchema[]> = {
      data: sharedIngredients,
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
  const session = await getServerSession(authOptions)
  if (!session) return UNAUTHORIZED_RESPONSE
  try {
    const body = await req.json()
    const ingredient = createSharedIngredientSchema.parse(body)
    const createdIngredient: [GetSharedIngredientsSchema] =
      await query('INSERT INTO shared_ingredient (id, name) VALUES (?,?) RETURNING id, name', [null, ingredient.name])
    const response: ApiResponse<GetSharedIngredientsSchema> = {
      data: createdIngredient[0],
      error: false,
      message: ''
    }
    return new NextResponse(JSON.stringify(response), {
      status: 201
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return BAD_REQUEST_RESPONSE()
    }
    return SERVER_ERROR_RESPONSE()
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return UNAUTHORIZED_RESPONSE
  try {
    const body = await req.json()
    const ingredient = deleteSharedIngredientSchema.parse(body)
    await query('DELETE FROM shared_ingredient WHERE id = ?', [ingredient.id])
    const response: ApiResponse<number> = {
      data: ingredient.id,
      error: false,
      message: ''
    }
    return new NextResponse(JSON.stringify(response), {
      status: 200
    })
  } catch (error) {
    if (error instanceof ZodError) return BAD_REQUEST_RESPONSE()
    return SERVER_ERROR_RESPONSE()
  }
}