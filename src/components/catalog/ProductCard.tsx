import { Product } from "@/lib/types/Product";
import { HeartIcon } from "@/components/ui/icons/HeartIcon";
import { Button, Tooltip } from "@heroui/react";
import Image from "next/image";

type Props = {
    product: Product
}

export const ProductCard = ({product}: Props) => {
    return (
        <a
            href={'/'}
            className={'flex flex-col gap-3 p-3 bg-white rounded-xl'}
        >
            <div className={'relative mx-auto'}>
                <div className={'absolute right-0'}>
                    <Tooltip content='В избранное'>
                        <Button
                            size={'sm'}
                            variant={'light'}
                            isIconOnly
                        >
                            <HeartIcon />
                        </Button>
                    </Tooltip>
                </div>
                <Image
                    src={product.image}
                    alt={product.title}
                    width={215}
                    height={215}
                    loading={'eager'}
                />
                <div className={'absolute bottom-1 left-1'}>
                    {product.characteristics.isByPrescription === 'По рецепту' &&
                        <div className={'rounded-sm px-2 bg-orange-100 text-orange-700 text-sm'}>
                            {product.characteristics.isByPrescription}
                        </div>
                    }
                </div>
            </div>
            <div className={'font-bold text-sm'}>
                {product.price} р.
            </div>
            <p className={'hyphens-auto flex-grow'}>
                {product.title}
            </p>
            <p className={'text-gray-600 text-xs'}>
                {product.characteristics.brand}
            </p>
            <Button size={'sm'} color={'primary'}>
                В корзину
            </Button>
        </a>
    )
}
