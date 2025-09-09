import { createUserIngredientSchema } from "@/schemas/userIngredientSchema";
import { ChangeEvent, useState } from "react";
import { AppDispatch } from "@/redux/store";
import { createUserIngredientThunk } from "@/redux/thunks/createUserIngredientThunk";
import { useDispatch } from "react-redux";

export function useCreateUserIngredient() {
  const [formIsValid, setFormIsValid] = useState<boolean>(false)
  const [userIngredientName, setUserIngredientName] = useState<string>('')
  const [createIngredientError, setCreateIngredientError] = useState<string>('')
  const [loadingCreateIngredient, setLoadingCreateIngredient] = useState<boolean>(false)
  const dispatch: AppDispatch = useDispatch()
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value
    setUserIngredientName(newValue)
    const parseResult = createUserIngredientSchema.safeParse({ name: newValue })
    if (parseResult.error) {
      setFormIsValid(false)
      return
    }
    setFormIsValid(true)
  }

  async function createUserIngredient() {
    if (!formIsValid) return
    setLoadingCreateIngredient(true)
    dispatch(createUserIngredientThunk({ name: userIngredientName })).then((payloadAction) => {
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
      setUserIngredientName('')
    })

  }
  return {
    onChange,
    formIsValid,
    userIngredientName,
    createUserIngredient,
    createIngredientError,
    loadingCreateIngredient
  }
}