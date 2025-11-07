import { deleteSharedIngredientThunk } from "@/redux/thunks/deleteSharedIngredientThunk";
import { CreateIngredient } from "@/components/molecules/CreateIngredient";
import { ListIngredients } from "@/components/molecules/ListIngredients";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import './css/SharedIngredients.css'
import { useModal } from "../molecules/hooks/useModal";
import { Modal } from "../atoms/Modal";
import { ButtonB } from "../atoms/ButtonB";
import { ButtonA } from "../atoms/ButtonA";

export function SharedIngredients() {
  const sharedIngredients = useSelector((state: RootState) => state.sharedIngredients)
  const { closeModal, isOpen, openModal } = useModal()
  return <div className="shared_ingredients-container" data-organisms-shared-ingredients>
    <ButtonA data-open-shared-ingredients-modal className="shared_ingredients-button_open_modal" onClick={openModal}>Agregar ingrediente</ButtonA>
    <ListIngredients
      ingredients={sharedIngredients}
      thunkDelete={deleteSharedIngredientThunk}
      title="Lista de ingredientes compartidos"
    />
    <Modal isOpen={isOpen}>
      <ButtonB data-close-shared-ingredients-modal onClick={closeModal} aria-label="Cerrar" autoFocus>X</ButtonB>
      <CreateIngredient ingredientType="shared" />
    </Modal>
  </div>
}