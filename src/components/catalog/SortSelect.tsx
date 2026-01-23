import { Select, SelectItem } from "@heroui/react";
import { ChangeEvent, useState } from "react";

const sortingVariants = [
    {key: 'default', label: 'По релевантности'},
    {key: 'asc', label: 'Сначала дешевые'},
    {key: 'desc', label: 'Сначала дорогие'},
]

export const SortSelect = () => {
    const [value, setValue] = useState('default')
    const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value)
    }

    return (
        <Select
            className={'max-w-64'}
            aria-label={'Сортировка товаров'}
            selectedKeys={[value]}
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
