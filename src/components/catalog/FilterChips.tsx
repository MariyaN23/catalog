"use client"
import {useProducts} from "@/hooks/useProducts";
import {Chip} from "@heroui/chip";

export const FilterChips = () => {
    const {
        searchFilters,
        onFilterChange,
        onClearFilters
    } = useProducts()

    const handleRemoveFilter = (category: string, value: string) => {
        const updated = {...searchFilters}
        updated[category] = updated[category].filter(v => v !== value)

        if (updated[category].length === 0) {
            delete updated[category]
        }

        onFilterChange(updated)
    }

    return (
        <div className={'flex flex-wrap gap-2'}>
            {Object.keys(searchFilters).length > 0 && (
                <Chip
                    variant="flat"
                    onClose={onClearFilters}
                >
                    Очистить
                </Chip>
            )}
            {Object.entries(searchFilters).map(([category, values]) => (
                values.map(value => (
                    <Chip
                        key={`${category}-${value}`}
                        variant="flat"
                        onClose={() => handleRemoveFilter(category, value)}
                    >
                        {value}
                    </Chip>
                ))
            ))}
        </div>
    )
}
