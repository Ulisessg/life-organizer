import { Activity, useEffect, useState } from "react";
import { PersonalLarder } from "../organisms/PersonalLarder";
import { SharedLarder } from "../organisms/SharedLarder";
import './css/ToggleLarder.css'
import { ButtonC } from "../atoms/ButtonC";
import { getUnitsOfMeasureThunk } from "@/redux/thunks/getUnitsOfMeasureThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getUserLarderIngredientsThunk } from "@/redux/thunks/getUserLarderIngredientsThunk"
import { getIngredientsSharedLarderThunk } from "@/redux/thunks/getIngredientsSharedLarderThunk"


export function ToggleLarder() {
  const [selectedLarder, setSelectedLarder] = useState<'personal' | 'shared'>('personal')
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getUnitsOfMeasureThunk())
    dispatch(getUserLarderIngredientsThunk())
    dispatch(getIngredientsSharedLarderThunk())
  }, [dispatch])

  return <div className="toggle_larder-container">
    <h2 className="toggle_larder-title">Alacena</h2>
    <div className="toggle_ingredients-selector">
      <ButtonC
        active={selectedLarder === 'personal'}
        onClick={() => setSelectedLarder('personal')}

      >Personal</ButtonC>
      <ButtonC
        active={selectedLarder === 'shared'}
        onClick={() => setSelectedLarder('shared')}
      >Compartida</ButtonC>
    </div>
    <Activity mode={selectedLarder === 'personal' ? 'visible' : 'hidden'}>
      <PersonalLarder />
    </Activity>
    <Activity mode={selectedLarder === 'shared' ? 'visible' : 'hidden'}>
      <SharedLarder />
    </Activity>
  </div>
}