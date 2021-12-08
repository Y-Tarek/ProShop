import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailReducer, productListReducer } from './reducers/productReducer';

const initialState = {};
const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;