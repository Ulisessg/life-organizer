"use client"
import { AppDispatch, RootState } from "@/redux/store"
import { Fragment, MouseEvent, useEffect, useId, useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import '@/components/molecules/css/ListLarder.css'
import { ButtonA } from "../atoms/ButtonA"
import { ButtonB } from "../atoms/ButtonB"
import { type deleteUserLarderIngredientThunk } from "@/redux/thunks/deleteUserLarderIngredientThunk"
import { type deleteIngredientSharedLarderThunk } from "@/redux/thunks/deleteIngredientSharedLarderThunk"
import { updateSharedLarderIngredientThunk } from "@/redux/thunks/updateSharedLarderIngredientThunk"
import { updateUserLarderIngredientThunk } from "@/redux/thunks/updateUserLarderIngredientThunk"
import { getDaysToExpire } from "@/utils/getDaysToExpire"

export function ListLarder({ ingredients, title, thunkDelete, thunkUpdate }: ListLarderProps) {
  const unitsOfMeasure = useSelector((state: RootState) => state.unitsOfMeasure)
  const [editLarder, setEditLarder] = useState<boolean>(false)
  const ingredientKey = useId()

  function toggleEdit() {
    setEditLarder(!editLarder)
  }

  return <section className="list_larder section_container">
    <h3>{title}</h3>
    <ButtonA className="list_larder-edit" onClick={toggleEdit} type="button">{!editLarder ? 'Editar' : 'Guardar cambios'}</ButtonA>
    <div className={`list_larder_sections ${editLarder && 'list_larder_sections-edit'} list_larder_sections-border`}>
      <div><p>Ingrediente</p></div>
      <div><p>Cantidad</p></div>
      <div><p>Fecha de expiración</p></div>
    </div>
    <div>
      {ingredients.length === 0 && <p className="no-ingredients-warning">Sin ingredientes en la alacena</p>}
      {ingredients.map((ingredientInLarder) => {
        return <Fragment key={`${ingredientKey}-${ingredientInLarder.id}`} >
          <Ingredient
            editLarder={editLarder}
            ingredient={ingredientInLarder}
            thunkDelete={thunkDelete}
            unitsOfMeasure={unitsOfMeasure}
            thunkUpdate={thunkUpdate}
          />
        </Fragment>
      })}
    </div>
  </section>
}

function Ingredient({ ingredient, thunkDelete, editLarder, unitsOfMeasure, thunkUpdate }: IngredientProps) {
  const dispatch: AppDispatch = useDispatch()
  const [ingredientQty, setIngredientQty] = useState<number>(ingredient.quantity)
  const initialIngredientQtyRef = useRef(ingredient.quantity)
  const [expirationDate, setExpirationDate] = useState<string>(ingredient.expiration_date ? new Date(ingredient.expiration_date).toISOString().split('T')[0] : '')
  const initialExpirationDateRef = useRef<string>(ingredient.expiration_date ? new Date(ingredient.expiration_date).toISOString().split('T')[0] : '')
  const [unitOfMeasure, setUnitOfMeasure] = useState<number>(ingredient.unit_of_measure_id)
  const initialUnitOfMeasureRef = useRef<number>(ingredient.unit_of_measure_id)

  function deleteIngredientFromLarder(e: MouseEvent<HTMLButtonElement>) {
    dispatch(thunkDelete({ id: Number(e.currentTarget.name) }))
  }

  const daysToExpire = useMemo(() => {
    if (ingredient.expiration_date) {
      return getDaysToExpire(ingredient.expiration_date)
    }
    return NaN
  }, [ingredient.expiration_date])


  useEffect(() => {
    if (!editLarder && (ingredientQty !== initialIngredientQtyRef.current || expirationDate !== initialExpirationDateRef.current || unitOfMeasure !== initialUnitOfMeasureRef.current)) {
      dispatch(thunkUpdate({
        id: ingredient.id,
        quantity: ingredientQty,
        unit_of_measure_id: unitOfMeasure,
        expiration_date: expirationDate || undefined
      })).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          initialIngredientQtyRef.current = ingredientQty
          initialExpirationDateRef.current = expirationDate
          initialUnitOfMeasureRef.current = unitOfMeasure
        }
      })
    }
  }, [editLarder, ingredientQty, expirationDate, unitOfMeasure, dispatch, thunkUpdate, ingredient.id])

  return <>
    <div className={`list_larder_sections ${editLarder ? 'list_larder_sections-edit' : 'list_larder_sections-border'}`}>
      <p>{ingredient.name}</p>
      {!editLarder && <p>{ingredient.quantity} {unitsOfMeasure.find(({ id }) => id === ingredient.unit_of_measure_id)?.name}</p>}
      {editLarder && <div className="list_larder_sections-edit_ingredient_qty">
        <input className="list_larder_sections-edit_ingredient_qty-input" type="number" value={ingredientQty} onChange={(e) => setIngredientQty(Number(e.currentTarget.value))} />
        <select className="list_larder_sections-edit_ingredient_qty-input" value={unitOfMeasure} onChange={(e) => setUnitOfMeasure(Number(e.currentTarget.value))}>
          {unitsOfMeasure.map((uom) => <option key={uom.name} value={uom.id}>{uom.name}</option>)}
        </select>
      </div>}
      {!editLarder && <p>{ingredient.expiration_date ? <ExpirationDate daysToExpire={daysToExpire} /> : 'N/A'}</p>}
      {editLarder && <div className="list_larder_sections-edit_ingredient_qty-input"><input onChange={(e) => setExpirationDate(e.currentTarget.value)} type="date" value={expirationDate} /></div>}
    </div>
    <div className={`list-larder-button-delete-container ${editLarder && 'list_larder_sections-border'}`}>
      {editLarder && <ButtonB
        className="list_larder_sections-delete"
        type="button"
        name={`${ingredient.id}`}
        onClick={deleteIngredientFromLarder}
      >Eliminar ingrediente</ButtonB>}</div>
  </>
}


function ExpirationDate({ daysToExpire }: ExpirationDateProps) {
  const text = useMemo(() => {
    if (daysToExpire === 0) {
      return 'Expira hoy'
    } else if (daysToExpire === 1) {
      return "Expira mañana"
    } else if (daysToExpire > 1) {
      return `Expira en ${daysToExpire} dias`
    } else if (daysToExpire === -1) {
      return 'Expiró ayer'
    } else {
      return `Expiró hace ${Math.abs(daysToExpire)} dias`
    }
  }, [daysToExpire])
  return <>
    {text}
  </>
}

interface ListLarderProps {
  thunkUpdate: typeof updateSharedLarderIngredientThunk | typeof updateUserLarderIngredientThunk
  thunkDelete: typeof deleteUserLarderIngredientThunk | typeof deleteIngredientSharedLarderThunk
  ingredients: RootState['userLarderIngredients'] | RootState['sharedLarderIngredients']
  title: string
}

interface IngredientProps {
  editLarder: boolean
  ingredient: RootState['userLarderIngredients'][0] | RootState['sharedLarderIngredients'][0]
  unitsOfMeasure: RootState['unitsOfMeasure']
  thunkDelete: ListLarderProps['thunkDelete']
  thunkUpdate: ListLarderProps['thunkUpdate']
}

interface ExpirationDateProps {
  daysToExpire: number
}