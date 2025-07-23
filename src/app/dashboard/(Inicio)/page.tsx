import { MetricCard } from "@/components/cards/MetricCard";
import { StatusCard } from "@/components/cards/StatusCard";
import { AreaChart } from "@/components/graficas/AreaChart";
import { Book, CircleCheckBig, Clock, TrendingDown, X } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MetricCard
          title="TOTAL CUPS"
          value="1,726"
          change="+5.2%"
          changeType="positive"
        />
        <MetricCard
          title="TOTAL CARTERA"
          value="2,950 GB"
          change="+8.7%"
          changeType="positive"
        />
      </div>

      {/* Gráfico de área */}
      <div className="mb-6">
        <AreaChart
          title="Cartera x Mes"
          value="2,950 GB"
          className="bg-card rounded-lg p-6"
        />
      </div>

      {/* Tarjetas de estado - Primera fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatusCard
          title="CUPS ACTIVOS"
          value="1,726"
          change="+5.2%"
          color="green"
          icon={<CircleCheckBig className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS BAJA"
          value="1,726"
          change="+5.2%"
          color="red"
          icon={<TrendingDown className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS EN TRÁMITE"
          value="1,726"
          change="+5.2%"
          color="yellow"
          icon={<Clock className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS PDT FIRMA"
          value="1,726"
          change="+5.2%"
          color="gray"
          icon={<X className="w-3 h-3 " />}
        />
      </div>

      {/* Tarjetas de estado - Segunda fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="CUPS ACTIVOS"
          value="45,726"
          unit="GW"
          change="+5.2%"
          color="green"
          icon={<CircleCheckBig className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS BAJA"
          value="1,726"
          unit="GW"
          change="+5.2%"
          color="red"
          icon={<TrendingDown className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS EN TRÁMITE"
          value="1,726"
          unit="GW"
          change="+5.2%"
          color="yellow"
          icon={<Clock className="w-3 h-3 " />}
        />
        <StatusCard
          title="CUPS PDT FIRMA"
          value="1,726"
          unit="GW"
          change="+5.2%"
          color="gray"
          icon={<X className="w-3 h-3 " />}
        />
      </div>
    </>
  );
}
