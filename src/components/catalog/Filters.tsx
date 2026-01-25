"use client"
import {Accordion, AccordionItem, Button, Checkbox, CheckboxGroup} from "@heroui/react";
import {useProducts} from "@/hooks/useProducts";
import {productCharacteristicTranslations} from "@/helpers/translations";

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

    const visibleItems = 6

    if (status === 'succeeded') {
        return (
            <div className={'bg-white rounded-xl h-fit'}>
                <Accordion
                    selectionMode={'multiple'}
                    defaultSelectedKeys={'all'}
                >
                    {Object.entries(filters).map(([key, values]) => {
                        const characteristicKey = key as keyof typeof productCharacteristicTranslations
                        const title = productCharacteristicTranslations[characteristicKey] || key

                            return (
                                <AccordionItem
                                    key={key}
                                    aria-label={key}
                                    title={title}
                                    classNames={{
                                        title: 'font-semibold',
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
                            )
                        }
                    )}
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
