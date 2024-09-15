"use client";
import { ApiResourceType } from "@/apiInterfaces";
import axiosInstance from "@/axios";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  DEFAULT_API_ERROR_MESSAGE,
  GET_ALL_RESOURCE_TYPES_API_URL,
  ROLENAME_ADMIN,
} from "@/constants";
import { getEnvironmentVariable, normalizeDate } from "@/utils";
import { useEffect, useState } from "react";
import GlowingButton from "@/components/GlowingButton/GlowingButton";
import { useRouter } from "next/navigation";

export default function ResourceTypesList() {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const getResourceTypesUrl = `${apiBaseUrl}${GET_ALL_RESOURCE_TYPES_API_URL}`;
  const [resourceTypes, setResourceTypes] = useState<Array<ApiResourceType>>();
  const router = useRouter();

  useEffect(() => {
    getAllResourceTypes();
  }, []);

  const getAllResourceTypes = async () => {
    try {
      const response = await axiosInstance.get(getResourceTypesUrl);
      setResourceTypes(response.data.data);
    } catch (err) {
      console.error(`${DEFAULT_API_ERROR_MESSAGE} to get the project states.`);
      console.error(err);
    }
  };

  return (
    <ProtectedRoute requiredRole={ROLENAME_ADMIN}>
      <div className=" w-full min-h-screen flex justify-center">
        {(resourceTypes && (
          <div className="mt-8 sm:mt-32 w-5/6">
            <div className="flex flex-col sm:flex-row justify-between mb-8">
              <h1 className="text-lg sm:text-2xl font-light whitespace-nowrap">
                {"Admin > Tipos de recurso"}
              </h1>

              <div className="w-1/6 min-w-[120px] mt-4 sm:mt-0">
                <GlowingButton
                  text="Nuevo tipo"
                  onClick={() => router.push("resource-types/create")}
                />
              </div>
            </div>

            <div className="overflow-scroll rounded-t-md rounded-md">
              <h2 className="bg-dark-300 p-3 w-full min-w-[600px]">
                Todos los tipos de recursos
                <span className="text-white/50">{` ${resourceTypes.length}`}</span>
              </h2>

              <table className="bg-dark-300 w-full table-auto text-center overflow-hidden min-w-[600px]">
                <thead className="bg-dark-200 border-t-[1px] border-b-[1px] border-white/25">
                  <tr className="text-sm text-gray-300">
                    <th className="p-2">Id</th>
                    <th>Nombre</th>
                    <th>Fecha de creacion</th>
                    <th>Fecha de actualizacion</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/25">
                  {(resourceTypes.length &&
                    resourceTypes.map((resourceType, index) => {
                      return (
                        <tr
                          key={`resource_type_${index}`}
                          className="hover:bg-dark-400 duration-150 cursor-pointer"
                          onClick={() =>
                            router.push(
                              `resource-types/edit/${resourceType.id}`
                            )
                          }
                        >
                          <td className="p-4">{resourceType.id}</td>
                          <td>{resourceType.name}</td>
                          <td>{normalizeDate(resourceType.created_at)}</td>
                          <td>{normalizeDate(resourceType.updated_at)}</td>
                        </tr>
                      );
                    })) || (
                    <tr className="relative">
                      <td className="w-full absolute mt-2 text-white/50">
                        No se encontraron datos.
                      </td>
                      <td className="opacity-0 p-2">filler</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )) || <LoadingScreen />}
      </div>
    </ProtectedRoute>
  );
}
