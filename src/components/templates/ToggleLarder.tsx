import { useState } from "react";
import { PersonalLarder } from "../organisms/PersonalLarder";
import { SharedLarder } from "../organisms/SharedLarder";
import './css/ToggleLarder.css'
import { ButtonC } from "../atoms/ButtonC";

export function ToggleLarder() {
  const [selectedLarder, setSelectedLarder] = useState<'personal' | 'shared'>('personal')

  return <div className="toggle_larder-container">
    <h2 className="toggle_larder-title">Alacena</h2>
    <div className="toggle_ingredients-selector">
      <ButtonC
        active={selectedLarder === 'personal'}
        onClick={() => setSelectedLarder('personal')}

      >Personales</ButtonC>
      <ButtonC
        active={selectedLarder === 'shared'}
        onClick={() => setSelectedLarder('shared')}
      >Compartidos</ButtonC>
    </div>
    {selectedLarder === 'personal' && <PersonalLarder />}
    {selectedLarder === 'shared' && <SharedLarder />}
  </div>
}