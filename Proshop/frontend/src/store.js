import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productDetailReducer, productListReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers';

const cartItemsFromStorage = localStorage.getItem('cardItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const initialState = {
    cart: {cartItems: cartItemsFromStorage},
};
const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;