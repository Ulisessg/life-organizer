import { FC, ButtonHTMLAttributes } from "react";
import './css/Button.css'
import './css/ButtonA.css'

export const ButtonA: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={`button buttonA ${props.className}`}
    />
  );
};
