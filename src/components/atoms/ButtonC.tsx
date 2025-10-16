import { ButtonHTMLAttributes, FC } from "react"
import './css/Button.css'
import './css/ButtonC.css'

export const ButtonC: FC<ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }> = (props) => {
  return <button {...props} className={`buttonC ${props.className} ${props.active && 'buttonC-active'}`} />
}