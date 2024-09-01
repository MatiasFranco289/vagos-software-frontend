"use client";
import { ApiProject } from "@/apiInterfaces";
import axiosInstance from "@/axios";
import CreateEditBlogsForm from "@/components/CreateEditBlogsForm/CreateEditBlogsForm";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import ProtectedRoute from "@/components/ProtectedRoute";
import {
  DEFAULT_API_ERROR_CLIENT_MESSAGE,
  GET_PROJECTS,
  ID,
  POST_BLOG_API_URL,
  ROLENAME,
  ROLENAME_ADMIN,
} from "@/constants";
import { BlogInfo } from "@/interfaces";
import { getEnvironmentVariable } from "@/utils";
import { createBlogSchema } from "@/validations/CreateBlogValidation";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";

export default function CreateBlog() {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const router = useRouter();
  const [projects, setProjects] = useState<{
    projects: Array<ApiProject>;
    total: number;
  }>();
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const SUCCESS_BLOG_CREATION_MESSAGE = "El blog ha sido creado exitosamente.";
  const UNEXPECTED_ERROR_MESSAGE =
    "Ha ocurrido un error inesperado al intentar crear el blog. Por favor intente nuevamente mas tarde.";

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      const response = await axiosInstance.get(`${apiBaseUrl}${GET_PROJECTS}`);
      setProjects(response.data.data[0]);
    } catch (err) {
      console.error(`${DEFAULT_API_ERROR_CLIENT_MESSAGE} to get the projects.`);

      const role = localStorage.getItem(ROLENAME);

      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }
    }
  };

  const onFormSend = async (formValues: BlogInfo) => {
    const bodyRequest = {
      title: formValues.title,
      description: formValues.body,
      project_id: parseInt(formValues.relatedProjectId),
      user_id: localStorage.getItem(ID),
    };

    try {
      await axiosInstance.post(
        `${apiBaseUrl}${POST_BLOG_API_URL}`,
        bodyRequest
      );

      setModalMessage(SUCCESS_BLOG_CREATION_MESSAGE);
      setSuccessModalOpen(true);
    } catch (err) {
      const role = localStorage.getItem(ROLENAME);
      console.error(
        "An unexpected error has ocurred while trying to create the blog."
      );

      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }

      setModalMessage(UNEXPECTED_ERROR_MESSAGE);
      setErrorModalOpen(true);
    }
  };

  return (
    <ProtectedRoute requiredRole={ROLENAME_ADMIN}>
      {(projects && (
        <div className="w-full min-h-screen mt-24 flex justify-center">
          <div className="flex flex-col w-4/6">
            <h1 className="text-2xl font-light mb-6">{"Admin > Crear blog"}</h1>
            <CreateEditBlogsForm
              onFormSend={onFormSend}
              sendBtnText="Crear"
              projects={projects.projects}
              validationSchema={createBlogSchema}
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
        </div>
      )) || <LoadingScreen />}
    </ProtectedRoute>
  );
}
