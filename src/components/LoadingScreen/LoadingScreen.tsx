import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingScreen() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-white/10 backdrop-blur-sm z-50">
      <AiOutlineLoading className="text-5xl animate-spin" />
    </div>
  );
}
