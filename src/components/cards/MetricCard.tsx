import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface Props {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative"
  icon?: React.ReactNode
  className?: string
}
export const MetricCard = ({ ...props }: Props) => {
  return (
    <Card className={props.className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {props.title}
        </CardTitle>
        {props.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        {props.change && (
          <div className="flex items-center text-xs text-muted-foreground">
            {props.changeType === "positive" ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span
              className={
                props.changeType === "positive" ? "text-green-500" : "text-red-500"
              }
            >
              {props.change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
