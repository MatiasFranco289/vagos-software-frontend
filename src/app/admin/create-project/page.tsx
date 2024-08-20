"use client";
import ProjectsForm from "@/components/ProjectsForm/ProjectsForm";
import { getEnvironmentVariable, manageRequestErrors } from "@/utils";
import { useEffect, useState } from "react";
import {
  DEFAULT_API_ERROR_CLIENT_MESSAGE,
  DEFAULT_API_ERROR_MESSAGE,
  GET_PROJECT_STATES_API_URL,
  GET_PROJECT_TAGS_API_URL,
  POST_PROJECT_API_URL,
  ROLENAME,
  ROLENAME_ADMIN,
} from "@/constants";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { ApiProjectTag, ApiProjectStatus, ApiProject } from "@/apiInterfaces";
import { ApiResponse } from "@/interfaces";
import axiosInstance from "@/axios";
import { createProjectSchema } from "@/validations/CreateProjectValidations";
import axios from "axios";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function CreateProject() {
  const router = useRouter();
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const getProjectTagsUrl = `${apiBaseUrl}${GET_PROJECT_TAGS_API_URL}`;
  const getProjectStatesUrl = `${apiBaseUrl}${GET_PROJECT_STATES_API_URL}`;
  const createProjectUrl = `${apiBaseUrl}${POST_PROJECT_API_URL}`;

  const [projectTags, setProjectTags] = useState<Array<ApiProjectTag>>();
  const [projectStates, setProjectStates] = useState<Array<ApiProjectStatus>>();
  const [modalMessage, setModalMessage] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const CREATION_SUCCESS_MESSAGE = "El proyecto ha sido creado exitosamente.";

  useEffect(() => {
    getProjectTags();
    getProjectStates();
  }, []);

  // Attemps to get projectTags from api
  const getProjectTags = async () => {
    try {
      const response = (await axiosInstance.get(getProjectTagsUrl))
        .data as ApiResponse<ApiProjectTag>;
      setProjectTags(response.data);
    } catch (err) {
      console.error(`${DEFAULT_API_ERROR_MESSAGE} to get the project tags.`);

      const role = localStorage.getItem(ROLENAME);
      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }
    }
  };

  // Attemps to get projectStates from api
  const getProjectStates = async () => {
    try {
      const response = (await axiosInstance.get(getProjectStatesUrl))
        .data as ApiResponse<ApiProjectStatus>;
      setProjectStates(response.data);
    } catch (err) {
      console.error(`${DEFAULT_API_ERROR_MESSAGE} to get the project states.`);

      const role = localStorage.getItem(ROLENAME);
      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }
    }
  };

  const onFormSubmit = async (formValues: Omit<ApiProject, "id">) => {
    const errorsToShow = {
      "title must be unique": "Ya existe otro proyecto con el mismo titulo.",
    };

    try {
      const response = await axiosInstance.post(createProjectUrl, formValues);
      setModalMessage(CREATION_SUCCESS_MESSAGE);
      setSuccessModalOpen(true);
    } catch (err) {
      const userRole = localStorage.getItem(ROLENAME);
      let errorMessage = DEFAULT_API_ERROR_CLIENT_MESSAGE;

      if (axios.isAxiosError(err) && err.response) {
        const response = err.response.data as ApiResponse<unknown>;
        const managedMessage = manageRequestErrors(response, errorsToShow);

        errorMessage = managedMessage || errorMessage;
      }

      if (userRole === ROLENAME_ADMIN) {
        console.log(
          "The following error has ocurred while trying to create the project: "
        );
        console.error(err);
      }

      setModalMessage(errorMessage);
      setErrorModalOpen(true);
    }
  };

  return (
    <div className="w-full min-h-screen mt-24 flex justify-center">
      {(projectTags && projectStates && (
        <div className="flex flex-col w-5/6">
          <h1 className="text-2xl font-light mb-6">
            {"Admin > Crear proyecto"}
          </h1>
          <ProjectsForm
            projectTags={projectTags}
            projectStates={projectStates}
            validationSchema={createProjectSchema}
            onSubmit={onFormSubmit}
            onCancel={() => router.push("/admin")}
          />

          <Modal
            title="Exito"
            icon="SUCCESS"
            message={modalMessage}
            buttonText="Entendido"
            isOpen={successModalOpen}
            setIsModalOpen={setSuccessModalOpen}
            onClose={() => router.push("/admin")}
          />

          <Modal
            title="Error"
            icon="DANGER"
            message={modalMessage}
            buttonText="Entendido"
            isOpen={errorModalOpen}
            setIsModalOpen={setErrorModalOpen}
          />
        </div>
      )) || <LoadingScreen />}
    </div>
  );
}
