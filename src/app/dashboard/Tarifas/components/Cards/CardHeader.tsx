import React from 'react'

import { Calendar } from "lucide-react"

interface Props {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  subtitle: string
  modalidad?: string | null
  proveedor: string
  getModalidadColor: (modalidad: string) => string
}

export const CardHeader = ({
  icon: Icon,
  title,
  subtitle,
  modalidad,
  proveedor,
  getModalidadColor,
}: Props) => (
  <div className="p-6 border-b border-gray-100">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-700 rounded-lg shadow-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-600">{subtitle}</span>
          </div>
          <span className="text-sm text-gray-500">{proveedor}</span>
          {modalidad && (
            <span
              className={`inline-block px-3 py-1 text-sm font-medium rounded-lg border ${getModalidadColor(
                modalidad
              )}`}
            >
              {modalidad}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
)
