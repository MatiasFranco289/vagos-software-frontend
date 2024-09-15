interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}
export default function GlowingButton({ text, onClick, type }: ButtonProps) {
  return (
    <div className="w-full relative group">
      <button
        className="text-white rounded-md p-2 w-full border-[1px] duration-200 relative z-10
        bg-dark-100 group-hover:text-orange-500 group-hover:border-orange-500 
        hover:glow-text"
        onClick={onClick || undefined}
        type={type || "button"}
      >
        {text}
      </button>

      <button
        className="absolute inset-0 w-full bg-gradient-to-tr from-white
         to-orange-600 via-red-500 blur-md z-0 opacity-0 group-hover:opacity-100 
         duration-200 animate-tilt"
      />
    </div>
  );
}
