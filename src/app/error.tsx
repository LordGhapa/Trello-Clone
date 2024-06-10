"use client";
import Link from "next/link";

export default function Error() {
  return (
    <div>
      <h2>ALGO DEU ERRADO OU PAGINA NÃO EXISTE </h2>
      <Link href={"/"}>Inicio</Link>
    </div>
  );
}
