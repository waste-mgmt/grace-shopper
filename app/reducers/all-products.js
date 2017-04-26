import axios from 'axios'
import store from '../store'

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

export const gettingAllProducts = receivedProducts => ({
	type: RECEIVE_PRODUCTS,
	receivedProducts
})

const initialAllProductState = []

export const onAllProducts = () => {
	return dispatch => {
		return axios.get('/api/products')
		.then(response => {
			const allProducts = response.data
				dispatch(gettingAllProducts(allProducts))
			})
	}
}



export default function (state = initialAllProductState, action) {

	switch(action.type) {

		case RECEIVE_PRODUCTS:
			return action.receivedProducts
			break;

		default:
			return state;
	}
}


