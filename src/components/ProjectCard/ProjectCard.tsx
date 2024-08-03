import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  startDate: string;
  endDate: string;
  tags: Array<string>;
  imgUrl?: string;
  status: string;
  projectId: number;
}

export default function ProjectCard({
  title,
  startDate,
  endDate,
  tags,
  imgUrl:
    imgUrl = "https://lh3.googleusercontent.com/a/ACg8ocJc4xXvwYl6TRzZNaf8Vg5SNtzN0FrnJkq3uPUsHvbX_rKZ0L8=s288-c-no",
  status,
  projectId,
}: ProjectCardProps) {
  const TagCard = (tag: string, key: number) => {
    return (
      <div
        className="bg-dark-300 m-1 rounded-full p-2 text-sm"
        key={`project_tag_${key}`}
      >
        <p>{tag}</p>
      </div>
    );
  };
  return (
    <Link
      href={`/project/${projectId}`}
      className="bg-dark-100 w-full sm:w-[400px] my-6 sm:m-6 relative hover:scale-105 duration-200 cursor-pointer"
    >
      <div
        className="absolute w-full h-full rounded-md blur-sm bg-gradient-to-tr 
      from-red-500 to-white via-orange-500"
      />

      <div
        className="w-full flex flex-col sm:flex-row items-center p-4 z-10 
      relative bg-dark-100 rounded-md overflow-hidden"
      >
        {/* Project status */}
        <div className="absolute top-0 left-0 bg-green-600 p-1 rounded-r-md">
          <p>{status}</p>
        </div>

        {/* Left side */}
        <div className="w-full sm:w-[120px] mr-0 sm:mr-6 flex items-center justify-center">
          <div className="bg-dark-300 w-[120px] sm:w-full aspect-square rounded-full overflow-hidden flex justify-center items-center">
            {/* Project thumbnail goes here */}
            <Image
              src={imgUrl}
              alt="project-img"
              width={"115"}
              height={"115"}
            ></Image>
          </div>
        </div>

        {/* Right side */}
        <div className="w-full sm:w-4/6 space-y-6 flex flex-col items-center">
          {/* Titles */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <h4 className="text-sm font-thin">
              {startDate} - {endDate}
            </h4>
          </div>

          <div className="flex flex-wrap justify-center">
            {tags.map((tag, index) => {
              return TagCard(tag, index);
            })}
          </div>
        </div>
      </div>
    </Link>
  );
}
