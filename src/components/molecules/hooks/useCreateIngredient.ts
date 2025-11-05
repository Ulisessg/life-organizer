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
  const [requestStatus, setRequestStatus] = useState<'none' | 'pending' | 'rejected' | 'fulfilled'>('none')
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
    setRequestStatus("pending")
    let thunk
    if (ingredientType === 'personal') {
      thunk = createUserIngredientThunk
    } else if (ingredientType === 'shared') {
      thunk = createSharedIngredientThunk
    } else {
      throw new Error("Only 'shared' and 'personal' options allowed")
    }

    dispatch(thunk({ name: ingredientName })).then((payloadAction) => {
      setRequestStatus('pending')
      setFormIsValid(false)
      if (payloadAction.meta.requestStatus === "fulfilled") {
        setRequestStatus('fulfilled')
        setIngredientName('')

      } else if (payloadAction.meta.requestStatus === "rejected") {
        setRequestStatus('rejected')

      }
      setTimeout(() => {
        setRequestStatus('none')
      }, 3000)
    })

  }
  return {
    onChange,
    formIsValid,
    ingredientName,
    createIngredient,
    requestStatus,
  }
}


interface UseCreateIngredientArgs {
  ingredientType: 'personal' | 'shared'
}