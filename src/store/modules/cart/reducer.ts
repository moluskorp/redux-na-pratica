import { Reducer } from "redux";
import { ActionTypes, ICartState } from "./types";
import produce from 'immer';

const INITIAL_STATE: ICartState = {
    items: [],
    failedStockCheck: []
}

export const cart:Reducer<ICartState> = (state = INITIAL_STATE, action) => {
    return produce(state,draft => {
        switch(action.type){
            case ActionTypes.addProductToCartRequest: {
                const {product} = action.payload;

                const productInCartIndex = draft.items.findIndex(item => 
                    item.product.id === product.id,
                )

                if(productInCartIndex >= 0) {
                    draft.items[productInCartIndex].quantity++;
                }else{
                    draft.items.push({
                        product,
                        quantity: 1
                    })
                }
                break;
            }
            case ActionTypes.addProductToCartFailure: {
                draft.failedStockCheck.push(action.payload.productId)
                console.log('falha',action.payload);
                break;
            }
            default: {
               return draft
            }
        }
    });
}