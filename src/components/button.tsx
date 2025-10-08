import React, { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  disabled = false,
  type = "button",
  fullWidth = false,
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-md px-3 py-1.5 text-sm
    ${fullWidth ? "w-full" : ""}
  `;

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 bg-white",
  };

  // Clases condicionales
  const variantClasses = variants[variant] || variants.primary;

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses}
    ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};
