import { TransformFnParams } from "class-transformer";

export function trimTransform({ value }: TransformFnParams) {
  return (value as string).trim();
}

export function lowercaseTransform({ value }: TransformFnParams) {
  return (value as string).toLowerCase();
}

export function emailTransform({ value }: TransformFnParams) {
  return value ? (value as string).toLowerCase().trim() : value;
}
