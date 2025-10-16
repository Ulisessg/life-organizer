import { deleteSharedIngredientThunk } from "@/redux/thunks/deleteSharedIngredientThunk";
import { getSharedIngredientsThunk } from "@/redux/thunks/getSharedIngredientsThunk";
import { CreateIngredient } from "@/components/molecules/CreateIngredient";
import { ListIngredients } from "@/components/molecules/ListIngredients";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import './css/SharedIngredients.css'

export function SharedIngredients() {
  const sharedIngredients = useSelector((state: RootState) => state.sharedIngredients)
  return <div className="shared_ingredients-container">
    <ListIngredients
      ingredients={sharedIngredients}
      thunkDelete={deleteSharedIngredientThunk}
      thunkGet={getSharedIngredientsThunk}
      title="Lista de ingredientes compartidos"
    />
    <CreateIngredient ingredientType="shared" />

  </div>
}