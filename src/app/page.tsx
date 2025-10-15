"use client";

import { CreateIngredient } from "@/components/molecules/CreateIngredient";
import { ListIngredients } from "@/components/molecules/ListIngredients";
import { AddIngredientToPersonalLarder } from "@/components/molecules/AddIngredientToPersonalLarder";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk";
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { deleteSharedIngredientThunk } from "@/redux/thunks/deleteSharedIngredientThunk";
import { getSharedIngredientsThunk } from "@/redux/thunks/getSharedIngredientsThunk";
import { ListLarder } from "@/components/molecules/ListLarder";
import { getUserLarderIngredientsThunk } from "@/redux/thunks/getUserLarderIngredientsThunk"
import { deleteUserLarderIngredientThunk } from "@/redux/thunks/deleteUserLarderIngredientThunk"
import { getIngredientsSharedLarderThunk } from "@/redux/thunks/getIngredientsSharedLarderThunk"
import { deleteIngredientSharedLarderThunk } from "@/redux/thunks/deleteIngredientSharedLarderThunk"
import { AddIngredientToSharedLarder } from "@/components/molecules/AddIngredientToSharedLarder";

export default function Home() {
  const userIngredients = useSelector((state: RootState) => state.userIngredients)
  const sharedIngredients = useSelector((state: RootState) => state.sharedIngredients)
  const sharedLarderIngredients = useSelector((state: RootState) => state.sharedLarderIngredients)
  const userLarderIngredients = useSelector((state: RootState) => state.userLarderIngredients)
  return <>
    <CreateIngredient ingredientType="personal" />
    <ListIngredients
      ingredients={userIngredients}
      thunkDelete={deleteUserIngredientThunk}
      thunkGet={getUserIngredientThunk}
      title="Lista de ingredientes personales" />
    <AddIngredientToPersonalLarder />
    <ListLarder
      ingredients={userLarderIngredients}
      title="Alacena personal"
      thunkDelete={deleteUserLarderIngredientThunk}
      thunkGet={getUserLarderIngredientsThunk}
    />
    <CreateIngredient ingredientType="shared" />
    <AddIngredientToSharedLarder />
    <ListLarder
      ingredients={sharedLarderIngredients}
      title="Alacena compartida"
      thunkDelete={deleteIngredientSharedLarderThunk}
      thunkGet={getIngredientsSharedLarderThunk}
    />
    <ListIngredients
      ingredients={sharedIngredients}
      thunkDelete={deleteSharedIngredientThunk}
      thunkGet={getSharedIngredientsThunk}
      title="Lista de ingredientes compartidos"
    />
  </>;
}
