import { slice } from './productsReducer';
import * as productsAsyncActions from './productsActions';
import * as productsSelectors from './productsSelectors';

const productsReducer = slice.reducer
const productsActions = {...productsAsyncActions, ...slice.actions}

export {
    productsReducer,
    productsActions,
    productsSelectors,
}
