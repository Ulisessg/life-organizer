"use client"
import { useId } from "react";
import { ButtonA } from "@/components/atoms/ButtonA";
import './css/CreateUserIngredient.css'
import { Input } from "@/components/atoms/Input";
import { useCreateIngredient } from "./hooks/useCreateIngredient";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

export function CreateIngredient({ ingredientType }: CreateIngredientProps) {
  const userIngredientInputId = useId()

  const { onChange,
    formIsValid,
    createIngredient,
    ingredientName,
    requestStatus
  } = useCreateIngredient({ ingredientType })

  return <form className="create_user_ingredient_form section_container" onSubmit={(e) => e.preventDefault()}>
    <h3>Agrega un ingrediente a{ingredientType === 'personal' ? ' tu' : ' la'} lista de ingredientes</h3>
    <label htmlFor={userIngredientInputId}>Nombre del ingrediente</label>
    <Input data-input-create-ingredient onChange={onChange} type="text" id={userIngredientInputId} value={ingredientName} />
    <ButtonA type="button" disabled={!formIsValid} onClick={createIngredient} data-button-create-ingredient>
      Añadir ingrediente
    </ButtonA>
    <div className="create_user_ingredient_form-error_message">
      {requestStatus === "rejected" && <p>Ocurrió un error creando el ingrediente</p>}
    </div>
    {requestStatus === "fulfilled" && <p>Ingrediente añadido</p>}
    {requestStatus === "pending" && <LoadingSpinner />}
  </form>
}

interface CreateIngredientProps {
  ingredientType: 'personal' | 'shared'
}