import { useRouter } from "next/navigation";

interface PaginationButtonProps {
  buttonNumber: string;
  actualPage: string;
}

export default function PaginationButton({
  buttonNumber,
  actualPage,
}: PaginationButtonProps) {
  const router = useRouter();
  const baseRedirectUrl = `/projects/`;

  return (
    <div
      className={`bg-dark-100 rounded-md p-3 text-center cursor-pointer m-2 ${
        (actualPage === buttonNumber && "text-orange-500 glow-text") ||
        "hover:bg-dark-400 duration-100"
      }`}
      onClick={() => router.push(baseRedirectUrl + "/" + buttonNumber)}
    >
      {buttonNumber}
    </div>
  );
}
