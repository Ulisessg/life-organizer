"use client"
import { useId } from "react";
import { ButtonA } from "@/components/atoms/ButtonA";
import './css/CreateUserIngredient.css'
import { Input } from "@/components/atoms/Input";
import { useCreateUserIngredient } from "./hooks/useCreateUserIngredient";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

export function CreateUserIngredient() {
  const userIngredientInputId = useId()
  const { onChange,
    formIsValid,
    createUserIngredient,
    userIngredientName,
    createIngredientError, loadingCreateIngredient
  } = useCreateUserIngredient()
  return <form className="create_user_ingredient_form" onSubmit={(e) => e.preventDefault()}>
    <h3>Agrega un ingrediente a tu lista de ingredientes</h3>
    <label htmlFor={userIngredientInputId}>Nombre del ingrediente</label>
    <Input onChange={onChange} type="text" id={userIngredientInputId} value={userIngredientName} />
    <ButtonA type="button" disabled={!formIsValid} onClick={createUserIngredient}>
      Añadir ingrediente
    </ButtonA>
    <p className="create_user_ingredient_form-error_message">
      {createIngredientError.length > 0 && createIngredientError}
    </p>
    {loadingCreateIngredient && <LoadingSpinner />}
  </form>
}