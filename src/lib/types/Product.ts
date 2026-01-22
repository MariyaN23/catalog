import { ProductCharacteristics } from "./ProductCharacteristics"

export interface Product {
    id: string
    title: string
    price: number
    image: string
    characteristics: ProductCharacteristics
}
