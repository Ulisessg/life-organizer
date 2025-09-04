import { FC, ButtonHTMLAttributes } from "react";
import './css/ButtonA.css'
export const ButtonA: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={`buttonA ${props.className}`}
    />
  );
};
