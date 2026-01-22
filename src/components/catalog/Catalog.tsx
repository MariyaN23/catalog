'use client'
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/catalog/ProductCard";

export const Catalog = () => {
    const {products, loading, error} = useProducts()

    return (
        <div className={'grid grid-cols-[270px_1fr] gap-4'}>
            <div className={'bg-white rounded-xl'}>
                filters
            </div>
            <div className={'grid grid-cols-4 gap-4'}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}
