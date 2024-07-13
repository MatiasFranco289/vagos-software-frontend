import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import GlowingButton from "./GlowingButton";
import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  title: string;
  icon: "SUCCESS" | "WARNING" | "DANGER";
  message: string;
  buttonText: string;
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({
  title,
  icon,
  message,
  buttonText,
  isOpen,
  setIsModalOpen,
}: ModalProps) {
  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center  bg-white/20 animate-backdrop-blur-in">
        <div className="bg-dark-100 text-center w-[500px] p-6 rounded-md">
          {/* Title */}
          <div className="flex flex-col justify-center items-center">
            {icon == "SUCCESS" && (
              <IoIosCheckmarkCircleOutline className="text-6xl " />
            )}
            {icon == "WARNING" && <IoWarningOutline className="text-6xl " />}
            {icon == "DANGER" && <MdErrorOutline className="text-6xl " />}
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>

          {/* body */}
          <div className="my-6">
            <p>{message}</p>
          </div>

          <div className="w-full flex justify-center">
            <GlowingButton
              text={buttonText}
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    )
  );
}
