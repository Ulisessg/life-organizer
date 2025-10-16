import { useSelector } from "react-redux";
import { AddIngredientToPersonalLarder } from "../molecules/AddIngredientToPersonalLarder";
import { ListLarder } from "../molecules/ListLarder";
import { deleteUserLarderIngredientThunk } from "@/redux/thunks/deleteUserLarderIngredientThunk"
import { RootState } from "@/redux/store";
import './css/PersonalLarder.css'

export function PersonalLarder() {
  const userLarderIngredients = useSelector((state: RootState) => state.userLarderIngredients)
  return <div className="personal_larder-container">
    <ListLarder
      ingredients={userLarderIngredients}
      title="Alacena personal"
      thunkDelete={deleteUserLarderIngredientThunk}
    />
    <AddIngredientToPersonalLarder />
  </div>
}