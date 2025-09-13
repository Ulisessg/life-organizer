import { RootState } from "@/redux/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import '@/components/molecules/css/ListIngredients.css'
import { ButtonB } from "../atoms/ButtonB";
import { ButtonA } from "../atoms/ButtonA";
import { useListIngredients } from "./hooks/useListIngredients";


export function ListIngredients({ ingredientsList = "personal" }: ListIngredientsProps) {
  const userIngredientsInState = useSelector((state: RootState) => {
    if (ingredientsList === 'personal') {
      return state.userIngredients
    } else {
      return state.sharedIngredients
    }
  })
  console.log(userIngredientsInState)
  const userIngredients = useMemo(() => {
    const userIngredientsInArray = []
    for (const userIngredientId in userIngredientsInState) {
      userIngredientsInArray.push({ id: userIngredientId, name: userIngredientsInState[userIngredientId].name })
    }
    return userIngredientsInArray
  }, [userIngredientsInState])
  const { editList, toggleEditList, deleteIngredient } = useListIngredients({ ingredientsList })

  return <>
    <div className="list_ingredients_container">
      <h2 className="list_ingredients_title">Lista de ingredientes {ingredientsList === 'personal' ? 'propios' : 'compartidos'}</h2>
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
              name={id}
              onClick={deleteIngredient}
            >X</ButtonB>
          </div>
        })}
      </div>
    </div>
  </>
}

export interface ListIngredientsProps {
  ingredientsList: 'personal' | 'shared'
}