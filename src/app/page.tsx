"use client";

import { CreateUserIngredient } from "@/components/molecules/CreateUserIngredient";
import { AppDispatch } from "@/redux/store";
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserIngredientThunk())
  }, [])
  return <>
    <CreateUserIngredient />
  </>;
}
