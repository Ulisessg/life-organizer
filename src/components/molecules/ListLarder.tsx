"use client"
import { AppDispatch, RootState } from "@/redux/store"
import { getUserLarderIngredientsThunk } from "@/redux/thunks/getUserLarderIngredientsThunk"
import { MouseEvent, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import '@/components/molecules/css/ListLarder.css'
import { ButtonA } from "../atoms/ButtonA"
import { ButtonB } from "../atoms/ButtonB"
import { deleteUserLarderIngredientThunk } from "@/redux/thunks/deleteUserLarderIngredientThunk"

export function ListLarder() {
  const larderIngredients = useSelector((state: RootState) => state.userLarderIngredients)
  const unitsOfMeasure = useSelector((state: RootState) => state.unitsOfMeasure)
  const [editLarder, setEditLarder] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()

  function toggleEdit() {
    setEditLarder(!editLarder)
  }

  function deleteIngredientFromLarder(e: MouseEvent<HTMLButtonElement>) {
    dispatch(deleteUserLarderIngredientThunk({ id: Number(e.currentTarget.name) }))
  }

  useEffect(() => {
    dispatch(getUserLarderIngredientsThunk())
  }, [dispatch])

  return <section className="list_larder">
    <h3>Alacena</h3>
    <ButtonA className="list_larder-edit" onClick={toggleEdit} type="button">{!editLarder ? 'Editar' : 'Cancelar'}</ButtonA>
    <div className="list_larder_sections">
      <div><p>Ingrediente</p></div>
      <div><p>Cantidad</p></div>
      <div><p>{!editLarder ? 'Fecha de expiración' : 'Eliminar'}</p></div>
    </div>
    <div>
      {larderIngredients.length === 0 && <p className="no-ingredients-warning">Sin ingredientes en la alacena</p>}
      {larderIngredients.map((ingredientInLarder) => {
        return <div key={ingredientInLarder.id} className="list_larder_sections">
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