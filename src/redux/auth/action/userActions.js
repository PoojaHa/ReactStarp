import {cabretApi} from '../../api';
import {
    USER_LOADING,
    USER_LOGIN,
    LOGINP1_RESET,
    VERIFY_OTP,
    USER_REGISTER,
    USER_ERROR,
    USER_ERROR_RESET,
    GET_USER_LIST,
    GET_NEXT_USER,
    GET_NEXT_MERCHANT,
    GET_MERCHANT,
    GET_USER,
    DELETE_USER,
    UPDATE_USER,
    UPDATE_MERCHANT,
    GET_NEXT_ADMIN,
    UPDATE_ADMIN,
    CREATE_ADMIN,
    GET_ADMIN,
    GET_NEXT_STORE,
    GET_STORE
} from '../constants';

// export const Login = (phone) => async (dispatch) => {
//     dispatch({ type: USER_LOADING, payload: null });
//     try {
//         // let data = JSON.stringify(dataInput);
//         console.log("data", phone)
//         const response = await cabretApi.get(`/api/auth/login/${phone}`);
//         // if (response.data.token) {
//             console.log("login",response)
//         dispatch({ type: USER_LOGIN, payload: { otp: response.data.data.otp, userId: response.data.data.userId}});
//         // } else {
//         //     dispatch({ type: USER_ERROR, payload: null });
//         // }
//     } catch (error) {
//         console.log('login error', error);
//         dispatch({ type: USER_ERROR, payload: null });
//     }
// };
export const AdminLogin = (user,token) => async (dispatch) => {
    dispatch({ type: USER_LOGIN, payload: {user,token} });
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
        console.log('register', response.data);
        dispatch({ type: USER_REGISTER, payload: { otp: response.data.data.otp, userId: response.data.data.userId } });
    } catch (error) {
        console.log(' register error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};
export const getUserList = (data,hasnext,next) =>(dispatch) => {
    dispatch({ type: GET_USER_LIST, payload: { userList: data, hasnext,next}});
};
export const getNextUser = (id=null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if(id!=null)
    {
        try {
            const response = await cabretApi.get(`/api/user?start=${id}`);
            console.log("data",response.data.data)
            dispatch({ type: GET_NEXT_USER, payload: { newList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('User list error', error);
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
    else{
 try {
        const response = await cabretApi.get(`/api/user`);
        console.log("first data",response.data.data)
        dispatch({ type: GET_NEXT_USER, payload: { newList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
    } catch (error) {
        console.log('User list error', error);
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
        console.log("delete user",response)
        dispatch({ type: DELETE_USER  , payload: response.data.data});
    } catch (error) {
        console.log('User delete error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};
export const updateUser = (dataInput) => async (dispatch) => {
        dispatch({ type: UPDATE_USER ,payload:dataInput});
};
export const ResetError = () => ({
    type: USER_ERROR_RESET, payload: null,
});
export const ResetLoginP1 = () => ({
    type: LOGINP1_RESET, payload: null,
});

export const    getNextMerchant = (data,id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.post(`/api/user/filter?start=${id}`, data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            console.log("data", response.data.data)
            dispatch({ type: GET_NEXT_MERCHANT, payload: { dataList: response.data.data, isNext: response.data.hasNext, nextId: response.data.next } });
        } catch (error) {
            console.log('merchant list error', error);
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
            dispatch({ type: GET_NEXT_MERCHANT, payload: { dataList: response.data.users, isNext: response.data.hasNext, next: response.data.next } });
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

export const getNextAdmin = (data, id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.post(`/api/user/filter?start=${id}`, data, {
                headers: {
                    'content-type': 'application/json'
                }
            })
            console.log("data", response.data.data)
            dispatch({ type: GET_NEXT_ADMIN, payload: { dataList: response.data.data, isAdmin: response.data.hasNext, adminId: response.data.next } });
        } catch (error) {
            console.log('admin list error', error);
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
//         console.log('User info error', error);
//         dispatch({ type: USER_ERROR, payload: null });
//     }
// };
export const getNextStore = (id = null) => async (dispatch) => {
    dispatch({ type: USER_LOADING, payload: null });
    if (id != null) {
        try {
            const response = await cabretApi.get(`/api/online-store?start=${id}`);
            console.log("data", response.data.data)
            dispatch({ type: GET_NEXT_STORE, payload: { stList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('store list error', error);
            dispatch({ type: USER_ERROR, payload: null });
        }
    }
    else {
        try {
            const response = await cabretApi.get(`/api/online-store`);
            console.log("first data", response.data.data)
            dispatch({ type: GET_NEXT_STORE, payload: { stList: response.data.data, hasNext: response.data.hasNext, next: response.data.next } });
        } catch (error) {
            console.log('store list error', error);
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
        console.log('User info error', error);
        dispatch({ type: USER_ERROR, payload: null });
    }
};
