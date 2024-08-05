"use client";
import { useParams } from "next/navigation";
import BlogCard from "@/components/BlogCard/BlogCard";
import Link from "next/link";
import Paginator from "@/components/Paginator/Paginator";

export default function Project() {
  return (
    <div className="w-full min-h-screen flex justify-center items-start">
      <div className="w-5/6 mt-[100px]">
        <h1 className="text-2xl font-light mb-6">
          {"Proyectos > Hyper triangle"}
        </h1>

        <div className="w-full bg-dark-300 rounded-md p-6">
          {/* Title */}
          <div className="w-full text-center">
            <h1 className="text-4xl font-bold">Hyper triangle</h1>
          </div>

          {/* Description */}
          <div className="flex sm:items-start items-center justify-around mt-12 flex-col-reverse sm:flex-row">
            {/* Left */}
            <div className="w-full sm:w-3/6 mt-6 flex flex-col justify-between">
              <div className="space-y-4">
                <p>
                  Esquiva obstáculos a ultimo momento para llegar a la meta.
                  Hyper triangle es un juego árcade de ritmo frenético en el que
                  debes esquivar obstáculos para superar 4 niveles, en cada
                  nivel los obstáculos formaran patrones nuevos y mas difíciles
                  de esquivar hasta llegar al limite de lo posible. Deberás
                  adaptar tu forma de moverte para alzarte con la victoria.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Ducimus placeat accusantium fugit reprehenderit ad illo aut
                  consectetur, inventore impedit adipisci sint, amet quia ab
                  magni cupiditate eveniet excepturi dolore eaque.
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-between mt-8">
                <div className="w-[150px] sm:w-[200px] aspect-square bg-dark-400 m-2"></div>
                <div className="w-[150px] sm:w-[200px] aspect-square bg-dark-400 m-2"></div>
                <div className="w-[150px] sm:w-[200px] aspect-square bg-dark-400 m-2"></div>
              </div>
            </div>

            {/* Right */}
            <div className="w-1/6 flex flex-col items-center ">
              {/* Image */}
              <div className="w-[200px] aspect-square bg-dark-400 rounded-full overflow-hidden"></div>

              {/* Info */}
              <div className="flex flex-col space-y-2 mt-6">
                <span className="font-medium">
                  Fecha de inicio:{" "}
                  <span className="font-light">21/07/2024</span>
                </span>

                <span className="font-medium">
                  Fecha de finalizacion:{" "}
                  <span className="font-light">21/07/2024</span>
                </span>

                <span className="font-medium">
                  Tags: <span className="font-light">2D, Runner, Arcade</span>
                </span>

                <span className="font-medium">
                  Estado: <span className="font-light">Terminado</span>
                </span>

                <span className="font-medium">
                  Repositorio:{" "}
                  <span className="font-light text-blue-400">
                    <Link href="/github">Github</Link>
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
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />
            <BlogCard
              title="Lorem ipsum"
              author="VagoDev1"
              date="04/08/2024"
              body="Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Minus nobis perferendis deleniti aperiam iusto nesciunt, natus 
              laudantium. Accusamus suscipit non iure ipsum asperiores temporibus
              ut vitae, sunt quibusdam, labore ex."
            />

            <p className="bg-dark-100 p-2 rounded-md animate-pulse text-orange-500">
              Cargando ...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
