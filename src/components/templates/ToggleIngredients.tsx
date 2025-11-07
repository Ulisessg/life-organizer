"use client"
import { useEffect, useState } from "react";
import { PersonalIngredients } from "../organisms/PersonalIngredients";
import { ButtonC } from "../atoms/ButtonC";
import { SharedIngredients } from "../organisms/SharedIngredients";
import './css/ToggleIngredients.css'
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { getSharedIngredientsThunk } from "@/redux/thunks/getSharedIngredientsThunk";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

export function ToggleIngredients() {
  const [selected, setSelected] = useState<'personal' | 'shared'>('personal')
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserIngredientThunk())
    dispatch(getSharedIngredientsThunk())
  }, [dispatch])

  return <div className="toggle_ingredients">
    <h2 className="toggle_ingredients-title">Ingredientes</h2>
    <div className="toggle_ingredients-selector">
      <ButtonC
        data-templates-toggle-ingredients-personals-button
        active={selected === 'personal'}
        onClick={() => setSelected('personal')}
      >Personales</ButtonC>
      <ButtonC
        data-templates-toggle-ingredients-shared-button
        data-select-shared-ingredients
        active={selected === 'shared'}
        onClick={() => setSelected('shared')}
      >Compartidos</ButtonC>
    </div>
    {selected === 'personal' && <PersonalIngredients />}
    {selected === 'shared' && <SharedIngredients />}
  </div>
}