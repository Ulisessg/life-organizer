import { useEffect, useState } from "react"
import { AppDispatch } from "@/redux/store";
import { getUserIngredientThunk } from "@/redux/thunks/getUserIngredientsThunk";
import { useDispatch } from "react-redux";
import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk";
import { ListIngredientsProps } from "../ListUserIngredients";
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
    }
  }
  useEffect(() => {
    if (ingredientsList === "personal") {

      dispatch(getUserIngredientThunk())
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