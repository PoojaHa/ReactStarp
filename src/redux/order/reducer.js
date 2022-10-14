import {
    POST_LOADING,
    POST_ERROR,
    USER_ERROR_RESET,
    GET_TOTAL_ORDER,
    GET_ORDER,
    GET_ORDER_LIST,
} from './constants';

const initialstate = {
    error: false,
    loading: false,
    isLoggedIn: false,
    token: null,
};

const orderReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case POST_LOADING: {
            const loading = true;
            const error = false;
            return {
                ...state, loading, error,
            };
        }

        case POST_ERROR: {
            const loading = false;
            const error = true;
            return {
                ...state, loading, error,
            };
        }
        case USER_ERROR_RESET: {
            const error = false;
            return {
                ...state, error,
            };
        }

        case GET_ORDER_LIST: {
            const loading = false;
            const error = false;
            const orderList = payload
            return {
                ...state, loading, error, orderList
            };
        }
        case GET_TOTAL_ORDER: {
            const loading = false;
            const error = false;
            const orderTotal = payload
            return {
                ...state, loading, error, orderTotal
            };
        }
        case GET_ORDER: {
            const loading = false;
            const error = false;
            const orderInfo = payload
            return {
                ...state, loading, error, orderInfo
            };
        }
      
        default:
            return state;
    }
};

export default orderReducer;
