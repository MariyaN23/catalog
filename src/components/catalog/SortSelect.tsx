import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent } from "react";
import { Sort } from "@/lib/types/Sort";

type Props = {
    sorting: Sort
    onSortChange: (value: Sort) => void
}

const sortingVariants = [
    {key: 'default', label: 'По релевантности'},
    {key: 'asc', label: 'Сначала дешевые'},
    {key: 'desc', label: 'Сначала дорогие'},
]

export const SortSelect = ({sorting, onSortChange}: Props) => {
    const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value as Sort)
    }

    return (
        <Select
            className={'max-w-64'}
            aria-label={'Сортировка товаров'}
            selectedKeys={[sorting]}
            onChange={handleSelectionChange}
            size={'sm'}
        >
            {sortingVariants.map(item => (
                <SelectItem key={item.key}>
                    {item.label}
                </SelectItem>
            ))}
        </Select>
    )
}
