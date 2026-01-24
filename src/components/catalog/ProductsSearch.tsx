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

    if (status === 'failed') {
        return (
            <p className={'col-span-4 text-center'}>
                Ничего не найдено
            </p>
        )
    }

    if (status === 'succeeded') {
        return (
            <div className={'grid grid-cols-4 gap-4'}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        )
    }
}
