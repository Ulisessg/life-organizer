import { createSlice } from '@reduxjs/toolkit'
import { UnitsOfMeasureState } from '../redux'
import { getUnitsOfMeasureThunk } from '../thunks/getUnitsOfMeasureThunk'

const initialState: UnitsOfMeasureState = []

export const unitsOfMeasureSlice = createSlice({
  name: 'units_of_measure',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnitsOfMeasureThunk.fulfilled, (state, action) => {
      state = action.payload
      return state
    })
  }
})