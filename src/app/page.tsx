"use client";

import { CreateIngredient } from "@/components/molecules/CreateIngredient";
import { ListIngredients } from "@/components/molecules/ListIngredients";
import { AddIngredientToLarder } from "@/components/molecules/AddIngredientToLarder";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk";
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { deleteSharedIngredientThunk } from "@/redux/thunks/deleteSharedIngredientThunk";
import { getSharedIngredientsThunk } from "@/redux/thunks/getSharedIngredientsThunk";

export default function Home() {
  const userIngredients = useSelector((state: RootState) => state.userIngredients)
  const sharedIngredients = useSelector((state: RootState) => state.sharedIngredients)
  return <>
    <ListIngredients
      ingredients={userIngredients}
      thunkDelete={deleteUserIngredientThunk}
      thunkGet={getUserIngredientThunk}
      title="Lista de ingredientes personales" />
    <CreateIngredient ingredientType="personal" />
    <AddIngredientToLarder />
    <CreateIngredient ingredientType="shared" />
    <ListIngredients
      ingredients={sharedIngredients}
      thunkDelete={deleteSharedIngredientThunk}
      thunkGet={getSharedIngredientsThunk}
      title="Lista de ingredientes compartidos"
    />
  </>;
}
