import { FC, AnchorHTMLAttributes } from "react";

export const LinkA: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return (
    <a
      {...props}
      className={`${props.className} grid content-center h-10 rounded-4xl w-30 text-center hover:underline hover:bg-sky-100`}
    ></a>
  );
};
