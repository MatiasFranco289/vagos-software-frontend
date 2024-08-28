"use client";

import GlowingButton from "@/components/GlowingButton/GlowingButton";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();

  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold">Panel de administrador</h1>

        <div className="flex flex-col space-y-4 justify-center mt-4">
          <GlowingButton
            text="Crear proyecto"
            onClick={() => router.push("/admin/create-project")}
          />

          <GlowingButton
            text="Crear blog"
            onClick={() => router.push("/admin/create-blog")}
          />
        </div>
      </div>
    </div>
  );
}
