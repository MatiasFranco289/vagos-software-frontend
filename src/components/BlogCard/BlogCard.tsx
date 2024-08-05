import { FaCircle } from "react-icons/fa";
import Markdown from "react-markdown";

interface BlogCardProps {
  author: string;
  date: string;
  title: string;
  body: string;
}

export default function BlogCard({ author, date, title, body }: BlogCardProps) {
  return (
    <div className="w-full bg-dark-100 p-4 rounded-md my-4">
      {/* Header */}
      <div className="w-full flex flex-wrap items-center space-x-1">
        <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] rounded-full bg-dark-400 overflow-hidden"></div>

        <div className="flex flex-col sm:flex-row">
          <p className="font-semibold ml-1">{author}</p>

          <div className="flex items-center font-light text-slate-400 ml-1">
            <FaCircle className="text-[0.3rem]" />
            <p>{date}</p>
          </div>
        </div>
      </div>

      {/* body */}
      <div className="flex flex-col items-start mt-3">
        <h2 className="font-bold text-2xl">{title}</h2>

        <div className="mt-3 text-left">
          <Markdown>{body}</Markdown>
        </div>
      </div>
    </div>
  );
}
