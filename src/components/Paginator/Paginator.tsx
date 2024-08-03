import { useParams } from "next/navigation";
import PaginationButton from "./PaginationButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

interface PaginatorProps {
  totalElements: number;
  maxElementsPerPage: number;
  maxButtonsToShow: number;
}

// Este componete renderizara esa cantidad x de botones como maximo
// Si la cantidad de botones renderizada es menor al total de pagina entonces renderizara un boton >> al final
// Si la pagina actual es mayor a la cantidad de botones a mostrar entonces renderizara un boton << al principio
// Si el boton seleccionado es el anteultimo se comenzara a desplazar
export default function Paginator({
  totalElements,
  maxElementsPerPage,
  maxButtonsToShow,
}: PaginatorProps) {
  const router = useRouter();
  const params = useParams();
  const actualPage: string = params.page as string;
  const pagesTotalAmount = Math.ceil(totalElements / maxElementsPerPage);
  const maxOffset = pagesTotalAmount - maxButtonsToShow;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (parseInt(actualPage) > maxButtonsToShow - 1) {
      let offset = parseInt(actualPage) - maxButtonsToShow + 1;
      offset = offset < maxOffset ? offset : maxOffset;
      setOffset(offset);
    }
  }, []);

  // This function creates all buttons and returns an array
  const createButtons = (numberOfButtons: number) => {
    const buttons: React.ReactNode[] = [];

    for (let i = 0; i < numberOfButtons; i++) {
      buttons.push(
        <PaginationButton
          buttonNumber={`${i + 1}`}
          actualPage={actualPage}
          key={`pagination_button_${i}`}
        />
      );
    }

    return buttons;
  };

  const allButtonsElements = createButtons(pagesTotalAmount); // All button elements are saved

  // This function manages what button show
  const showButtons = (buttons: React.ReactNode[]) => {
    const buttonsToShow = buttons.slice(offset, maxButtonsToShow + offset);
    return buttonsToShow;
  };

  const goBackBtn = () => {
    return (
      offset > 0 && (
        <div
          className={`bg-dark-100 rounded-md p-3 text-center cursor-pointer hover:bg-dark-400 duration-100`}
          onClick={() => router.push((parseInt(actualPage) - 1).toString())}
        >
          <MdKeyboardArrowLeft className="text-lg" />
        </div>
      )
    );
  };

  const goForwardsBtn = () => {
    return (
      offset < maxOffset && (
        <div
          className={`bg-dark-100 rounded-md p-3 text-center cursor-pointer hover:bg-dark-400 duration-100`}
          onClick={() => router.push((parseInt(actualPage) + 1).toString())}
        >
          <MdKeyboardArrowRight className="text-lg" />
        </div>
      )
    );
  };

  const goStartBtn = () => {
    return (
      offset > 1 && (
        <div
          className={`bg-dark-100 rounded-md p-3 text-center cursor-pointer hover:bg-dark-400 duration-100`}
          onClick={() => router.push("1")}
        >
          <MdKeyboardDoubleArrowLeft className="text-lg" />
        </div>
      )
    );
  };

  const goEndBtn = () => {
    return (
      offset < maxOffset - 1 && (
        <div
          className={`bg-dark-100 rounded-md p-3 text-center cursor-pointer hover:bg-dark-400 duration-100`}
          onClick={() => router.push(pagesTotalAmount.toString())}
        >
          <MdKeyboardDoubleArrowRight className="text-lg" />
        </div>
      )
    );
  };

  return (
    <div className="bg-dark-300 mt-8 rounded-md p-2 inline-flex items-center justify-between w-full py-3 flex-col sm:flex-row">
      <div className="flex space-x-2 m-2">
        {goStartBtn()}
        {goBackBtn()}
      </div>

      <div className="flex mx-10 flex-wrap my-4 sm:my-0">
        {showButtons(allButtonsElements)}
      </div>

      <div className="flex space-x-2 m-2">
        {goForwardsBtn()}
        {goEndBtn()}
      </div>
    </div>
  );
}
