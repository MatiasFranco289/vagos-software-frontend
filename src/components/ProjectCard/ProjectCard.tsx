export default function ProjectCard() {
  const TagCard = (tag: string) => {
    return (
      <div className="bg-dark-300 m-1 rounded-full p-2 text-sm">
        <p>{tag}</p>
      </div>
    );
  };
  return (
    <div className="bg-dark-100 w-full sm:w-[400px] my-6 sm:m-6 relative">
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
          <p>Activo</p>
        </div>

        {/* Left side */}
        <div className="w-full sm:w-[120px] mr-0 sm:mr-6 flex items-center justify-center">
          <div className="bg-dark-300 w-[120px] sm:w-full aspect-square rounded-full overflow-hidden">
            {/* Project thumbnail goes here */}
          </div>
        </div>

        {/* Right side */}
        <div className="w-full sm:w-4/6 space-y-6 flex flex-col items-center">
          {/* Titles */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold">Project title</h2>
            <h4 className="text-sm font-thin">21/07/2024 - 21/07/2024</h4>
          </div>

          <div className="flex flex-wrap justify-center">
            {TagCard("2D")}
            {TagCard("Metroidvania")}
            {TagCard("Roguelike")}
            {TagCard("Action")}
          </div>
        </div>
      </div>
    </div>
  );
}
