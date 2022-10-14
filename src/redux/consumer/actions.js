import { cabretApi} from '../api';
import {
    USER_LOADING,
    USER_ERROR,
    USER_ERROR_RESET,
    GET_USER_LIST,
    GET_NEXT_USER,
    GET_USER,
    DELETE_USER,
    UPDATE_USER,

} from './constants';


export const getUserLists = (data) => (dispatch) => {
    dispatch({ type: GET_USER_LIST, payload: { userList: data } });
};
export const getNextUser = (data, id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.post(`/api/user/filter?start=${id}`, data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            dispatch({ type: GET_NEXT_USER, payload: { newList: response.data.users, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('Consumer list error', error);
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
            console.log("first data", response.data.users)
            dispatch({ type: GET_NEXT_USER, payload: { newList: response.data.users, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('Consumer list error', error);
            dispatch({ type: USER_ERROR, payload: null });
        }
    }

};
export const getUser = (id) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/user/${id}`);
        dispatch({ type: GET_USER, payload: response.data.data });
    } catch (error) {
        console.log('User info error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};
export const deleteUser = (id) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    try {
        const response = await cabretApi.delete(`/api/user/${id}`);
        dispatch({ type: DELETE_USER, payload: response.data.data });
    } catch (error) {
        console.log('User delete error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};
export const updateUser = (dataInput) => async (dispatch) => {
    dispatch({ type: UPDATE_USER, payload: dataInput });
};



export const ResetError = () => ({
    type: USER_ERROR_RESET, payload: null,
});
