import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { BAD_REQUEST_RESPONSE, SERVER_ERROR_RESPONSE, UNAUTHORIZED_RESPONSE } from "@/app/api/responses";
import { addIngredientInUserLarderSchema, DeleteIngredientInUserLarderSchema, deleteIngredientInUserLarderSchema, GetIngredientInUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { query } from "@/db/connector";
import { ApiResponse } from "@/app/api/api";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const userLarderId: [{ id: number }] = await query('SELECT id FROM user_larder WHERE user_uuid = ?', [session.user.id])
    const ingredientsInLarder: GetIngredientInUserLarderSchema[] =
      await query(`SELECT user_larder_ingredient.id,user_larder_ingredient.user_larder_id,
        user_larder_ingredient.user_ingredient_id, user_ingredient.name,
        user_larder_ingredient.unit_of_measure_id,user_larder_ingredient.quantity,
        user_larder_ingredient.expiration_date
        FROM user_larder_ingredient 
        INNER JOIN user_ingredient ON user_ingredient.id = user_larder_ingredient.user_ingredient_id
         WHERE user_larder_id = ?`,
        [userLarderId[0].id])

    const response: ApiResponse<GetIngredientInUserLarderSchema[]> = {
      data: ingredientsInLarder,
      error: false,
      message: ''
    }
    return new NextResponse(JSON.stringify(response), {
      status: 200
    })
  } catch (e) {
    console.error(e)
    return SERVER_ERROR_RESPONSE()
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const body = await req.json()
    const { data: ingredientToAddInPersonalLarder, error: errorInParse } = addIngredientInUserLarderSchema.safeParse(body)
    if (errorInParse) {
      return BAD_REQUEST_RESPONSE()
    }
    const userLarderId: [{ id: number }] = await query('SELECT id FROM user_larder WHERE user_uuid = ?', [session.user.id])

    const ingredientInLarderId: [{ id: number }] = await query(`INSERT INTO user_larder_ingredient 
      (id, user_larder_id, user_ingredient_id, unit_of_measure_id, quantity, expiration_date)
      VALUES (null, ?, ?, ?, ?, ?) RETURNING id`,
      [
        userLarderId[0].id, ingredientToAddInPersonalLarder.user_ingredient_id,
        ingredientToAddInPersonalLarder.unit_of_measure_id,
        ingredientToAddInPersonalLarder.quantity,
        ingredientToAddInPersonalLarder.expirationDate
      ])
    const ingredientName: [{ name: string }] = await query('SELECT name FROM user_ingredient WHERE id = ?', [ingredientToAddInPersonalLarder.user_ingredient_id])
    const response: ApiResponse<GetIngredientInUserLarderSchema> = {
      data: { ...ingredientToAddInPersonalLarder, id: ingredientInLarderId[0].id, name: ingredientName[0].name },
      error: false,
      message: ''
    }
    return new NextResponse(JSON.stringify(response), {
      status: 201
    })
  } catch {
    return SERVER_ERROR_RESPONSE()
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const body = await req.json()

    const { data: ingredientData, error: errorInParse } = deleteIngredientInUserLarderSchema.safeParse(body)
    if (errorInParse) {
      return BAD_REQUEST_RESPONSE()
    }

    const larderId: [{ id: number }] = await query('SELECT id FROM user_larder WHERE user_uuid = ?', [session.user.id])
    await query('DELETE FROM user_larder_ingredient WHERE user_larder_id = ? AND id = ?', [larderId[0].id, ingredientData.id])
    const response: ApiResponse<DeleteIngredientInUserLarderSchema> = {
      data: { id: ingredientData.id },
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