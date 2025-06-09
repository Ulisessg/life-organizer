import { FC, ButtonHTMLAttributes } from "react";

export const ButtonA: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={`h-10 w-40 bg-sky-900 hover:bg-sky-500 text-white rounded-md cursor-pointer ${props.className}`}
    />
  );
};
