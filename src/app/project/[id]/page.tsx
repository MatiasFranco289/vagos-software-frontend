"use client";
import { useParams } from "next/navigation";

export default function Project() {
  const params = useParams();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1>Project {params.id}</h1>
    </div>
  );
}
