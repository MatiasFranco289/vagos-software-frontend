"use client";
import ProjectsForm from "@/components/ProjectsForm/ProjectsForm";
import { getEnvironmentVariable } from "@/utils";
import { useEffect, useState } from "react";
import {
  GET_PROJECT_STATES_API_URL,
  GET_PROJECT_TAGS_API_URL,
  STATUS_CODE_OK,
} from "@/constants";
import { ApiProjectState, ApiProjectTag } from "@/apiInterfaces";
import { apiRequestHandler } from "@/utils";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

export default function CreateProject() {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const [projectTags, setProjectTags] = useState<Array<ApiProjectTag>>();
  const [projectStates, setProjectStates] = useState<Array<ApiProjectState>>();

  useEffect(() => {
    getProjectTags();
    getProjectStates();
  }, []);

  // Attemps to get the projectTags from the api
  const getProjectTags = async () => {
    const getProjectTagsUrl = `${apiBaseUrl}${GET_PROJECT_TAGS_API_URL}`;
    const response = await apiRequestHandler(
      getProjectTagsUrl,
      "get",
      STATUS_CODE_OK
    );

    setProjectTags(response.data.data);
  };

  const getProjectStates = async () => {
    const getProjectStatesUrl = `${apiBaseUrl}${GET_PROJECT_STATES_API_URL}`;
    const response = await apiRequestHandler(
      getProjectStatesUrl,
      "get",
      STATUS_CODE_OK
    );

    setProjectStates(response.data.data);
  };

  // TODO: Agregar otros elementos a cargar ademas de projectTags
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
          />
        </div>
      )) || <LoadingScreen />}
    </div>
  );
}
