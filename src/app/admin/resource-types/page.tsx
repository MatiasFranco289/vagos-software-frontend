"use client";
import { ApiResourceType } from "@/apiInterfaces";
import axiosInstance from "@/axios";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  DEFAULT_API_ERROR_CLIENT_MESSAGE,
  DEFAULT_API_ERROR_MESSAGE,
  GET_ALL_RESOURCE_TYPES_API_URL,
  POST_RESOURCE_TYPE_API_URL,
  PUT_RESOURCE_TYPE_API_URL,
  ROLENAME_ADMIN,
  STATUS_CODE_CREATED,
  STATUS_CODE_OK,
} from "@/constants";
import {
  getEnvironmentVariable,
  manageRequestErrors,
  normalizeDate,
} from "@/utils";
import { useEffect, useState } from "react";
import { SlTrash } from "react-icons/sl";
import GlowingButton from "@/components/GlowingButton/GlowingButton";
import ResourceTypeForm from "@/components/ResourceTypeForm/ResourceTypeForm";
import { createResourceTypeSchema } from "@/validations/CreateResourceTypeValidation";
import { ApiResponse } from "@/interfaces";
import axios from "axios";
import DeleteResourceTypeModal from "@/components/DeleteResourceTypeModal/DeleteResourceTypeModal";

export default function ResourceTypesList() {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const getResourceTypesUrl = `${apiBaseUrl}${GET_ALL_RESOURCE_TYPES_API_URL}`;
  const postResourceTypesUrl = `${apiBaseUrl}${POST_RESOURCE_TYPE_API_URL}`;
  const puResourceTypesUrl = `${apiBaseUrl}${PUT_RESOURCE_TYPE_API_URL}`;
  const [resourceTypes, setResourceTypes] = useState<Array<ApiResourceType>>();
  const [newTypeModalOpen, setNewTypeModalOpen] = useState(false);

  const [editTypeModalOpen, setEditTypeModalOpen] = useState(false);
  const [deleteTypeModalOpen, setDeleteTypeModalOpen] = useState(false);
  const [actualTypeIndexToEdit, setActualTypeIndexToEdit] = useState(0);
  const [actualTypeIndexToDelete, setActualTypeIndexToDelete] = useState(0);

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

  const createResourceType = (newResourceTypeName: string) => {
    const errorsToShow = {
      "name must be unique": "El tipo de recurso ya existe.",
    };

    return new Promise<ApiResponse<ApiResourceType | null> | string>(
      async (resolve, reject) => {
        try {
          const response = await axiosInstance.post(postResourceTypesUrl, {
            name: newResourceTypeName,
          });

          if (response.status === STATUS_CODE_CREATED) {
            return resolve(response.data);
          }

          reject(response.data.data);
        } catch (err) {
          let errorMessage = DEFAULT_API_ERROR_CLIENT_MESSAGE;

          if (axios.isAxiosError(err) && err.response) {
            const response = err.response.data as ApiResponse<unknown>;
            const managedMessage = manageRequestErrors(response, errorsToShow);

            errorMessage = managedMessage || errorMessage;
          }

          console.error(
            "The following error has occurred while trying to create a new resource type: "
          );
          console.error(err);

          reject(errorMessage);
        }
      }
    );
  };

  const updateResourceType = (resourceTypeNewName: string) => {
    const resourceTypeToEdit = (resourceTypes as Array<ApiResourceType>)[
      actualTypeIndexToEdit
    ];
    const errorsToShow = {
      "name must be unique":
        "Ya existe otro tipo de recurso con el mismo nombre.",
    };

    return new Promise<ApiResponse<null> | string>(async (resolve, reject) => {
      try {
        const response = await axiosInstance.put(
          `${puResourceTypesUrl}/${resourceTypeToEdit.id}`,
          {
            name: resourceTypeNewName,
          }
        );

        if (response.status === STATUS_CODE_OK) {
          return resolve(response.data);
        }

        reject(response.data.data);
      } catch (err) {
        let errorMessage = DEFAULT_API_ERROR_CLIENT_MESSAGE;

        if (axios.isAxiosError(err) && err.response) {
          const response = err.response.data as ApiResponse<unknown>;
          const managedMessage = manageRequestErrors(response, errorsToShow);

          errorMessage = managedMessage || errorMessage;
        }

        console.error(
          "The following error has occurred while trying to update the resource type: "
        );
        console.error(err);

        reject(errorMessage);
      }
    });
  };

  const handleNewTypeClicked = () => {
    document.body.classList.add("no-scroll");
    setNewTypeModalOpen(true);
  };

  const handleResourceTypePressed = (index: number) => {
    setActualTypeIndexToEdit(index);
    setEditTypeModalOpen(true);
  };

  const handleDeleteTypePressed = (index: number) => {
    setActualTypeIndexToDelete(index);
    setDeleteTypeModalOpen(true);
  };

  return (
    <ProtectedRoute requiredRole={ROLENAME_ADMIN}>
      <div className="w-full min-h-screen flex justify-center">
        {(resourceTypes && (
          <div className="mt-8 sm:mt-32 mb-32 sm:mb-12 w-5/6">
            {newTypeModalOpen && (
              <ResourceTypeForm
                setModalOpen={setNewTypeModalOpen}
                validationSchema={createResourceTypeSchema}
                onFormSendPromise={createResourceType}
                formType="CREATE"
              />
            )}

            {editTypeModalOpen && (
              <ResourceTypeForm
                setModalOpen={setEditTypeModalOpen}
                validationSchema={createResourceTypeSchema}
                onFormSendPromise={updateResourceType}
                initialValues={{
                  name: resourceTypes[actualTypeIndexToEdit].name,
                }}
                formType="UPDATE"
              />
            )}

            {deleteTypeModalOpen && (
              <DeleteResourceTypeModal
                setModalOpen={setDeleteTypeModalOpen}
                resourceTypeToDelete={{
                  id: resourceTypes[actualTypeIndexToDelete].id,
                  name: resourceTypes[actualTypeIndexToDelete].name,
                }}
              />
            )}

            <div className="flex flex-col sm:flex-row justify-between mb-8">
              <h1 className="text-lg sm:text-2xl font-light whitespace-nowrap">
                {"Admin > Tipos de recurso"}
              </h1>

              <div className="w-1/6 min-w-[120px] mt-4 sm:mt-0">
                <GlowingButton
                  text="Nuevo tipo"
                  onClick={() => handleNewTypeClicked()}
                />
              </div>
            </div>

            <div className="overflow-scroll rounded-t-md rounded-md pointer">
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
                    <th></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/25">
                  {(resourceTypes.length &&
                    resourceTypes.map((resourceType, index) => {
                      return (
                        <tr
                          key={`resource_type_${index}`}
                          className="hover:bg-dark-400 duration-150 cursor-pointer relative"
                        >
                          <td
                            className="p-4"
                            onClick={() => handleResourceTypePressed(index)}
                          >
                            {resourceType.id}
                          </td>
                          <td onClick={() => handleResourceTypePressed(index)}>
                            {resourceType.name}
                          </td>
                          <td onClick={() => handleResourceTypePressed(index)}>
                            {normalizeDate(resourceType.created_at)}
                          </td>
                          <td onClick={() => handleResourceTypePressed(index)}>
                            {normalizeDate(resourceType.updated_at)}
                          </td>
                          <td
                            className="group pr-4"
                            onClick={() => handleDeleteTypePressed(index)}
                          >
                            <div className="flex justify-center">
                              <SlTrash className="text-3xl group-hover:text-orange-600" />
                            </div>
                          </td>
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
