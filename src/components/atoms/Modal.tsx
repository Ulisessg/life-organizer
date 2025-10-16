import { DialogHTMLAttributes, FC, useEffect, useRef } from "react"
import './css/Modal.css'

export const Modal: FC<DialogHTMLAttributes<HTMLDialogElement> & { isOpen: boolean }> = ({ isOpen, ...props }) => {
  const modalRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal()
    } else {
      modalRef.current?.close()
    }
  }, [isOpen])
  return <dialog {...props} ref={modalRef}></dialog>
}

