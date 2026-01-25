import { ProductCharacteristics } from "@/lib/types/ProductCharacteristics";

export const productCharacteristicTranslations: Record<keyof ProductCharacteristics, string> = {
    country: 'Страна',
    brand: 'Бренд',
    dossage: 'Дозировка',
    releaseForm: 'Форма выпуска',
    storageTemperature: 'Температура хранения',
    quantityPerPackage: 'Количество в упаковке',
    expirationDate: 'Срок годности',
    isByPrescription: 'Рецептурный отпуск',
    manufacturer: 'Производитель'
}
