"use client";
import { useParams } from "next/navigation";
import BlogCard from "@/components/BlogCard/BlogCard";
import Link from "next/link";
import Paginator from "@/components/Paginator/Paginator";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios";
import { getEnvironmentVariable, normalizeDate } from "@/utils";
import {
  DEFAULT_API_ERROR_MESSAGE,
  GET_PROJECT_DETAILS,
  ROLENAME,
  ROLENAME_ADMIN,
} from "@/constants";
import { ApiProject } from "@/apiInterfaces";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import Image from "next/image";
interface ProjectProps {
  params: {
    id: number;
  };
}

export default function Project({ params }: ProjectProps) {
  const projectId = params.id;
  const apiBaseUrl = getEnvironmentVariable("NEXT_PUBLIC_BACKEND_BASE_URL");
  const [projectInfo, setProjectInfo] = useState<Required<ApiProject>>();

  useEffect(() => {
    getProjectDetails();
  }, []);

  const getProjectDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `${apiBaseUrl}${GET_PROJECT_DETAILS}${projectId}`
      );

      setProjectInfo(response.data.data[0]);
    } catch (err) {
      console.error(
        `Something went wrong while trying to recover the info of the project with id ${projectId}.`
      );

      const role = localStorage.getItem(ROLENAME);

      if (role === ROLENAME_ADMIN) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      {(projectInfo && (
        <div className="w-full min-h-screen flex justify-center items-start">
          <div className="w-5/6 mt-[100px]">
            <h1 className="text-2xl font-light mb-6">
              {"Proyectos > Hyper triangle"}
            </h1>

            <div className="w-full bg-dark-300 rounded-md p-6">
              {/* Title */}
              <div className="w-full text-center">
                <h1 className="text-4xl font-bold">{projectInfo.title}</h1>
              </div>

              {/* Description */}
              <div className="flex sm:items-start items-center justify-around mt-12 flex-col-reverse sm:flex-row">
                {/* Left */}
                <div className="w-full sm:w-3/6 mt-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p>{projectInfo.description}</p>
                  </div>

                  {/*   <div className="flex flex-wrap justify-center sm:justify-between mt-8">
                      <div className="w-[150px] sm:w-[200px] aspect-square bg-dark-400 m-2"></div>
                      <div className="w-[150px] sm:w-[200px] aspect-square bg-dark-400 m-2"></div>
                      <div className="w-[150px] sm:w-[200px] aspect-square bg-dark-400 m-2"></div>
                    </div> */}
                </div>

                {/* Right */}
                <div className="w-1/6 flex flex-col items-center ">
                  {/* Image */}
                  <div className="w-[200px] aspect-square bg-dark-400 rounded-full overflow-hidden flex justify-center items-center relative">
                    <Image
                      src={projectInfo.thumbnail_url}
                      fill
                      style={{ objectFit: "cover" }}
                      alt="thumbnail.png"
                      sizes="100"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col space-y-2 mt-6">
                    <span className="font-medium">
                      Fecha de inicio:{" "}
                      <span className="font-light">
                        {normalizeDate(projectInfo.start_date)}
                      </span>
                    </span>

                    <span className="font-medium whitespace-nowrap">
                      Fecha de finalizacion:{" "}
                      <span className="font-light">
                        {normalizeDate(projectInfo.end_date || "") ||
                          "Sin definir"}
                      </span>
                    </span>

                    <span className="font-medium">
                      Tags:{" "}
                      <span className="font-light">
                        {projectInfo.tags.map((tag, index) => {
                          let tagName = tag.name;

                          if (index !== projectInfo.tags.length - 1) {
                            tagName += "-";
                          }

                          return <span key={`tag_${index}`}>{tagName}</span>;
                        })}
                      </span>
                    </span>

                    <span className="font-medium">
                      Estado:{" "}
                      <span className="font-light">
                        {projectInfo.status.name}
                      </span>
                    </span>

                    <span className="font-medium">
                      Repositorio:{" "}
                      <span className="font-light text-blue-400">
                        <a href={projectInfo.repository_url} target="_blank">
                          Repositorio
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Blogs sections */}
            <div className="w-full text-center mt-12 bg-dark-300 p-6">
              <div>
                <h2 className="text-3xl font-bold">Diario de desarrollo</h2>
              </div>

              <div className="mt-6 flex flex-col items-center max-h-screen overflow-y-scroll">
                {(projectInfo.blogs.length &&
                  projectInfo.blogs.map((blog, index) => {
                    return (
                      <BlogCard
                        key={`blog_card_${index}`}
                        title={blog.title}
                        author={blog.user?.username || "Sin definir"}
                        date={normalizeDate(blog.created_at)}
                        body={blog.description}
                      />
                    );
                  })) || (
                  <div className="my-5">
                    <h2 className="text-white/30">
                      Todavia no hay ningun blog relacionado a este proyecto.
                    </h2>
                  </div>
                )}

                {/* <p className="bg-dark-100 p-2 rounded-md animate-pulse text-orange-500">
                Cargando ...
              </p> */}
              </div>
            </div>
          </div>
        </div>
      )) || <LoadingScreen />}
    </div>
  );
}
