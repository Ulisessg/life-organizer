"use client"
import { useState } from "react";
import { PersonalIngredients } from "../organisms/PersonalIngredients";
import { ButtonC } from "../atoms/ButtonC";
import { SharedIngredients } from "../organisms/SharedIngredients";
import './css/ToggleIngredients.css'

export function ToggleIngredients() {
  const [selected, setSelected] = useState<'personal' | 'shared'>('personal')

  return <div className="toggle_ingredients">
    <h2 className="toggle_ingredients-title">Ingredientes</h2>
    <div className="toggle_ingredients-selector">
      <ButtonC
        active={selected === 'personal'}
        onClick={() => setSelected('personal')}

      >Personales</ButtonC>
      <ButtonC
        active={selected === 'shared'}
        onClick={() => setSelected('shared')}
      >Compartidos</ButtonC>
    </div>

    {selected === 'personal' && <PersonalIngredients />}
    {selected === 'shared' && <SharedIngredients />}
  </div>
}