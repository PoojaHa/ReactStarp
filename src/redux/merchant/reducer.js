import {
    USER_LOADING,
    USER_ERROR,
    USER_ERROR_RESET,
    GET_NEXT_MERCHANT,
    GET_MERCHANT,
    UPDATE_MERCHANT,
    GET_VENDOR_LIST,
} from './constants';

const initialstate = {
    error: false,
    loading: false,
    isLoggedIn: false,
    token: null,
    merchants: {},
    newMerchantsList: [],
};

const merchantReducer = (state = initialstate, { type, payload }) => {
    switch (type) {
        case USER_LOADING: {
            const loading = true;
            const error = false;
            return {
                ...state, loading, error,
            };
        }

        case USER_ERROR: {
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
        //   case GET_VENDOR_LIST:{
        //     const loading= false;
        //     const error = false;
        //     const listvendors = { ...state.vendors, ...payload.vendorslist }
        //     return {
        //         ...state, loading, error, vendors: listvendors
        //     };
        //   }
        case GET_NEXT_MERCHANT: {
            const loading = false;
            const error = false;
            const { dataList, isNext, nextId } = payload
            let newNextId = nextId || state.nextId
            const newMerchantsList = {}
            dataList.forEach(el => {
                newMerchantsList[`${el._id}`] = el
            });
            const newMerchants = { ...state.merchants, ...newMerchantsList }
            return {
                ...state, loading, error, merchants: newMerchants, isNext, nextId: newNextId
            };
        }
        case GET_MERCHANT: {
            const loading = false;
            const error = false;
            const tempMerchants = { ...state.merchants }
            tempMerchants[payload._id] = payload;
            return {
                ...state, loading, error, merchants: tempMerchants
            };
        }
        case UPDATE_MERCHANT: {
            const loading = false;
            const error = false;
            const hasUpdate = true;
            const tempMerchants = { ...state.merchants }
            tempMerchants[payload._id] = payload;
            return {
                ...state, loading, error, hasUpdate, merchants: tempMerchants
            };
        }

        default:
            return state;
    }
};

export default merchantReducer;
