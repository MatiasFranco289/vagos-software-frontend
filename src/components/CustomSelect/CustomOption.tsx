"use client";
import { ReactNode } from "react";

interface CustomOptionProps {
  children: ReactNode;
  value: string;
  default?: boolean;
}

// TODO: Agregar comprobacion de que children sea un string
export default function CustomOption({
  children,
  value,
  default: defaultValue = false,
}: CustomOptionProps) {
  return <p className="p-2">{children}</p>;
}
