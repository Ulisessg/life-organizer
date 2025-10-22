import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { BAD_REQUEST_RESPONSE, SERVER_ERROR_RESPONSE, UNAUTHORIZED_RESPONSE } from "../responses";
import { query } from "@/db/connector";
import { createIngredientSharedLarderSchema, DeleteIngredientSharedLarderSchema, deleteIngredientSharedLarderSchema, GetIngredientSharedLarderSchema, UpdateIngredientSharedLarderSchema, updateIngredientSharedLarderSchema } from "@/schemas/ingredientSharedLarderSchema";
import { ApiResponse } from "../api";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const ingredientsInSharedLarder: GetIngredientSharedLarderSchema[] = await query(`SELECT 
      shared_larder_ingredient.id, shared_larder_ingredient.shared_ingredient_id,
      shared_larder_ingredient.unit_of_measure_id, shared_larder_ingredient.quantity,
      shared_larder_ingredient.expiration_date, shared_ingredient.name
      FROM shared_larder_ingredient
      INNER JOIN shared_ingredient ON shared_ingredient.id = shared_larder_ingredient.shared_ingredient_id
      `, [])
    const response: ApiResponse<GetIngredientSharedLarderSchema[]> = {
      data: ingredientsInSharedLarder,
      error: false,
      message: ''
    }
    return new NextResponse(JSON.stringify(response), { status: 200 })
  }
  catch {
    return SERVER_ERROR_RESPONSE()
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const body = await req.json()
    const { error, data: ingredientData } = createIngredientSharedLarderSchema.safeParse(body)
    if (error) return BAD_REQUEST_RESPONSE()
    const ingredientInLarder: { id: number } = await query(`INSERT INTO shared_larder_ingredient 
      (id, shared_ingredient_id, unit_of_measure_id, quantity, expiration_date)
      VALUES (?,?,?,?,?) RETURNING id`
      , [null, ingredientData.shared_ingredient_id,
        ingredientData.unit_of_measure_id, ingredientData.quantity, ingredientData.expiration_date])
    const ingredient: [{ name: string }] = await query(`SELECT name from shared_ingredient WHERE id = ?`, [ingredientData.shared_ingredient_id])
    const response: ApiResponse<GetIngredientSharedLarderSchema> = {
      data: { ...ingredientData, id: ingredientInLarder.id, name: ingredient[0].name },
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
    const { error, data: ingredientData } = deleteIngredientSharedLarderSchema.safeParse(body)
    if (error) return BAD_REQUEST_RESPONSE()
    await query('DELETE FROM shared_larder_ingredient WHERE id = ?', [ingredientData.id])
    const response: ApiResponse<DeleteIngredientSharedLarderSchema> = {
      data: ingredientData,
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


export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return UNAUTHORIZED_RESPONSE
    const body = await req.json()
    const { error, data: ingredientData } = updateIngredientSharedLarderSchema.safeParse(body)
    if (error) return BAD_REQUEST_RESPONSE()
    await query(`UPDATE shared_larder_ingredient SET 
  unit_of_measure_id  = ?,
  quantity = ?,
  expiration_date = ?
  WHERE id = ?
  `, [ingredientData.unit_of_measure_id, ingredientData.quantity, ingredientData.expiration_date, ingredientData.id])
    const response: ApiResponse<UpdateIngredientSharedLarderSchema> = {
      data: ingredientData,
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