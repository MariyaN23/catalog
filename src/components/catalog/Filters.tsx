import { Filter } from "@/lib/types/Filter";
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from "@heroui/react";

type Props = {
    filters: Filter
}

export const Filters = ({filters}: Props) => {
    const [isInvalid, setIsInvalid] = useState(true)

    return (
        <div className={'bg-white rounded-xl h-fit'}>
            <Accordion
                selectionMode={'multiple'}
            >
                {Object.entries(filters).map(([key, values]) => (
                    <AccordionItem
                        key={key}
                        aria-label={key}
                        title={key}
                    >
                        <CheckboxGroup className={'max-h-64 overflow-y-auto'}>
                            {values.map(item => (
                                <Checkbox key={item}>
                                    {item}
                                </Checkbox>
                            ))}
                        </CheckboxGroup>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
