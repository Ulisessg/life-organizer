import { useEffect, useState } from "react"
import { AppDispatch } from "@/redux/store";
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { useDispatch } from "react-redux";
import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk";
import { ListIngredientsProps } from "../ListIngredients";
import { getSharedIngredientsThunk } from "@/redux/thunks/getSharedIngredientsThunk";
import { deleteSharedIngredientThunk } from "@/redux/thunks/deleteSharedIngredientThunk";

const optionsAllowedError = new RangeError("Only 'personal' and 'shared' options allowed as props")

export function useListIngredients({ ingredientsList }: UseIngredientsListProps) {
  const dispatch: AppDispatch = useDispatch()

  const [editList, setEditList] = useState<boolean>(false)
  function toggleEditList() {
    setEditList((prev) => !prev)
  }

  function deleteIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    const ingredientId = e.currentTarget.name
    if (ingredientsList === "personal") {
      dispatch(deleteUserIngredientThunk({ ingredientId: Number(ingredientId) }))
    } else if (ingredientsList === 'shared') {
      dispatch(deleteSharedIngredientThunk({ id: Number(ingredientId) }))
    }
  }

  useEffect(() => {
    if (ingredientsList === "personal") {
      dispatch(getUserIngredientThunk())
    } else if (ingredientsList === 'shared') {
      dispatch(getSharedIngredientsThunk())
    } else {
      throw optionsAllowedError
    }
  }, [])
  return {
    editList,
    toggleEditList,
    deleteIngredient
  }
}

interface UseIngredientsListProps {
  ingredientsList: ListIngredientsProps['ingredientsList']
}