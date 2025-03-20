import { ChevronLeft, ChevronRight, LucideIcon } from "lucide-react";

interface NavigationButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  className?: string;
}

const NavigationButton = ({
  direction,
  onClick,
  className = "",
}: NavigationButtonProps) => {
  const Icon: LucideIcon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className={`
        bg-white/80 hover:bg-white 
        p-2 rounded-full 
        shadow-lg 
        transition-all 
        absolute top-1/2 -translate-y-1/2
        ${direction === "left" ? "left-4" : "right-4"}
        ${className}
      `}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default NavigationButton;
