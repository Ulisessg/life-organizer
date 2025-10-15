"use client"
import { AppDispatch, RootState } from "@/redux/store"
import { MouseEvent, useEffect, useId, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import '@/components/molecules/css/ListLarder.css'
import { ButtonA } from "../atoms/ButtonA"
import { ButtonB } from "../atoms/ButtonB"
import { type getUserLarderIngredientsThunk } from "@/redux/thunks/getUserLarderIngredientsThunk"
import { type deleteUserLarderIngredientThunk } from "@/redux/thunks/deleteUserLarderIngredientThunk"
import { type getIngredientsSharedLarderThunk } from "@/redux/thunks/getIngredientsSharedLarderThunk"
import { type deleteIngredientSharedLarderThunk } from "@/redux/thunks/deleteIngredientSharedLarderThunk"

export function ListLarder({ ingredients, title, thunkDelete, thunkGet }: ListLarderProps) {
  const unitsOfMeasure = useSelector((state: RootState) => state.unitsOfMeasure)
  const [editLarder, setEditLarder] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  const ingredientKey = useId()
  function toggleEdit() {
    setEditLarder(!editLarder)
  }

  function deleteIngredientFromLarder(e: MouseEvent<HTMLButtonElement>) {
    dispatch(thunkDelete({ id: Number(e.currentTarget.name) }))
  }

  useEffect(() => {
    // @ts-expect-error By some reason throw type error
    dispatch(thunkGet())
  }, [thunkGet, dispatch])

  return <section className="list_larder">
    <h3>{title}</h3>
    <ButtonA className="list_larder-edit" onClick={toggleEdit} type="button">{!editLarder ? 'Editar' : 'Cancelar'}</ButtonA>
    <div className="list_larder_sections">
      <div><p>Ingrediente</p></div>
      <div><p>Cantidad</p></div>
      <div><p>{!editLarder ? 'Fecha de expiración' : 'Eliminar'}</p></div>
    </div>
    <div>
      {ingredients.length === 0 && <p className="no-ingredients-warning">Sin ingredientes en la alacena</p>}
      {ingredients.map((ingredientInLarder) => {
        return <div key={`${ingredientKey}-${ingredientInLarder.id}`} className="list_larder_sections">
          <p>{ingredientInLarder.name}</p>
          <p>{ingredientInLarder.quantity} {unitsOfMeasure.find(({ id }) => id === ingredientInLarder.unit_of_measure_id)?.name}</p>
          {!editLarder && <p>{ingredientInLarder.expiration_date ? new Date(ingredientInLarder.expiration_date).toLocaleString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) : 'N/A'}</p>}
          {editLarder && <ButtonB
            className="list_larder_sections-delete"
            aria-label={`Eliminar ${ingredientInLarder.name}`}
            type="button"
            name={`${ingredientInLarder.id}`}
            onClick={deleteIngredientFromLarder}
          >
            X
          </ButtonB>}
        </div>
      })}
    </div>
  </section>
}

interface ListLarderProps {
  thunkGet: typeof getUserLarderIngredientsThunk | typeof getIngredientsSharedLarderThunk
  thunkDelete: typeof deleteUserLarderIngredientThunk | typeof deleteIngredientSharedLarderThunk
  ingredients: RootState['userLarderIngredients'] | RootState['sharedLarderIngredients']
  title: string
}