import { useState } from "react"
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { ListIngredientsProps } from "../ListIngredients";

export function useListIngredients({ thunkDelete }: UseIngredientsListProps) {
  const dispatch: AppDispatch = useDispatch()

  const [editList, setEditList] = useState<boolean>(false)
  function toggleEditList() {
    setEditList((prev) => !prev)
  }

  function deleteIngredient(e: React.MouseEvent<HTMLButtonElement>) {
    const ingredientId = e.currentTarget.name
    dispatch(thunkDelete({ id: Number(ingredientId) }))
  }


  return {
    editList,
    toggleEditList,
    deleteIngredient
  }
}

interface UseIngredientsListProps {
  thunkDelete: ListIngredientsProps['thunkDelete']
}