import { cabretApi } from '../../api';
import {
    POST_LOADING, GET_CATEGORY_LIST, POST_ERROR, POST_ERROR_RESET, GET_CATEGORY, CREATE_STORE, UPDATE_STORE,GET_STORE_LIST, GET_STORE_DETAIL, GET_PRODUCT_LIST, GET_PRODUCT, GET_MEMBER_LIST, DELETE_PRODUCT, DELETE_CATEGORY, CREATE_CATEGORY, GET_CATEGORY_INFO,UPDATE_CATEGORY, GET_SUBCATEGORY_LIST, CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, GET_POST_LIST, GET_POST, CREATE_PRODUCT, DELETE_POST, UPDATE_POST, CREATE_POST
} from '../constants';
import * as formData from 'form-data';
export const getCategoryList = (dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        let data = JSON.stringify(dataInput);
        console.log('Category list is going to be displayed..',data);
        const response = await cabretApi.post('/api/category/filter', data, {
            headers: {
                'content-type': 'application/json'
            }});
        console.log("category list",response)
        dispatch({ type: GET_CATEGORY_LIST, payload: response.data.data });
    } catch (error) {
        console.log('GET Category List error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getCategory = (dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        let data = JSON.stringify(dataInput);
        console.log('Category id',data);
        const response = await cabretApi.post(`/api/category/filter`, data, {
            headers: {
                'content-type': 'application/json'
            }});
        console.log("category information", response)
        dispatch({ type: GET_CATEGORY, payload: response.data.data });
    } catch (error) {
        console.log('GET Category error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getCategoryInfo = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/category/${id}`);
        console.log("category information", response)
        dispatch({ type: GET_CATEGORY_INFO, payload: response.data.data });
    } catch (error) {
        console.log('GET Category error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getStoreList = () => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/online-store-all`);
        console.log("store list", response)
        dispatch({ type: GET_STORE_LIST, payload: response.data.data });
    } catch (error) {
        console.log('GET store error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getStore = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/online-store/${id}`);
        console.log("store list", response)
        dispatch({ type: GET_STORE_DETAIL, payload: response.data.data });
    } catch (error) {
        console.log('GET store error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const updateStore = (id,dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.put(`/api/online-store/${id}`, dataInput,{
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log("update store information", response)
        dispatch({ type: UPDATE_STORE });
    } catch (error) {
        console.log('update store error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getProductList = () => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/product`);
        console.log("product list", response)
        dispatch({ type: GET_PRODUCT_LIST, payload: response.data.data });
    } catch (error) {
        console.log('GET product error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const createStore = (dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const { title, description, isTop, referralLink, picture, categories } = dataInput
        console.log('Category id', dataInput);
        const dataBody = new formData();
        dataBody.append('name', title);
        dataBody.append('description', description);
        dataBody.append('isTop', isTop);
        dataBody.append('referralLink', referralLink);
        dataBody.append('categories', categories);
        dataBody.append('onlineStores', picture);
        console.log("form data post", dataBody)
        const response = await cabretApi.post(`/api/online-store`, dataBody);
        console.log(" create post information", response)
        dispatch({ type: CREATE_STORE });
    } catch (error) {
        console.log('create store error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const createProduct = (dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const { title, description, price, addSpecs, picture, categories, commission} = dataInput
        console.log('Category id', dataInput);
        const dataBody = new formData();
        dataBody.append('title', title);
        dataBody.append('discription', description);
        dataBody.append('price', price);
        // dataBody.append('address', address)
        dataBody.append('commission', commission)
        dataBody.append('specifications', JSON.stringify(addSpecs));
        dataBody.append('categories', JSON.stringify(categories));
        dataBody.append('products', picture);
        console.log("form data post", dataBody)
        const response = await cabretApi.post(`/api/product`, dataBody);
        console.log(" create post information", response)
        dispatch({ type: CREATE_PRODUCT });
    } catch (error) {
        console.log('create post error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getProduct = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/product/${id}`);
        console.log("post info", response)
        dispatch({ type: GET_PRODUCT, payload: response.data.data });
    } catch (error) {
        console.log('GET post info error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const deleteProduct = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.delete(`/api/product/${id}`);
        console.log("post delete", response)
        dispatch({ type: DELETE_PRODUCT});
    } catch (error) {
        console.log('delete post error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};

export const getMemberOrderList = () => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/membership`);
        console.log("order list", response)
        dispatch({ type: GET_MEMBER_LIST, payload: response.data.data });
    } catch (error) {
        console.log('order list error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const deleteCategory = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        console.log('Category id', id);
        const response = await cabretApi.delete(`/api/category/${id}`);
        console.log(" delete category information", response)
        dispatch({ type: DELETE_CATEGORY });
    } catch (error) {
        console.log('delete Category error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const createCategory = (dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const { name, categoryLevel, categoryType, commission, addSpecs}=dataInput
        console.log('Category id', dataInput);
        const dataBody = new formData();
        dataBody.append('name',name);
        dataBody.append('categoryType', categoryType);
        dataBody.append('categoryLevel', categoryLevel);
        dataBody.append('specifications', JSON.stringify(addSpecs));
        dataBody.append('commission', commission);
        console.log("form data category",dataBody)
        const response = await cabretApi.post(`/api/category`,dataBody);
        console.log(" create category information", response)
        dispatch({ type: CREATE_CATEGORY });
    } catch (error) {
        console.log('create Category error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};

export const updateCategory = (dataInput,id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        // const { name, description, addSpecs, picture } = dataInput
        // console.log('Category id', dataInput);
        // const dataBody = new formData();
        // dataBody.append('name', name);
        // dataBody.append('description', description);
        // dataBody.append('specifications', JSON.stringify(addSpecs));
        // dataBody.append('categories', picture);
        console.log("form data update category", dataInput)
        let data = JSON.stringify(dataInput);
        const response = await cabretApi.put(`/api/category/${id}`, data,{
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(" update category information", response)
        dispatch({ type: UPDATE_CATEGORY });
    } catch (error) {
        console.log('update Category error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getSubCategoryList = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        console.log('Category id', id);
        const response = await cabretApi.get(`/api/category/${id}/subcategory`);
        console.log("subcategory list", response.data.data)
        dispatch({ type: GET_SUBCATEGORY_LIST, payload: response.data.data });
    } catch (error) {
        console.log('GET SubCategory list error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const createSubCategory = (dataInput,id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        let data=JSON.stringify(dataInput)
        const response = await cabretApi.post(`/api/category/${id}`, data,{
            headers: {
                'content-type': 'application/json'
            }
        });
        console.log(" create subcategory information", response)
        dispatch({ type: CREATE_SUBCATEGORY });
    } catch (error) {
        console.log('create subcategory error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};

export const deleteSubCategory = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.delete(`/api/category/${id}`);
        console.log("delete subcategory information", response)
        dispatch({ type: DELETE_SUBCATEGORY });
    } catch (error) {
        console.log('delete subcategory error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getPostList = () => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/post`);
        console.log("post list", response)
        dispatch({ type: GET_POST_LIST, payload: response.data.data });
    } catch (error) {
        console.log('GET post list error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const getPost = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.get(`/api/post/${id}`);
        console.log("post info", response)
        dispatch({ type: GET_POST, payload: response.data.data });
    } catch (error) {
        console.log('GET post info error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const createPost = (dataInput) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const { title, description, price, address, brand, sellerType, usage, addSpecs, picture, categories, location } = dataInput
        console.log('Category id', dataInput);
        const dataBody = new formData();
        dataBody.append('title', title);
        dataBody.append('discription', description);
        dataBody.append('price', price);
        dataBody.append('address', address)
        dataBody.append('brand', brand)
        dataBody.append('sellerType', sellerType)
         dataBody.append('usage',usage)
        dataBody.append('specifications', JSON.stringify(addSpecs));
        dataBody.append('categories', JSON.stringify(categories));
        dataBody.append('location', JSON.stringify(location));
        dataBody.append('imageUrl', picture);
        console.log("form data post", dataBody)
        const response = await cabretApi.post(`/api/post`, dataBody);
        console.log(" create post information", response)
        dispatch({ type: CREATE_POST });
    } catch (error) {
        console.log('create post error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const updatePost = (dataInput, id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const { name, description, categoryLevel, addSpecs, picture } = dataInput
        const dataBody = new formData();
        dataBody.append('name', name);
        dataBody.append('description', description);
        dataBody.append('categoryLevel', categoryLevel);
        dataBody.append('specifications', JSON.stringify(addSpecs));
        dataBody.append('imageUrl', picture);
        console.log("form data update post", dataBody)
        const response = await cabretApi.put(`/api/post/${id}`, dataBody);
        console.log(" update post information", response)
        dispatch({ type: UPDATE_POST });
    } catch (error) {
        console.log('update post error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const deletePost = (id) => async (dispatch) => {
    dispatch({ type: POST_LOADING, payload: null });
    try {
        const response = await cabretApi.delete(`/api/post/${id}`);
        console.log("post delete", response)
        dispatch({ type: DELETE_POST });
    } catch (error) {
        console.log('delete post error', error);
        dispatch({ type: POST_ERROR, payload: null });
    }
};
export const ResetError = () => ({
    type: POST_ERROR_RESET, payload: null,
});
