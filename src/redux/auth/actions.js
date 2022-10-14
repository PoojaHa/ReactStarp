import {cabretApi} from '../api';
import {
    USER_LOADING,
    USER_LOGIN,
    LOGINP1_RESET,
    VERIFY_OTP,
    USER_REGISTER,
    USER_ERROR,
    USER_ERROR_RESET,
    GET_NEXT_ADMIN,
    UPDATE_ADMIN,
    CREATE_ADMIN,
    GET_ADMIN,
    GET_NEXT_STORE,
    GET_STORE
} from './constants';

// export const Login = (phone) => async (dispatch) => {
//     dispatch({ type: USER_LOADING, payload: null });
//     try {
//         // let data = JSON.stringify(dataInput);
//         const response = await cabretApi.get(`/api/auth/login/${phone}`);
//         // if (response.data.token) {
//         dispatch({ type: USER_LOGIN, payload: { otp: response.data.data.otp, userId: response.data.data.userId}});
//         // } else {
//         //     dispatch({ type: USER_ERROR, payload: null });
//         // }
//     } catch (error) {
//         console.log('login error', error);
//         dispatch({ type: USER_ERROR, payload: null });
//     }
// };
export const AdminLogin = ({token,userRole}) => async (dispatch) => {
    dispatch({ type: USER_LOGIN, payload: {token,userRole} });
};
export const LogOut = () => ({ type: 'RESET', payload: null });

export const Register = (dataInput) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    try {
        let data = JSON.stringify(dataInput);
        const response = await cabretApi.post('/api/auth/register', data,{
            headers: {
                'content-type': 'application/json'
            }
        });
        dispatch({ type: USER_REGISTER, payload: { otp: response.data.data.otp, userId: response.data.data.userId } });
    } catch (error) {
        console.log(' register error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};

export const ResetError = () => ({
    type: USER_ERROR_RESET, payload: null,
});
export const ResetLoginP1 = () => ({
    type: LOGINP1_RESET, payload: null,
});

export const getNextAdmin = (data, id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.post(`/api/user/filter?start=${id}`, data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            dispatch({ type: GET_NEXT_ADMIN, payload: { dataList: response.data.data, isAdmin: response.data.hasNext, adminId: response.data.next } });
        } catch (error) {
            // console.log('admin list error', error);
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
            dispatch({ type: GET_NEXT_ADMIN, payload: { dataList: response.data.users, isNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('Admin list error', error);
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
};
export const updateAdmin = (dataInput) => async (dispatch) => {
    dispatch({ type: UPDATE_ADMIN, payload: dataInput });
};
// export const getAdmin = (id) => async (dispatch) => {
//     dispatch({ type: USER_LOADING, payload: null });
//     try {
//         const response = await cabretApi.get(`/api/user/${id}`);
//         dispatch({ type: GET_ADMIN, payload: response.data.data });
//     } catch (error) {
//         dispatch({ type: USER_ERROR, payload: null });
//     }
// };
export const getNextStore = (id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.get(`/api/online-store?start=${id}`);
            dispatch({ type: GET_NEXT_STORE, payload: { stList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('store list error', error);
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
    else {
        try {
            const response = await cabretApi.get(`/api/online-store`);
            dispatch({ type: GET_NEXT_STORE, payload: { stList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
};
export const getStore = (id) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/online-store/${id}`);
        dispatch({ type: GET_STORE, payload: response.data.data });
    } catch (error) {
        dispatch({ type: USER_ERROR, payload: null });
    }
};
