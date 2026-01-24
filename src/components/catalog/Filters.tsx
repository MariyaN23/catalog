import {Accordion, AccordionItem, Button, Checkbox, CheckboxGroup} from "@heroui/react";
import {useProducts} from "@/hooks/useProducts";

export const Filters = () => {
    const {
        status,
        filters,
        searchFilters,
        onFilterChange,
        onClearFilters,
    } = useProducts()

    const handleFilterChange = (key: string, values: string[]) => {
        const updatedFilters = {...searchFilters}

        if (values.length === 0) {
            delete updatedFilters[key]
        } else {
            updatedFilters[key] = values
        }

        onFilterChange(updatedFilters)
    }

    console.log('Selected filters:', searchFilters)

    const visibleItems = 6

    if (status === "loading") {
        return (
            <p>Загрузка фильтров...</p>
        )
    }

    if (status === 'failed') {
        return (
            <p className={'col-span-4 text-center'}>
                Ничего не найдено
            </p>
        )
    }

    if (status === 'succeeded') {
        return (
            <div className={'bg-white rounded-xl h-fit'}>
                <Accordion
                    selectionMode={'multiple'}
                    defaultSelectedKeys={'all'}
                >
                    {Object.entries(filters).map(([key, values]) => (
                        <AccordionItem
                            key={key}
                            aria-label={key}
                            title={key}
                            classNames={{
                                title: 'font-semibold',
                                trigger: 'cursor-pointer'
                            }}
                        >
                            <CheckboxGroup
                                classNames={{
                                    base: values.length <= visibleItems ? 'h-auto' : 'max-h-[12.5rem] overflow-y-auto overflow-x-hidden'
                                }}
                                value={searchFilters[key] || []}
                                onValueChange={(values) => handleFilterChange(key, values)}
                            >
                                {values.map(item => (
                                    <Checkbox
                                        key={item}
                                        value={item}
                                    >
                                        {item}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className={'sticky bg-white rounded-b-xl bottom-0 p-2'}>
                    <Button
                        type={'reset'}
                        onPress={onClearFilters}
                        className={'w-full'}
                    >
                        Сбросить все
                    </Button>
                </div>
            </div>
        )
    }
}
