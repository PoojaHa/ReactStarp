import { cabretApi} from '../api';
import {
    USER_LOADING,
    USER_ERROR,
    USER_ERROR_RESET,
    //GET_VENDOR_LIST,
    GET_NEXT_MERCHANT,
    GET_MERCHANT,
    UPDATE_MERCHANT,
} from './constants';

// export const getVendorlist =(data) => async(dispatch)=>{
//     dispatch({type: GET_VENDOR_LIST ,payload:{vendorslist:data}})
// }
export const getNextMerchant = (data, id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.post(`/api/user/filter?start=${id}`, data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            dispatch({ type: GET_NEXT_MERCHANT, payload: { dataList: response.data.users, isNext: response.data.hasNext, nextId: response.data.next } });
        } catch (error) {
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
    else {
        try {
            const response = await cabretApi.post('/api/user/filter', data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            dispatch({ type: GET_NEXT_MERCHANT, payload: { dataList: response.data.users, isNext: response.data.hasNext, nextId: response.data.next } });
        } catch (error) {
            console.log('Vendor list error', error);
            dispatch({ type: USER_ERROR, payload: null });
        }
    }

};

export const getMerchant = (id) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/user/${id}`);
        dispatch({ type: GET_MERCHANT, payload: response.data.data });
    } catch (error) {
        console.log('User info error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};

export const updateMerchant = (dataInput) => async (dispatch) => {
    dispatch({ type: UPDATE_MERCHANT, payload: dataInput });
};




export const ResetError = () => ({
    type: USER_ERROR_RESET, payload: null,
});
