"use client";
import ProjectsForm from "@/components/ProjectsForm/ProjectsForm";
import { getEnvironmentVariable } from "@/utils";
import { useEffect, useState } from "react";
import {
  DEFAULT_API_ERROR_MESSAGE,
  GET_PROJECT_STATES_API_URL,
  GET_PROJECT_TAGS_API_URL,
  ROLENAME,
  ROLENAME_ADMIN,
} from "@/constants";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import {
  ApiProjectTag,
  ApiProjectStatus,
  ApiResourceType,
} from "@/apiInterfaces";
import { ApiResponse } from "@/interfaces";
import axiosInstance from "@/axios";

export default function CreateProject() {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const getProjectTagsUrl = `${apiBaseUrl}${GET_PROJECT_TAGS_API_URL}`;
  const getProjectStatesUrl = `${apiBaseUrl}${GET_PROJECT_STATES_API_URL}`;
  const [projectTags, setProjectTags] = useState<Array<ApiProjectTag>>();
  const [projectStates, setProjectStates] = useState<Array<ApiProjectStatus>>();
  const [resourceTypes, setResourceTypes] = useState<Array<ApiResourceType>>();

  useEffect(() => {
    getProjectTags();
    getProjectStates();
    getResourceTypes();
  }, []);

  // Attemps to get the projectTags from the api
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

  // TODO: Esto deberia llamar a la api de verdad
  const getResourceTypes = async () => {
    setResourceTypes([
      {
        id: 1,
        name: "IMAGE",
        created_at: "2024-08-13",
        updated_at: "2024-08-13",
      },
      {
        id: 2,
        name: "VIDEO",
        created_at: "2024-08-13",
        updated_at: "2024-08-13",
      },
    ]);
  };

  // TODO: Agregar otros elementos a cargar ademas de projectTags
  return (
    <div className="w-full min-h-screen mt-24 flex justify-center">
      {(projectTags && resourceTypes && projectStates && (
        <div className="flex flex-col w-5/6">
          <h1 className="text-2xl font-light mb-6">
            {"Admin > Crear proyecto"}
          </h1>
          <ProjectsForm
            projectTags={projectTags}
            projectStates={projectStates}
            resourceTypes={resourceTypes}
          />
        </div>
      )) || <LoadingScreen />}
    </div>
  );
}
