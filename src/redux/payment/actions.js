import { cabretApi} from '../api';
import {
    PAYMENT_LOADING,
    PAYMENT_ERROR,
     PAYMENT_ERROR_RESET,
    GET_NEXT_STORE,
    GET_STORE,
} from './constants';

export const getNextStore = (id = null) => async (dispatch) => {
    dispatch({ type: PAYMENT_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.get(`/api/online-store/all?start=${id}`);
            dispatch({ type: GET_NEXT_STORE, payload: { stList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('store list error', error);
            dispatch({ type: PAYMENT_ERROR, payload: null });
        }
    }
    else {
        try {
            const response = await cabretApi.get(`/api/online-store/all`);
            dispatch({ type: GET_NEXT_STORE, payload: { stList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('store list error', error);
            dispatch({ type: PAYMENT_ERROR, payload: null });
        }
    }
};
export const getStore = (id) => async (dispatch) => {
    dispatch({ type: PAYMENT_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/online-store/${id}`);
        dispatch({ type: GET_STORE, payload: response.data.data });
    } catch (error) {
        console.log('User info error', error);
        dispatch({ type: PAYMENT_ERROR, payload: null });
    }
};
export const ResetError = () => ({
    type: PAYMENT_ERROR_RESET, payload: null,
});
