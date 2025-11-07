import { ApiResponse } from '@/app/api/api'
import { UnitOfMeasureSchema } from '@/schemas/unitOfMeasureSchema'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUnitsOfMeasureThunk = createAsyncThunk<UnitOfMeasureSchema[]>('units_of_measure/get', async () => {
  const req = await fetch(`${window.location.href}/api/units-of-measure`)
  const res: ApiResponse<UnitOfMeasureSchema[]> = await req.json()
  if (!req.ok) {
    throw res.message
  }
  return res.data
})