import { cabretApi} from '../api';
import {
    POST_LOADING,
    POST_ERROR,
    USER_ERROR_RESET,
    GET_TOTAL_ORDER,
    GET_ORDER,
    GET_ORDER_LIST,
} from './constants';

export const getOrderList = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/order/${id}`);
        dispatch({ type: GET_ORDER_LIST, payload: response.data.data });
    } catch (error) {
        console.log('order list error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const totalOrder = () => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/order/`);
        dispatch({ type: GET_TOTAL_ORDER, payload: response.data.data });
    } catch (error) {
        console.log('order list error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getOrder = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/order/${id}`);
        console.log("order list", response)
        dispatch({ type: GET_ORDER, payload: response.data.data });
    } catch (error) {
        console.log('order list error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};

export const ResetError = () => ({
    type: USER_ERROR_RESET, payload: null,
});
