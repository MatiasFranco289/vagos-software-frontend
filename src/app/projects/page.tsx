"use client";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { FaSearch } from "react-icons/fa";
import CustomSelect from "@/components/CustomSelect/CustomSelect";
import CustomOption from "@/components/CustomSelect/CustomOption";
import { CustomOptionData } from "@/components/CustomSelect/interfaces";
import Paginator from "@/components/Paginator/Paginator";
import { useState } from "react";

export default function Projects() {
  const [selectedFilters, setSelectedFilters] =
    useState<Array<CustomOptionData>>();

  const onFilterSelected = (selectedOptionsValue: Array<CustomOptionData>) => {
    setSelectedFilters(selectedOptionsValue);
  };

  return (
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
                className="w-full h-full rounded-sm bg-dark-100 border-2 border-gray-700"
              />
              <FaSearch
                className="absolute right-0 top-1/2 
                translate-x-[-50%] translate-y-[-50%] text-orange-500"
              />
            </div>

            <div className="w-[200px] flex justify-around min-w-fit space-x-2 flex-wrap">
              <CustomSelect extraStyles="mt-6 md:mt-0 w-[140px]">
                <CustomOption value="" isDisabled isDefault>
                  Ordenar por
                </CustomOption>
                <CustomOption value="AZ">A - Z</CustomOption>
                <CustomOption value="ZA">Z - A</CustomOption>
                <CustomOption value="DATE_ASC">Mas reciente</CustomOption>
                <CustomOption value="DATE_DESC">Mas antiguo</CustomOption>
              </CustomSelect>

              <CustomSelect
                multiple
                onOptionSelected={onFilterSelected}
                extraStyles="mt-6 md:mt-0"
              >
                <CustomOption value="" isDisabled isDefault>
                  Filtrar
                </CustomOption>
                <CustomOption value="2D">2D</CustomOption>
                <CustomOption value="3D">3D</CustomOption>
                <CustomOption value="METROIDVANIA">Metroidvania</CustomOption>
                <CustomOption value="ROGUELIKE">Roguelike</CustomOption>
              </CustomSelect>
            </div>
          </div>

          <div className="w-full flex justify-center md:justify-start mt-6">
            {/* Filters container */}
            <div
              className={`inline-flex flex-col bg-dark-100 rounded-md p-3 ${
                (!selectedFilters?.length && "opacity-0") || "opacity-100"
              }`}
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
                   from-red-500 to-white via-orange-500 blur-sm left-0 top-0 z-0
                   "
                      />
                      <div className="relative z-10 bg-dark-300 rounded-full p-2 cursor-default">
                        {filter.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-wrap justify-between mt-8 p-6 bg-dark-300 rounded-md flex-col items-center xl:flex-row">
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

        <Paginator
          totalElements={120}
          maxElementsPerPage={10}
          maxButtonsToShow={4}
        />
      </div>
    </div>
  );
}
