import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationButtonProps {
  buttonNumber: string;
  actualPage: string;
}

export default function PaginationButton({
  buttonNumber,
  actualPage,
}: PaginationButtonProps) {
  const searchParams = useSearchParams();

  const protocol = window.location.protocol;
  const host = window.location.host;
  const baseRedirectUrl = `projects`;
  const queryParams = searchParams.toString();
  const redirectUrl = `${protocol}//${host}/${baseRedirectUrl}/${buttonNumber}?${queryParams}`;

  return (
    <Link
      href={redirectUrl}
      className={`bg-dark-100 rounded-md p-3 text-center cursor-pointer m-2 ${
        (actualPage === buttonNumber && "text-orange-500 glow-text") ||
        "hover:bg-dark-400 duration-100"
      }`}
    >
      {buttonNumber}
    </Link>
  );
}
