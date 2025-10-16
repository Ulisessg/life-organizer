import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk"; import { CreateIngredient } from "../molecules/CreateIngredient";
import { ListIngredients } from "../molecules/ListIngredients";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "./css/PersonalIngredients.css"

export function PersonalIngredients() {
  const userIngredients = useSelector((state: RootState) => state.userIngredients)
  return <div className="personal_ingredients-container">
    <ListIngredients
      ingredients={userIngredients}
      thunkDelete={deleteUserIngredientThunk}
      thunkGet={getUserIngredientThunk}
      title="Lista de ingredientes personales" />
    <CreateIngredient ingredientType="personal" />

  </div>
}