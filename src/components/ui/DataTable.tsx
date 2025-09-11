import React from 'react'

export interface Column<T> {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
}  
  
  interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T;
  }

export function DataTable<T>({ data, columns, rowKey }: DataTableProps<T>) {
    return (
        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-card border-b border-border">
                <tr>
                  {columns?.map((col) => (
                    <th
                      key={col.key}
                      className={`px-6 py-4 text-xs font-medium text-muted-foreground uppercase tracking-wider text-${col.align || "left"}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-body divide-y divide-gray-200">
                {data?.map((row) => (
                  <tr
                    key={String(row[rowKey])}
                    className="hover:bg-body transition-colors"
                  >
                    {columns?.map((col) => (
                      <td
                        key={col.key}
                        className={`px-6 py-4 whitespace-nowrap text-${col.align || "left"}`}
                      >
                        {col?.render
                          ? col.render(row)
                          : String(row[col.key as keyof T] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
