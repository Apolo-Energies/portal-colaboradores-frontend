import React from "react";
import { Card, CardContent } from "../ui/Card";
import { TrendingUp } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  color: "green" | "red" | "yellow" | "gray";
  className?: string;
  icon?: React.ReactNode;
}

const colorClasses = {
  green: {
    icon: "text-green-500",
    dot: "bg-green-500",
  },
  red: {
    icon: "text-red-500",
    dot: "bg-red-500",
  },
  yellow: {
    icon: "text-yellow-500",
    dot: "bg-yellow-500",
  },
  gray: {
    icon: "text-gray-500",
    dot: "bg-gray-500",
  },
};

export const StatusCard = ({ ...props }: Props) => {
  const colors = colorClasses[props.color];

  return (
    <Card className={props.className}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center ${colors.dot} text-white`}
          >
            {props.icon}
          </div>

          <span className="text-sm font-medium text-muted-foreground">
            {props.title}
          </span>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold">{props.value}</span>
          {props.unit && (
            <span className="text-sm text-muted-foreground">{props.unit}</span>
          )}
        </div>
        {props.change && (
          <div className="flex items-center mt-2">
            <TrendingUp className={`mr-1 h-3 w-3 ${colors.icon}`} />
            <span className={`text-xs ${colors.icon}`}>{props.change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
