import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productCreateReducer, productDeleteReducer, productDetailReducer, productListReducer, productReviewReducer, productTopRatedReducer, productUpdateReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducers';
import { userDeleteReducer, userLoginReducer, userUpdateReducer } from './reducers/userReducers';
import { userRegisterReducer, userListDetailsReducer } from './reducers/userReducers';
import { userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListReducer, ordersListReducer, orderDeliverReducer } from './reducers/orderReducers';

const cartItemsFromStorage = localStorage.getItem('cardItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}
const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
};
const middleware = [thunk];
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productReview:productReviewReducer,
    productTopRated:productTopRatedReducer,
    cart: cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userListDetails:userListDetailsReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderList: orderListReducer,
    ordersList: ordersListReducer
    
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;