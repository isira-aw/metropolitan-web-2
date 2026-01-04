import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({ title, subtitle, align = "center", light = false }: SectionHeaderProps) {
  return (
    <div className={cn(
      "mb-12 max-w-3xl",
      align === "center" ? "mx-auto text-center" : "text-left"
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4",
        light ? "text-white" : "text-secondary"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg",
          light ? "text-white/80" : "text-muted-foreground"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1.5 w-20 bg-primary mt-6 rounded-full",
        align === "center" ? "mx-auto" : ""
      )} />
    </div>
  );
}
