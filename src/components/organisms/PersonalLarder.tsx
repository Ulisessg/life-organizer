import { useSelector } from "react-redux";
import { AddIngredientToPersonalLarder } from "../molecules/AddIngredientToPersonalLarder";
import { ListLarder } from "../molecules/ListLarder";
import { deleteUserLarderIngredientThunk } from "@/redux/thunks/deleteUserLarderIngredientThunk"
import { RootState } from "@/redux/store";
import './css/PersonalLarder.css'
import { Modal } from "../atoms/Modal";
import { useModal } from "../molecules/hooks/useModal";
import { ButtonB } from "../atoms/ButtonB";
import { ButtonA } from "../atoms/ButtonA";
import { updateUserLarderIngredientThunk } from "@/redux/thunks/updateUserLarderIngredientThunk";

export function PersonalLarder() {
  const userLarderIngredients = useSelector((state: RootState) => state.userLarderIngredients)
  const { closeModal, isOpen, openModal } = useModal()
  return <div className="personal_larder-container">
    <ListLarder
      ingredients={userLarderIngredients}
      title="Alacena personal"
      thunkDelete={deleteUserLarderIngredientThunk}
      thunkUpdate={updateUserLarderIngredientThunk}
    />
    <ButtonA className="personal_larder-button-modal" onClick={openModal}>Añadir ingrediente a la alacena</ButtonA>
    <Modal isOpen={isOpen}>
      <ButtonB autoFocus onClick={closeModal} aria-label="Cerrar">X</ButtonB>
      <AddIngredientToPersonalLarder />
    </Modal>
  </div>
}