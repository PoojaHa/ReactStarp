import axios from 'axios';
import { getStore } from './store';
import { LogOut } from './auth/action/userActions';

// export const baseUrl = 'http://localhost:2222'
// export const baseUrl = 'http://ec2-15-207-247-209.ap-south-1.compute.amazonaws.com:5001';
export const baseUrl = 'http://13.232.20.246:3001';

export const kridoApi = axios.create({
    baseURL: baseUrl,
    // headers: {
    //     'content-type': 'application/json'
    // }
});

export const cabretApi = axios.create({
    baseURL: baseUrl,
    // headers: {
    //     'content-type': 'application/json'
    // }
});

// interceptor
const UNAUTHORIZED = 401;
kridoApi.interceptors.response.use(
    response => response,
    error => {
      const {status} = error.response;
      if (status == UNAUTHORIZED) {
        const store = getStore();
        store.dispatch(LogOut());
        window.location.href = `${process.env.REACT_APP_BASE_HREF}/login`;
      }
      return Promise.reject(error);
    }
  );

export const getVendorsList = () => kridoApi.get('/admin/allVender');
export const createVendor = (data) => kridoApi.post('/admin/vendor', data);

export const createUser = (data) => kridoApi.post('/admin/user', data);
export const getUserList = () => kridoApi.get('/admin/allUser');

export const createOrder = (data) => kridoApi.post('/admin/order', data);
export const getOrderList = () => kridoApi.get('/admin/allOrder');
export const updateTrackingStatus = (id,data) => kridoApi.patch(`/admin/order/${id}`, data);
export const updateOrderStatus = (id, data) => kridoApi.patch(`/admin/order/status/${id}`,data);
export const getAllQuotes = (id) => kridoApi.get(`/admin/allQuote/${id}`);
export const actionOnQuote = (id, data) => kridoApi.patch(`/admin/actionOnQuote/${id}`, data);

export const updateOrder = ({orderId,...data}) => kridoApi.put(`/admin/order/${orderId}`, data);

export const createTrackingStatus = ({orderId, ...rest}) => kridoApi.patch(`/admin/order/${orderId}`, rest);

//admin
export const adminLogin=(dataInput,token)=>kridoApi.post('/admin/login',dataInput,token);

export const deleteOrder = (orderId) => kridoApi.delete(`/admin/order/${orderId}`);
export const deleteUser = (userId) => kridoApi.delete(`/admin/user/${userId}`);

export const editUser = ({userId,...data})=> kridoApi.put(`/admin/user/${userId}`,data);
export const createPricedetails = (data) => kridoApi.post('/admin/order/addPrice', data);
export const  createExpense = (data) => kridoApi.post('/admin/order/addExpense',data)