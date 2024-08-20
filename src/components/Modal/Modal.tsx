import { MdErrorOutline } from "react-icons/md";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import GlowingButton from "../GlowingButton/GlowingButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ModalProps {
  title: string;
  icon: "SUCCESS" | "WARNING" | "DANGER";
  message: string;
  buttonText: string;
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
}

export default function Modal({
  title,
  icon,
  message,
  buttonText,
  isOpen,
  setIsModalOpen,
  onClose: onClose = () => {},
}: ModalProps) {
  const [delayedIsOpen, setDelayedIsOpen] = useState(false);

  // When the modal is being closed i still need to show a short
  // transition animation, so instead of use the default state isOpen to show or not
  // the modal i use the 'delayedIsOpen' state which gives me enought time to show
  // the transition animation before close the modal
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setDelayedIsOpen(false);
      }, 200);
    } else {
      setDelayedIsOpen(true);
    }
  }, [isOpen]);

  return (
    delayedIsOpen && (
      <div
        className={`fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center ${
          isOpen
            ? "animate-backdrop-fade-in bg-transparent"
            : "animate-backdrop-fade-out bg-white/20"
        }`}
      >
        <div
          className={`bg-dark-100 text-center w-[280px] sm:w-[500px] p-6 rounded-md ${
            isOpen ? "animate-unfold-y" : "animate-fold-y"
          }`}
        >
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
              onClick={() => {
                setIsModalOpen(false);
                onClose();
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}
