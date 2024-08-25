"use client";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { FaSearch } from "react-icons/fa";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomOption from "@/components/CustomSelect/CustomOption";
import { CustomOptionData } from "@/components/CustomSelect/interfaces";
import Paginator from "@/components/Paginator/Paginator";
import { useEffect, useState } from "react";
import { getEnvironmentVariable } from "@/utils";
import axiosInstance from "@/axios";
import {
  DEFAULT_API_ERROR_MESSAGE,
  GET_PROJECT_TAGS_API_URL,
  GET_PROJECTS,
  ROLENAME,
  ROLENAME_ADMIN,
} from "@/constants";
import { ApiProject, ApiProjectTag } from "@/apiInterfaces";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { MdOutlineClear } from "react-icons/md";
import { GiSadCrab } from "react-icons/gi";

interface ProjectsProps {
  params: {
    page: number;
  };
}

export default function Projects({ params }: ProjectsProps) {
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const [projects, setProjects] = useState<{
    projects: Array<ApiProject>;
    total: number;
  }>();

  const [tags, setTags] = useState<Array<ApiProjectTag>>([]);
  const actualPage = params.page;
  const maxProjectsPerPage = 20;
  const offset = (actualPage - 1) * maxProjectsPerPage;
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = Object.fromEntries(searchParams.entries());
  const selectedFilters = (queryParams.filters || "").split(",");

  useEffect(() => {
    getTags();
    getProjects();
  }, []);

  // When a query param changes it is necesary to get project according to new filters
  const refreshProjects = () => {
    const updatedSearchParams = new URLSearchParams(queryParams);
    router.push(
      `${window.location.pathname}?${updatedSearchParams.toString()}`
    );
    getProjects();
  };

  // When a new filter is selected i overwrite the param filter in url and redirect
  const onFilterSelected = (selectedOptionsValue: Array<CustomOptionData>) => {
    const newFilters = selectedOptionsValue
      .map((option) => {
        return option.text;
      })
      .join(",");

    if (newFilters === "") {
      delete queryParams["filters"];
    } else {
      queryParams["filters"] = newFilters;
    }

    refreshProjects();
  };

  const onOrderSelected = (selectedOptionsValue: Array<CustomOptionData>) => {
    if (!selectedOptionsValue.length) {
      return;
    }

    const selectedOption = selectedOptionsValue[0].value;

    const orderBy =
      selectedOption.split("_")[0] === "ALPH" ? "title" : "start_date";
    const orderType = selectedOption.split("_")[1];

    // When the selected order changes i overwrite the query params and redirect to a new url
    queryParams["order"] = orderType;
    queryParams["order_by"] = orderBy;
    refreshProjects();
  };

  const getProjects = async () => {
    // I need to build the url using the actual url querys
    const searchQuery = `?order=${queryParams.order}&order_by=${
      queryParams.order_by
    }&limit=${maxProjectsPerPage}&offset=${offset}${
      queryParams.filters ? "&tags=" + queryParams.filters : ""
    }${queryParams.search ? "&search=" + queryParams.search : ""}`;

    try {
      const projects = await axiosInstance.get(
        `${apiBaseUrl}${GET_PROJECTS}${searchQuery}`
      );
      setProjects(projects.data.data[0]);
    } catch (err) {
      console.error(`${DEFAULT_API_ERROR_MESSAGE} to get the projects.`);

      const role = localStorage.getItem(ROLENAME);
      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }
    }
  };

  const getTags = async () => {
    try {
      const tags = await axiosInstance.get(
        `${apiBaseUrl}${GET_PROJECT_TAGS_API_URL}`
      );
      setTags(tags.data.data);
    } catch (err) {
      console.error(`${DEFAULT_API_ERROR_MESSAGE} to get the project tags.`);

      const role = localStorage.getItem(ROLENAME);
      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }
    }
  };

  const TagsFilter = () => {
    const optionsToRender = tags.map((tag, index) => {
      return (
        <CustomOption
          value={tag.id.toString()}
          key={`tag_filter_${index}`}
          isDefaultSelected={selectedFilters.includes(tag.name)}
        >
          {tag.name}
        </CustomOption>
      );
    });

    optionsToRender.unshift(
      <CustomOption value="" isDisabled isDefault key={"tag_filter_default"}>
        Filtrar
      </CustomOption>
    );

    return (
      <CustomSelect
        multiple
        onOptionSelected={onFilterSelected}
        extraStyles="mt-6 md:mt-0"
      >
        {optionsToRender}
      </CustomSelect>
    );
  };

  const handleSearchFieldChange = (searchTerm: string) => {
    if (searchTerm.length >= 3) {
      queryParams["search"] = searchTerm;
      refreshProjects();
    } else {
      if (queryParams.search) {
        delete queryParams.search;
        refreshProjects();
      }
    }
  };

  const clearFilters = () => {
    delete queryParams["filters"];
    refreshProjects();
    getProjects();
  };

  return (
    (tags && projects && (
      <div className="w-full min-h-screen flex justify-center">
        <div className="w-5/6 mt-10 sm:mt-[100px] p-6 sm:mb-0 mb-20">
          {/* Title */}
          <div className="">
            <h1 className="text-4xl font-bold text-white mb-6">Proyectos</h1>
          </div>
          {/* Header */}
          <div className="bg-dark-300 rounded-md p-6">
            <div className="w-full flex justify-between flex-col md:flex-row md:items-start items-center">
              <div className="w-full md:w-[250px] h-[35px] relative flex">
                <input
                  type="text"
                  className="w-full h-full rounded-sm bg-dark-100 border-2
              border-gray-700 pl-1 pr-7 focus:outline-none focus:border-orange-700"
                  placeholder="Escribe al menos 3 letras"
                  onChange={(e) => handleSearchFieldChange(e.target.value)}
                />
                <FaSearch
                  className="absolute right-0 top-1/2 
              translate-x-[-50%] translate-y-[-50%] text-orange-500"
                />
              </div>

              <div className="w-[200px] flex justify-around min-w-fit space-x-2 flex-wrap">
                <CustomSelect
                  extraStyles="mt-6 md:mt-0 w-[140px]"
                  onOptionSelected={onOrderSelected}
                >
                  <CustomOption
                    value="ALPH_ASC"
                    isDefaultSelected={
                      queryParams.order === "ASC" &&
                      queryParams.order_by === "title"
                    }
                  >
                    A - Z
                  </CustomOption>
                  <CustomOption
                    value="ALPH_DESC"
                    isDefaultSelected={
                      queryParams.order === "DESC" &&
                      queryParams.order_by === "title"
                    }
                  >
                    Z - A
                  </CustomOption>
                  <CustomOption
                    value="DATE_ASC"
                    isDefaultSelected={
                      queryParams.order === "ASC" &&
                      queryParams.order_by === "start_date"
                    }
                  >
                    Mas reciente
                  </CustomOption>
                  <CustomOption
                    value="DATE_DESC"
                    isDefaultSelected={
                      queryParams.order === "DESC" &&
                      queryParams.order_by === "start_date"
                    }
                  >
                    Mas antiguo
                  </CustomOption>
                </CustomSelect>

                {TagsFilter()}
              </div>
            </div>

            {selectedFilters[0] && (
              <div className="w-full flex justify-center md:justify-start mt-6">
                {/* Filters container */}
                <div
                  className={`inline-flex flex-col bg-dark-100 rounded-md p-3`}
                >
                  <div className="flex flex-wrap justify-center">
                    {selectedFilters?.map((filter, index) => {
                      return (
                        <div
                          className="my-1 mx-2 relative"
                          key={`selected_tag_${index}`}
                        >
                          <div
                            className="absolute w-full h-full rounded-full bg-gradient-to-tr
                          from-red-500 to-white via-orange-500 blur-sm left-0 top-0 z-0"
                          />
                          <div className="relative z-10 bg-dark-300 rounded-full p-2 cursor-default">
                            {filter}
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex flex-col justify-end">
                      <div
                        className="bg-dark-300 rounded-full p-[2px] cursor-pointer"
                        onClick={clearFilters}
                      >
                        <MdOutlineClear className="text-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Body */}
          {(projects.total && (
            <div className=" mt-8 p-6 bg-dark-300 rounded-md grid xl:grid-cols-2 min-[1660px]:grid-cols-3 justify-center">
              {projects.projects.map((project, index) => {
                return (
                  <ProjectCard
                    title={project.title}
                    startDate={project.start_date.split("T")[0]}
                    endDate={(project.end_date || "").split("T")[0]}
                    tags={project.tags || []}
                    status={project.status?.name || ""}
                    projectId={project.id}
                    imgUrl={project.thumbnail_url}
                    key={`project_${index}`}
                  />
                );
              })}
            </div>
          )) || (
            <div className="flex justify-center mt-8 p-6 bg-dark-300 rounded-md flex-col min-h-screen items-center">
              <h2 className="text-3xl font-semibold">
                No se ha encontrado ningun proyecto.
              </h2>

              <div className="mt-2">
                <GiSadCrab className="text-9xl" />
              </div>
            </div>
          )}

          {projects.total >= maxProjectsPerPage && (
            <Paginator
              totalElements={projects.total}
              maxElementsPerPage={maxProjectsPerPage}
              maxButtonsToShow={4}
            />
          )}
        </div>
      </div>
    )) || (
      <div>
        <LoadingScreen />
      </div>
    )
  );
}
