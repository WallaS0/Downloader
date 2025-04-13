import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnimationVariant = "default" | "shine" | "glow" | "bounce";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  animationVariant?: AnimationVariant;
  onClick?: () => void;
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  animationVariant = "default",
  variant = "default",
  size = "default",
  onClick,
  ...props
}) => {
  // Get motion props based on animation variant
  const getMotionProps = () => {
    switch (animationVariant) {
      case "shine":
        return {
          whileHover: { scale: 1.03 },
          whileTap: { scale: 0.97 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        };
      case "glow":
        return {
          whileHover: { boxShadow: "0 0 20px rgba(124, 58, 237, 0.7)" },
          transition: { duration: 0.2 },
        };
      case "bounce":
        return {
          whileHover: { y: -5 },
          whileTap: { y: 0 },
          transition: { type: "spring", stiffness: 500, damping: 10 },
        };
      default:
        return {
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { type: "spring", stiffness: 400, damping: 17 },
        };
    }
  };

  // Custom class names based on animation variant
  const getCustomClasses = () => {
    switch (animationVariant) {
      case "shine":
        return "relative overflow-hidden";
      case "glow":
        return "shadow-md hover:shadow-lg transition-shadow duration-300";
      default:
        return "";
    }
  };

  return (
    <motion.div
      {...getMotionProps()}
      className={cn("inline-block", getCustomClasses())}
    >
      <Button
        className={className}
        variant={variant}
        size={size}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
      
      {/* For shine effect - add an animated overlay */}
      {animationVariant === "shine" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          initial={{ opacity: 0, x: "-100%" }}
          whileHover={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
};

export { AnimatedButton };