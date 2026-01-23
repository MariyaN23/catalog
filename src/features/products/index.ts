import { slice } from './ProductsReducer';
import * as productsAsyncActions from './ProductsActions';
import * as productsSelectors from './productsSelectors';

const productsReducer = slice.reducer
const productsActions = {...productsAsyncActions, ...slice.actions}

export {
    productsReducer,
    productsActions,
    productsSelectors,
}
