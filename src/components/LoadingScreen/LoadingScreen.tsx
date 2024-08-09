export default function LoadingScreen() {
  return (
    <div className="bg-dark-100 z-50 fixed w-screen h-screen top-0 left-0 flex justify-center items-center overflow-hidden">
      <h1 className="text-4xl font-bold animate-pulse">Cargando ..</h1>
    </div>
  );
}
