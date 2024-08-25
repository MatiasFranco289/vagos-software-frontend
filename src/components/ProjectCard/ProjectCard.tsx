import { ApiProjectStatus, ApiProjectTag } from "@/apiInterfaces";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  startDate: string;
  endDate: string;
  tags: Array<ApiProjectTag>;
  imgUrl: string;
  status: string;
  projectId: number;
}

export default function ProjectCard({
  title,
  startDate,
  endDate,
  tags,
  imgUrl,
  status,
  projectId,
}: ProjectCardProps) {
  const TagCard = (tag: string, key: number) => {
    return (
      <div
        className="bg-dark-300 m-1 rounded-full p-2 text-sm self-start"
        key={`project_tag_${key}`}
      >
        <p>{tag}</p>
      </div>
    );
  };

  const StatusCard = () => {
    const PROJECT_STATUS_COLOR = {
      BORRADOR: "bg-slate-600",
      PENDIENTE: "bg-yellow-600",
      PAUSADO: "bg-orange-600",
      ACTIVO: "bg-blue-600",
      CANCELADO: "bg-red-600",
      FINALIZADO: "bg-green-600",
    };

    return (
      <div
        className={`absolute top-0 left-0 p-1 rounded-r-md ${
          PROJECT_STATUS_COLOR[status as keyof typeof PROJECT_STATUS_COLOR]
        }`}
      >
        <p>{status}</p>
      </div>
    );
  };

  return (
    <Link
      href={`/project/${projectId}`}
      className="bg-dark-100 w-full sm:w-[400px] my-6 sm:m-6 relative hover:scale-105 duration-200 cursor-pointer min-h-[200px]"
    >
      <div
        className="absolute w-full h-full rounded-md blur-sm bg-gradient-to-tr 
      from-red-500 to-white via-orange-500"
      />

      <div
        className="w-full flex flex-col sm:flex-row p-4 z-10 
      relative bg-dark-100 rounded-md overflow-hidden h-full"
      >
        {/* Project status */}
        {StatusCard()}

        {/* Left side */}
        <div className="w-full sm:w-[120px] mr-0 sm:mr-6 flex items-center justify-center">
          <div className="bg-dark-300 w-[120px] sm:w-full aspect-square rounded-full overflow-hidden flex justify-center items-center">
            {/* Project thumbnail goes here */}
            <Image
              src={imgUrl || ""}
              alt="project-img"
              width={"115"}
              height={"115"}
            />
          </div>
        </div>

        {/* Right side */}
        <div className="w-full sm:w-4/6 space-y-6 flex flex-col items-center justify-between">
          {/* Titles */}
          <div className="text-center">
            <h2 className="text-xl sm:text-3xl font-semibold">{title}</h2>
            <h4 className="text-sm font-thin">
              {startDate} - {endDate || "Sin definir"}
            </h4>
          </div>

          <div className="flex flex-wrap justify-center  min-h-[50%]">
            {tags.length !== 0 &&
              tags.map((tag, index) => {
                return TagCard(tag.name, index);
              })}
          </div>
        </div>
      </div>
    </Link>
  );
}
