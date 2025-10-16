import { ButtonHTMLAttributes, FC } from "react"
import './css/Button.css'
import './css/ButtonC.css'

export const ButtonC: FC<ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }> = (props) => {
  const { active, ...restProps } = props
  return <button {...restProps} className={`buttonC ${props.className} ${active ? 'buttonC-active' : ''}`} />
}