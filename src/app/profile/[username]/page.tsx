"use client";
import axiosInstance from "@/axios";
import GlowingButton from "@/components/GlowingButton/GlowingButton";
import { useRouter } from "next/navigation";
import { getEnvironmentVariable } from "@/utils";

export default function Profile() {
  const baseApiUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const router = useRouter();

  const handleLogout = () => {
    axiosInstance
      .post(`${baseApiUrl}/api/auth/logout`)
      .catch((err) => {
        console.error(`The following error has ocurred while trying to logout:
            ${err.response.data.message || err.message}`);
      })
      .finally(() => {
        localStorage.clear();
        router.push("/");
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-dark-300 w-4/6 p-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Perfil</h2>

        <div className="mt-2 w-2/6 flex justify-center">
          <GlowingButton text="Desconectarse" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}
