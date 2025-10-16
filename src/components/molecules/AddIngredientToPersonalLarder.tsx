import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useId, useMemo } from "react";
import './css/AddIngredientToLarder.css'
import { getUnitsOfMeasureThunk } from "@/redux/thunks/getUnitsOfMeasureThunk";
import { ButtonA } from "../atoms/ButtonA";
import { addIngredientInUserLarderSchema } from "@/schemas/ingredientInUserLarderSchema";
import { createUserLarderIngredientThunk } from "@/redux/thunks/createUserLarderIngredientThunk";

export function AddIngredientToPersonalLarder() {
  const personalIngredientsInState = useSelector((state: RootState) => state.userIngredients)
  const unitsOfMeasure = useSelector((state: RootState) => state.unitsOfMeasure)
  const userIngredientsInLarder = useSelector((state: RootState) => state.userLarderIngredients)
  const userIngredientsInLarderIDS = useMemo(() => {
    const ingredientsIds: Record<number, boolean> = {}
    userIngredientsInLarder.forEach((ingredientInLarder) => {
      ingredientsIds[ingredientInLarder.user_ingredient_id] = true
    })
    return ingredientsIds
  }, [userIngredientsInLarder])
  const dispatch: AppDispatch = useDispatch()
  const selectIngredientID = useId()
  const selectUOMID = useId()
  const ingredientQTYID = useId()
  const expirationDateID = useId()

  const personalIngredients = useMemo(() => {
    const ingredientsList = []
    for (const personalIngredientId in personalIngredientsInState) {
      if (!userIngredientsInLarderIDS[personalIngredientId]) {
        ingredientsList.push({ id: personalIngredientId, name: personalIngredientsInState[personalIngredientId].name })
      }
    }
    return ingredientsList
  }, [personalIngredientsInState, userIngredientsInLarderIDS])

  function addIngredient() {
    const ingredient: HTMLSelectElement = document.querySelector(`select[id="${selectIngredientID}"]`) as HTMLSelectElement
    const ingredientId = Number(ingredient.value)
    const unitOfMeasure = document.querySelector(`select[id="${selectUOMID}"]`) as HTMLSelectElement
    const unitOfMeasureId = Number(unitOfMeasure.value)
    const ingredientQty = document.querySelector(`input[id="${ingredientQTYID}"]`) as HTMLInputElement
    const ingredientQtyValue = Number(ingredientQty.value)
    /*
    * Dates have the format YYYY-MM-DD
    */
    const expirationDateInput = document.querySelector(`input[id="${expirationDateID}"]`) as HTMLInputElement
    const expirationDate = expirationDateInput.value

    const { error: parseError, data: ingredientData } = addIngredientInUserLarderSchema.safeParse({
      user_ingredient_id: ingredientId,
      unit_of_measure_id: unitOfMeasureId,
      quantity: ingredientQtyValue,
      expiration_date: expirationDate || undefined
    })
    if (parseError) {
      console.log("Bad parsed")
      return
    }
    dispatch(createUserLarderIngredientThunk(ingredientData)).then(({ meta }) => {
      if (meta.requestStatus === "fulfilled") {
        const defValue = "default"
        ingredient.value = defValue
        unitOfMeasure.value = defValue
        ingredientQty.value = ""
        expirationDateInput.value = ""
      }
    })
  }

  useEffect(() => {
    dispatch(getUnitsOfMeasureThunk())
  }, [dispatch])

  return <section className="add-ingredient-to-larder section_container">
    <h3>Agrega un ingrediente a la alacena personal</h3>
    <form>
      <label htmlFor={selectIngredientID}>Selecciona el ingrediente</label>
      <select name="" id={selectIngredientID} defaultValue="default" >
        <option value="default" disabled>Elige</option>
        {personalIngredients.map((ingredient) => {
          return <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
        })}
      </select>
      <label htmlFor={selectUOMID}>Selecciona la unidad de medida</label>
      <select name="" id={selectUOMID} defaultValue="default" >
        <option value="default" disabled>Elige</option>
        {unitsOfMeasure.map((unitOfMeasure) =>
          <option key={`${unitOfMeasure.id}${unitOfMeasure.name}`} value={unitOfMeasure.id}>{unitOfMeasure.name}</option>)}
      </select>
      <label htmlFor={ingredientQTYID}>Ingresa la cantidad del ingrediente</label>
      <input id={ingredientQTYID} type="number" min="1" />
      <label htmlFor={expirationDateID}>Fecha de expiración</label>
      <input id={expirationDateID} type="date" />
      <ButtonA type="button" onClick={addIngredient}>Agregar ingrediente a la alacena</ButtonA>
    </form>
  </section>
}