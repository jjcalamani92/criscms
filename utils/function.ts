import { fsync } from "fs";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};
export const getQuery = (asPath: string) => {
  asPath.toString()
  return asPath.slice(1).split("/");
};
export const compose = (...fns: any[]) => {
  return (x: any) => {
    return fns.reduceRight((v,f) => {
      return f(v)
    }, x)
  }
}