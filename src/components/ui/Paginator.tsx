import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../buttons/button";

interface Props {
    currentPage: number;
    totalPages: number;
    totalCount?: number;
    pageSize: number; // 👈 nuevo
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void; // 👈 nuevo
    className?: string;
}

export const Paginator: React.FC<Props> = ({
    currentPage,
    totalPages,
    totalCount,
    pageSize,
    onPageChange,
    onPageSizeChange,
    className = "",
}) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${className}`}
        >
            {/* 🔹 Información */}
            <div className="text-sm text-gray-600 flex flex-wrap items-center gap-3">
                <span>
                    Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
                    {totalCount !== undefined && (
                        <> — Total registros: <strong>{totalCount}</strong></>
                    )}
                </span>

                {/* 🔹 Selector de cantidad */}
                <div className="flex items-center gap-2">
                    <label htmlFor="pageSize" className="text-gray-700">
                        Ver:
                    </label>
                    <select
                        id="pageSize"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {[10, 20, 50, 100, 200].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 🔹 Paginación */}
            <div className="flex items-center justify-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </Button>
                ))}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
