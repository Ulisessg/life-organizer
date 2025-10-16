import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ListLarder } from "@/components/molecules/ListLarder";
import { deleteIngredientSharedLarderThunk } from "@/redux/thunks/deleteIngredientSharedLarderThunk"
import { AddIngredientToSharedLarder } from "@/components/molecules/AddIngredientToSharedLarder";
import './css/SharedLarder.css'

export function SharedLarder() {
  const sharedLarderIngredients = useSelector((state: RootState) => state.sharedLarderIngredients)
  return <div className="shared_larder-container">
    <ListLarder
      ingredients={sharedLarderIngredients}
      title="Alacena compartida"
      thunkDelete={deleteIngredientSharedLarderThunk}
    />
    <AddIngredientToSharedLarder />
  </div>
}