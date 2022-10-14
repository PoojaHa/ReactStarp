import {
    PAYMENT_LOADING,
    PAYMENT_ERROR,
    PAYMENT_ERROR_RESET,
    GET_NEXT_STORE,
    GET_STORE,
} from './constants';

const initialstate = {
    error: false,
    loading: false,
    isLoggedIn: false,
    token: null,
    stores: {},
    newStoreList: [],
};

const paymentReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case PAYMENT_LOADING: {
            const loading = true;
            const error = false;
            return {
                ...state, loading, error,
            };
        }

        case PAYMENT_ERROR: {
            const loading = false;
            const error = true;
            return {
                ...state, loading, error,
            };
        }
        case PAYMENT_ERROR_RESET: {
            const error = false;
            return {
                ...state, error,
            };
        }

        case GET_NEXT_STORE: {
            const loading = false;
            const error = false;
            const { stList, isStore, storeId } = payload
            let newStoreId = storeId || state.storeId
            console.log("has next==>", isStore,)
            const newStoreList = {}
            stList.forEach(el => {
                newStoreList[`${el._id}`] = el
            });
            const newStore = { ...state.stores, ...newStoreList }
            return {
                ...state, loading, error, stores: newStore, isStore, storeId: newStoreId
            };
        }
        case GET_STORE: {
            const loading = false;
            const error = false;
            const tempStores = { ...state.stores }
            tempStores[payload._id] = payload;
            return {
                ...state, loading, error, stores: tempStores
            };
        }
      
        default:
            return state;
    }
};

export default paymentReducer;
