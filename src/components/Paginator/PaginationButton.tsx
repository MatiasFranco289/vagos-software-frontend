import { useRouter } from "next/navigation";

interface PaginationButtonProps {
  buttonNumber: string;
}

export default function PaginationButton({
  buttonNumber,
}: PaginationButtonProps) {
  const router = useRouter();
  const baseRedirectUrl = `/projects/`;

  return (
    <div
      className="bg-dark-100 rounded-md p-3 text-center cursor-pointer"
      onClick={() => router.push(baseRedirectUrl + "/" + buttonNumber)}
    >
      {buttonNumber}
    </div>
  );
}
