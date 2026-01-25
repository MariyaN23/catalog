"use client"
import {ProductCard} from "@/components/catalog/ProductCard";
import {useProducts} from "@/hooks/useProducts";

export const ProductsSearch = () => {
    const {
        products,
        status,
    } = useProducts()

    if (status === 'loading') {
        return (
            <p>Загрузка продуктов...</p>
        )
    }

    if (status === 'succeeded') {
        return (
            <div className={'grid grid-cols-4 gap-4'}>
                {products.length ? products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                )) : (
                    <div className={'col-span-4 flex flex-col items-center text-center'}>
                        <h2 className={'text-lg font-semibold'}>
                            Увы, ничего не найдено
                        </h2>
                        <p className={'max-w-md text-gray-600'}>
                            Попробуйте изменить свой запрос. Сократите количество выбранных фильтров или задайте другие
                            параметры.
                        </p>
                    </div>
                )}
            </div>
        )
    }
}
