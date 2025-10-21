import { deleteUserIngredientThunk } from "@/redux/thunks/deleteUserIngredientThunk"; import { CreateIngredient } from "../molecules/CreateIngredient";
import { ListIngredients } from "../molecules/ListIngredients";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import "./css/PersonalIngredients.css"
import { ButtonA } from "../atoms/ButtonA";
import { ButtonB } from "../atoms/ButtonB";
import { Modal } from "../atoms/Modal";
import { useModal } from "../molecules/hooks/useModal";

export function PersonalIngredients() {
  const userIngredients = useSelector((state: RootState) => state.userIngredients)
  const { closeModal, isOpen, openModal } = useModal()
  return <div className="personal_ingredients-container" data-organisms-personal-ingredients>
    <ListIngredients
      ingredients={userIngredients}
      thunkDelete={deleteUserIngredientThunk}
      title="Lista de ingredientes personales" />
    <ButtonA id="personal-ingredients-open-modal" className="personal_ingredients-button_open_modal" onClick={openModal}>Agregar ingrediente</ButtonA>
    <Modal isOpen={isOpen}>
      <ButtonB data-button-close-modal onClick={closeModal} autoFocus aria-label="Cerrar">x</ButtonB>
      <CreateIngredient ingredientType="personal" />
    </Modal>
  </div>
}