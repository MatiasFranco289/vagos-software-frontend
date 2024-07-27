import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { FaSearch } from "react-icons/fa";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomOption from "@/components/CustomSelect/CustomOption";

export default function Projects() {
  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="bg-dark-300 w-5/6 mt-[100px] p-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Proyectos</h1>

          <div className="w-full flex justify-between mt-8">
            <div className="w-1/6 h-[35px] relative flex">
              <input type="text" className="w-full h-full rounded-sm" />
              <FaSearch
                className="absolute right-0 top-1/2 
                translate-x-[-50%] translate-y-[-50%] text-orange-500"
              />
            </div>

            <div className="w-2/6 flex justify-around">
              <CustomSelect multiple>
                <CustomOption value="filter" disabled default>
                  Filtrar
                </CustomOption>
                <CustomOption value="2d">2D</CustomOption>
                <CustomOption value="3d" default>
                  3D
                </CustomOption>
                <CustomOption value="metroidvania">Metroidvania</CustomOption>
              </CustomSelect>
            </div>

            <div className="w-2/6 flex justify-around">
              <CustomSelect>
                <CustomOption value="filter" default disabled>
                  Ordenar por
                </CustomOption>
                <CustomOption value="AZ">A-Z</CustomOption>
                <CustomOption value="ZA">Z-A</CustomOption>
                <CustomOption value="DATE_ASC">Mas reciente</CustomOption>
                <CustomOption value="DATE_DESC">Mas antiguo</CustomOption>
              </CustomSelect>
            </div>

            <select name="" id="" className="bg-dark-100">
              <option value="" defaultChecked disabled>
                Opcion 1
              </option>
              <option value="">Opcion 2</option>
              <option value="">Opcion 3</option>
              <option value="">Opcion 4</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-12">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  );
}
