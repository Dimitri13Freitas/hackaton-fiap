import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      xs: "text-xs font-normal font-display ",
      sm: "text-sm font-normal font-display ",
      md: "text-base font-normal font-display ",
      lg: "text-lg font-medium font-display ",
      h1: "text-4xl font-bold tracking-tight font-highlight text-secondary-foreground",
      h2: "text-3xl font-semibold tracking-tight font-highlight text-secondary-foreground",
      h3: "text-2xl font-semibold font-highlight text-secondary-foreground",
      h4: "text-xl font-semibold font-highlight text-secondary-foreground",
      xxl: "text-6xl font-extrabold font-highlight text-secondary-foreground",
    },
  },
  defaultVariants: {
    variant: "md",
  },
});

const tagMap = {
  xs: "span",
  sm: "p",
  md: "p",
  lg: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  xxl: "h1",
} as const;

interface MindEaseTextProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof textVariants> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export const MindEaseText = ({
  children,
  variant = "md",
  className,
  as,
  ...props
}: MindEaseTextProps) => {
  const Component = as || tagMap[variant || "md"] || "p";

  return (
    <Component className={cn(textVariants({ variant }), className)} {...props}>
      {children}
    </Component>
  );
};
