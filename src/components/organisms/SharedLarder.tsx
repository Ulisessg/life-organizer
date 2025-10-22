import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ListLarder } from "@/components/molecules/ListLarder";
import { deleteIngredientSharedLarderThunk } from "@/redux/thunks/deleteIngredientSharedLarderThunk"
import { AddIngredientToSharedLarder } from "@/components/molecules/AddIngredientToSharedLarder";
import './css/SharedLarder.css'
import { Modal } from "../atoms/Modal";
import { useModal } from "../molecules/hooks/useModal";
import { ButtonB } from "../atoms/ButtonB";
import { ButtonA } from "../atoms/ButtonA";
import { updateSharedLarderIngredientThunk } from "@/redux/thunks/updateSharedLarderIngredientThunk";

export function SharedLarder() {
  const sharedLarderIngredients = useSelector((state: RootState) => state.sharedLarderIngredients)
  const { closeModal, isOpen, openModal } = useModal()
  return <div className="shared_larder-container">
    <ButtonA className="shared_larder-button_open_modal" onClick={openModal}>Añadir ingrediente a la alacena compartida</ButtonA>
    <ListLarder
      ingredients={sharedLarderIngredients}
      title="Alacena compartida"
      thunkDelete={deleteIngredientSharedLarderThunk}
      thunkUpdate={updateSharedLarderIngredientThunk}
    />
    <Modal isOpen={isOpen}>
      <ButtonB autoFocus onClick={closeModal} aria-label="Cerrar">X</ButtonB>
      <AddIngredientToSharedLarder />
    </Modal>
  </div>
}