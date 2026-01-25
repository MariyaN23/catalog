import {SortSelect} from "@/components/catalog/SortSelect";
import {ProductsSearch} from "@/components/catalog/ProductsSearch";
import {Filters} from "@/components/catalog/Filters";
import {SearchPagination} from "@/components/catalog/SearchPagination";
import {FilterChips} from "@/components/catalog/FilterChips";

export const Catalog = () => {
    return (
        <div className={'space-y-4'}>
            <div className={'flex gap-4 items-start justify-between'}>
                <FilterChips/>
                <SortSelect/>
            </div>
            <div className={'grid grid-cols-[270px_1fr] gap-4'}>
                <Filters/>
                <div>
                    <ProductsSearch/>
                    <SearchPagination/>
                </div>
            </div>
        </div>
    )
}
