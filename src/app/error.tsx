"use client";
import Link from "next/link";

export default function Error() {
  return (
    <div className="inline-flex flex-col gap-4">
      <h2>ALGO DEU ERRADO OU PAGINA NÃO EXISTE </h2>
      <Link href={"/"} className="btn">
        Inicio
      </Link>
    </div>
  );
}
