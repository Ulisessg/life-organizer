import { getServerSession } from "next-auth";
import { SERVER_ERROR_RESPONSE, UNAUTHORIZED_RESPONSE } from "../responses";
import { query } from "@/db/connector";
import { ApiResponse } from "../api";
import { UnitOfMeasureSchema } from "@/schemas/unitOfMeasureSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession()
    if (!session) return UNAUTHORIZED_RESPONSE
    const unitsOfMeasure: UnitOfMeasureSchema[] = await query('SELECT * FROM unit_of_measure', [])
    const response: ApiResponse<UnitOfMeasureSchema[]> = { data: unitsOfMeasure, error: false, message: '' }
    return new NextResponse(JSON.stringify(response), {
      status: 200
    })
  } catch {
    return SERVER_ERROR_RESPONSE()
  }
}