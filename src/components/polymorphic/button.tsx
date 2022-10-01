import { ComponentPropsWithRef, ElementType } from "react";

type ButtonProps<C extends ElementType> = {
  as?: C
  children: React.ReactNode;
} & ComponentPropsWithRef<C>;

export const Button = <C extends ElementType >({
  as,
  children,
  ...restProps
}: ButtonProps<C>) => {
  const Component = as || "button";
  return <Component {...restProps}>{children}</Component>
}