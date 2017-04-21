import axios from 'axios'

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

export const gettingAllProducts = receivedProducts => ({
	type: RECEIVE_PRODUCTS, 
	receivedProducts
})

const initialAllProductState = []


export default function (state = initialAllProductState, action) {

	switch(action.type) {

		case RECEIVE_PRODUCTS: 
			return action.receivedProducts
			break;

		default:
			return state;
	}

	return newState

}


