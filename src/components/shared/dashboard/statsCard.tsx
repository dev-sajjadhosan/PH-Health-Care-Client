import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { createElement } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  iconName?: string;
  description?: string;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  iconName,
  description,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow w-full", className)}>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center gap-2">
          {iconName && (
            <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
              {createElement(getIconComponent(iconName), { className: "w-5 h-5" })}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};


