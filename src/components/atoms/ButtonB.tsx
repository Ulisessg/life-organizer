import { FC, ButtonHTMLAttributes } from "react";
import './css/ButtonB.css'
import './css/Button.css'

export const ButtonB: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={`button buttonA buttonB ${props.className}`}
    />
  );
};
