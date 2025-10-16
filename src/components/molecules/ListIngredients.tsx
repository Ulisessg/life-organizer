import { RootState } from "@/redux/store";
import { useMemo } from "react";
import '@/components/molecules/css/ListIngredients.css'
import { ButtonB } from "../atoms/ButtonB";
import { ButtonA } from "../atoms/ButtonA";
import { useListIngredients } from "./hooks/useListIngredients";
import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk";
import { deleteSharedIngredientThunk } from "@/redux/thunks/deleteSharedIngredientThunk";
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { getSharedIngredientsThunk } from "@/redux/thunks/getSharedIngredientsThunk";


export function ListIngredients({ title, ingredients, thunkDelete, thunkGet }: ListIngredientsProps) {
  const userIngredients = useMemo(() => {
    const userIngredientsInArray = []
    for (const userIngredientId in ingredients) {
      userIngredientsInArray.push({ id: userIngredientId, name: ingredients[userIngredientId].name })
    }
    return userIngredientsInArray

  }, [ingredients])
  const { editList, toggleEditList, deleteIngredient } = useListIngredients({ thunkDelete, thunkGet })

  return <>
    <div className="list_ingredients_container section_container">
      <h2 className="list_ingredients_title">{title}</h2>
      {userIngredients.length > 0 &&
        <ButtonA
          className="list_ingredients_container-edit_button"
          onClick={toggleEditList}>
          {editList ? "Cancelar" : "Editar"}
        </ButtonA>
      }
      <div className="list_ingredients">
        {userIngredients.length === 0 && 'Sin ingredientes'}
        {userIngredients.map(({ id, name }) => {
          return <div key={id} className="ingredient_container">
            <p className="ingredient_name">{name}</p>
            <ButtonB
              aria-label={`Eliminar ${name}`}
              aria-hidden={!editList}
              className={`${!editList && 'ingredient_container-button-hidden'} ingredient_container-button`}
              type="button"
              name={`${id}`}
              onClick={deleteIngredient}
            >X</ButtonB>
          </div>
        })}
      </div>
    </div>
  </>
}

export interface ListIngredientsProps {
  title: string
  ingredients: RootState['sharedIngredients'] | RootState['userIngredients'] | RootState['userLarderIngredients']
  thunkDelete: typeof deleteUserIngredientThunk | typeof deleteSharedIngredientThunk
  thunkGet: typeof getUserIngredientThunk | typeof getSharedIngredientsThunk
}