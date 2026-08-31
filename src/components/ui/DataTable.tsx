import type { ReactNode } from "react";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T, index: number) => ReactNode;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  onRowClick,
}: {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
}) {
  if (isLoading) return <SkeletonLoader rows={6} />;

  return (
    <div className="overflow-hidden rounded-[2px] border border-app-border bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-app-border text-sm">
          <thead className="bg-primary text-white">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`px-4 py-3 text-left font-semibold ${column.className ?? ""}`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-app-border">
            {data.map((row, index) => (
              <tr
                key={index}
                className={`odd:bg-white even:bg-[#F8FAFF] hover:bg-[#EEF3FB] ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-4 py-3 align-middle ${column.className ?? ""}`}
                    onClick={column.key === "actions" ? (event) => event.stopPropagation() : undefined}
                  >
                    {column.render(row, index)}
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
