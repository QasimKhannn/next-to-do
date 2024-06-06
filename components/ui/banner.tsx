import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon, ShieldAlert } from "lucide-react";

import { cn } from "@/lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        error:
          "bg-destructive border-destructive text-destructive-foreground rounded shadow",
        warning:
          "bg-warning border-warning text-warning-foreground rounded shadow",
        success:
          "bg-success border-success text-success-foreground rounded shadow",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

export interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  error: ShieldAlert,
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </div>
  );
};
