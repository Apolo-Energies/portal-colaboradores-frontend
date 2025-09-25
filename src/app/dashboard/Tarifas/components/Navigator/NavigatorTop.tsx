import { Building, Calculator, TrendingUp, Zap } from "lucide-react";
import React from "react";

interface Props {
  setSelectedTab: (id: string) => void;
  selectedTab: string;
}

export const NavigatorTop = ({ setSelectedTab, selectedTab }: Props) => {
  const tabs = [
    { id: "proveedor", name: "Proveedor", icon: Building, count: 1 },
    {
      id: "tarifas",
      name: "Tarifas",
      icon: Calculator,
      //   count: filteredTariffs.length,
    },
    {
      id: "reparto",
      name: "Reparto OMIE",
      icon: TrendingUp,
      //   count: filteredReparto.length,
    },
    {
      id: "potencia",
      name: "Potencia BOE",
      icon: Zap,
      //   count: filteredPotencia.length,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-1">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
                selectedTab === tab.id
                  ? "bg-blue-400 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Icon
                size={14}
                className={
                  selectedTab === tab.id ? "text-white" : "text-blue-700"
                }
              />
              {tab.name}
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded-md ${
                  selectedTab === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
