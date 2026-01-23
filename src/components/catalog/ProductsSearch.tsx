import { ProductCard } from "@/components/catalog/ProductCard";
import { Product } from "@/lib/types/Product";
import { Status } from "@/lib/types/Status";

type Props = {
    products: Product[]
    status: Status
}

export const ProductsSearch = ({products, status}: Props) => {
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
