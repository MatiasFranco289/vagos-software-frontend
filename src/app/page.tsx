import VagosTitle from "@/components/VagosTitle/VagosTitle";
import "../components/VagosTitle/styles.css";

export default function Home() {
  return (
    <div className=" w-full flex flex-col justify-center items-center min-h-screen relative overflow-hidden bg-dark-100">
      <div className="hidden sm:flex flex-col items-end z-20 ">
        <VagosTitle />

        <h2
          id="vagos_subtitle"
          className="text-orange-500 text-2xl font-semibold mt-6"
        >{`Desarrollamos cosas (A veces)`}</h2>
      </div>

      <div className="sm:hidden z-20 flex flex-col items-end mx-4">
        <h1 className="text-5xl font-semibold">VAGOS SOFTWARE</h1>
        <h2 className="text-white text-xl font-semibold mt-4">{`Desarrollamos cosas (A veces)`}</h2>
      </div>

      <div className="absolute left-50% top-50%">
        <div
          className="bg-orange-500 h-[300px] sm:h-[500px] aspect-square left-0 top-0 rounded-full  absolute translate-x-[-50%] translate-y-[-50%] sm:block hidden"
          id="vagos_sun"
        />

        <div
          id="eclipse"
          className="bg-dark-100 h-[300px] sm:h-[500px] aspect-square left-0 top-0 rounded-full absolute hidden sm:block"
        />

        <div
          className="bg-orange-500 h-[300px] sm:h-[500px] aspect-square left-0 top-0 rounded-full  absolute translate-x-[-50%] translate-y-[-50%] block sm:hidden"
          id="vagos_sun_mobile"
        />

        <div className="bg-dark-100 h-[300px] sm:h-[500px] aspect-square left-0 top-0 rounded-full absolute sm:hidden block translate-x-[-35%] translate-y-[-35%]" />
      </div>
    </div>
  );
}
