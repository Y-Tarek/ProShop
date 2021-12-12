import { CART_ADD_ITEM, CART_DELETE_ITEM } from "../constants/cartConstatnts";

export const cartReducer = (state ={cartItems: []}, action) => {
   
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
            const exsisitItem = state.cartItems.find(x => x.product == item.product)

             if(exsisitItem){
               return {
                   ...state,
                   cartItems: state.cartItems.map(x => x.product === exsisitItem.product ?
                     item : x
                    )
               }
             }else{
                 return {
                     ...state,
                     cartItems: [...state.cartItems, item]
                 }
             }

             case CART_DELETE_ITEM :
                return {
                    ...state,
                    cartItems:state.cartItems.filter((x) => x.product !== action.payload) //Here we show what we havenot reoved from cartItems
                }

        default:
            return state
    }
}