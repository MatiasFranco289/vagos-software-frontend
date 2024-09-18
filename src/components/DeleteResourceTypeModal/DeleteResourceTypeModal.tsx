import { Dispatch, SetStateAction, useState } from "react";
import GlowingButton from "../GlowingButton/GlowingButton";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import axiosInstance from "@/axios";
import { getEnvironmentVariable, manageRequestErrors } from "@/utils";
import {
  DEFAULT_API_ERROR_CLIENT_MESSAGE,
  DELETE_RESOURCE_TYPE_API_URL,
  STATUS_CODE_OK,
} from "@/constants";
import axios from "axios";
import { ApiResponse } from "@/interfaces";
import Modal from "../Modal/Modal";

interface DeleteResourceTypeModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  resourceTypeToDelete: {
    id: number;
    name: string;
  };
}

export default function DeleteResourceTypeModal({
  setModalOpen,
  resourceTypeToDelete,
}: DeleteResourceTypeModalProps) {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const deleteResourceTypesUrl = `${apiBaseUrl}${DELETE_RESOURCE_TYPE_API_URL}`;

  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(
    DEFAULT_API_ERROR_CLIENT_MESSAGE
  );

  const RESOURCE_TYPE_SUCCESSFULLY_DELETED_MESSAGE =
    "El tipo de recurso ha sido eliminado exitosamente.";

  const handleResourceDeletion = async () => {
    const errorsToShow = {
      'update or delete on table "resource_types" violates foreign key constraint "resources_type_id_fkey" on table "resources"':
        "No se puede eliminar este tipo de recurso porque esta siendo utilizado por un recurso. Elimine el recurso e intente nuevamente.",
    };

    setIsLoading(true);

    try {
      const response = await axiosInstance.delete(
        `${deleteResourceTypesUrl}/${resourceTypeToDelete.id}`
      );

      if (response.status === STATUS_CODE_OK) {
        setModalMessage(RESOURCE_TYPE_SUCCESSFULLY_DELETED_MESSAGE);
        setSuccessModalOpen(true);
      } else {
        setErrorModalOpen(true);
      }
    } catch (err) {
      let errorMessage = DEFAULT_API_ERROR_CLIENT_MESSAGE;

      if (axios.isAxiosError(err) && err.response) {
        const response = err.response.data as ApiResponse<unknown>;
        const managedMessage = manageRequestErrors(response, errorsToShow);

        errorMessage = managedMessage || errorMessage;

        console.error(
          "The following error has occurred while trying to delete the resource type: "
        );
        console.error(err);

        setModalMessage(errorMessage);
        setErrorModalOpen(true);
      }
    }

    setIsLoading(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Modal
        title="Exito"
        icon="SUCCESS"
        message={modalMessage}
        buttonText="Entendido"
        isOpen={successModalOpen}
        setIsModalOpen={setSuccessModalOpen}
        onClose={() => {
          window.location.reload();
          setModalOpen(false);
        }}
      />
      <Modal
        title="Error"
        icon="DANGER"
        message={modalMessage}
        buttonText="Entendido"
        isOpen={errorModalOpen}
        setIsModalOpen={setErrorModalOpen}
        onClose={() => setModalOpen(false)}
      />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        !successModalOpen &&
        !errorModalOpen && (
          <div className="bg-white/10 fixed top-0 left-0 w-screen h-screen z-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-dark-100 w-3/12 p-6 rounded-md text-center space-y-6">
              <h2 className="text-2xl">Eliminar tipo de recurso</h2>
              <p className="text-left">{`Esta seguro que desea eliminar el tipo de recurso con el nombre "${resourceTypeToDelete.name}" ?`}</p>

              <div className="flex justify-around">
                <div className="w-2/6" onClick={() => handleResourceDeletion()}>
                  <GlowingButton text="Eliminar" />
                </div>

                <div className="w-2/6" onClick={() => closeModal()}>
                  <GlowingButton text="Cancelar" />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
