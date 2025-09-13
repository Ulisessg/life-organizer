import { createUserIngredientSchema } from "@/schemas/userIngredientSchema";
import { ChangeEvent, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { createUserIngredientThunk } from "@/redux/thunks/createUserIngredientThunk";
import { useDispatch } from "react-redux";
import { createSharedIngredientThunk } from "@/redux/thunks/createSharedIngredientThunk";
import { createSharedIngredientSchema } from "@/schemas/sharedIngredientsSchema";

export function useCreateIngredient({ ingredientType }: UseCreateIngredientArgs) {
  const [formIsValid, setFormIsValid] = useState<boolean>(false)
  const [ingredientName, setIngredientName] = useState<string>('')
  const [createIngredientError, setCreateIngredientError] = useState<string>('')
  const [loadingCreateIngredient, setLoadingCreateIngredient] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setIngredientName(newValue)
    let parseResult
    if (ingredientType === 'personal') {
      parseResult = createUserIngredientSchema.safeParse({ name: newValue })
    } else {
      parseResult = createSharedIngredientSchema.safeParse({ name: newValue })
    }
    if (parseResult.error) {
      setFormIsValid(false)
      return
    }
    setFormIsValid(true)
  }

  async function createIngredient() {
    if (!formIsValid) return
    setLoadingCreateIngredient(true)
    let thunk
    if (ingredientType === 'personal') {
      thunk = createUserIngredientThunk
    } else if (ingredientType === 'shared') {
      thunk = createSharedIngredientThunk
    } else {
      throw new Error("Only 'shared' and 'personal' options allowed")
    }

    dispatch(thunk({ name: ingredientName })).then((payloadAction) => {
      setFormIsValid(false)
      setLoadingCreateIngredient(false)
      if (payloadAction.meta.requestStatus === "rejected") {
        //@ts-expect-error When api request fails throws an object with api error message
        setCreateIngredientError(payloadAction.error.message)
        setTimeout(() => {
          setCreateIngredientError('')
        }, 3000)
        return
      }
      setIngredientName('')
    })

  }
  return {
    onChange,
    formIsValid,
    ingredientName,
    createIngredient,
    createIngredientError,
    loadingCreateIngredient
  }
}


interface UseCreateIngredientArgs {
  ingredientType: 'personal' | 'shared'
}