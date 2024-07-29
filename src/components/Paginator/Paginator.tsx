import PaginationButton from "./PaginationButton";

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
  const pagesTotalAmount = Math.ceil(totalElements / maxElementsPerPage);

  // This function creates all buttons and returns an array
  const createButtons = (numberOfButtons: number) => {
    const buttons: React.ReactNode[] = [];

    for (let i = 0; i < numberOfButtons; i++) {
      buttons.push(
        <PaginationButton
          buttonNumber={`${i + 1}`}
          key={`pagination_button_${i}`}
        />
      );
    }

    return buttons;
  };

  const allButtonsElements = createButtons(pagesTotalAmount); // Al button elements are saved

  // This function manages what button show
  const showButtons = (buttons: React.ReactNode[]) => {
    const buttonsToShow = buttons.slice(0, maxButtonsToShow);
    return buttonsToShow;
  };

  // If the
  const showNextButton = () => {};
  return (
    <div className="bg-dark-300 mt-3 rounded-md flex justify-around p-2 w-1/6">
      {showButtons(allButtonsElements)}
    </div>
  );
}
