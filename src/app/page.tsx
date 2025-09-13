"use client";

import { CreateIngredient } from "@/components/molecules/CreateIngredient";
import { ListIngredients } from "@/components/molecules/ListIngredients";


export default function Home() {

  return <>
    <ListIngredients ingredientsList="personal" />
    <CreateIngredient ingredientType="personal" />
    <CreateIngredient ingredientType="shared" />
    <ListIngredients ingredientsList="shared" />
  </>;
}
