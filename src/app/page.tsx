"use client";

import { CreateUserIngredient } from "@/components/molecules/CreateUserIngredient";
import { ListUserIngredients } from "@/components/molecules/ListUserIngredients";


export default function Home() {

  return <>
    <ListUserIngredients ingredientsList="personal" />
    <CreateUserIngredient />
  </>;
}
