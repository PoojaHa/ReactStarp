import {
    USER_LOADING, VERIFY_OTP, USER_REGISTER, USER_ERROR, USER_ERROR_RESET, LOGINP1_RESET, USER_LOGIN, GET_USER_LIST, GET_NEXT_USER, GET_NEXT_MERCHANT, GET_MERCHANT, GET_USER, DELETE_USER, UPDATE_USER, UPDATE_MERCHANT, GET_NEXT_ADMIN, UPDATE_ADMIN, GET_NEXT_STORE, GET_STORE
} from './constants';

const initialstate = {
    error: false,
    loading: false,
    isLoggedIn: false,
    token: null,
    userRole:null,
    userList:[],
    newList:[],
    newUserList:[],
    user:null,
    loginP1:false,
    isUpdate:false,
    users: {},
    merchants:{},
    dataList:[],
    newMerchantsList:[],
    admins:{},
    newAdminsList:[],
    stores:{},
    newStoreList:[]
    
};

const authReducer = (state = initialstate, { type, payload }) => {
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

        // case USER_LOGIN: {
        //     const loading = false;
        //     const error = false;
        //     const { otp, userId}= payload;
        //     const loginP1 = true
        //     return {
        //         ...state, loading, error, otp, userId, loginP1
        //     };
        // }
        case LOGINP1_RESET: {
            const loginP1=false
            return {
                ...state, loginP1,
            };
        }

        case USER_LOGIN: {
            const loading = false;
            const error = false;
            const { token, userRole } = payload;
            const isLoggedIn = true
            return {
                ...state, loading, error, token, userRole, isLoggedIn
            };
        }
        case USER_REGISTER: {
            const loading = false;
            const error = false;
            const { otp, userId } = payload;
            return {
                ...state, loading, error, otp, userId
            };
        }
        // case GET_USER_LIST: {
        //     const {userList, hasnext, next} = payload;
        //     // const newUserList = [...state.userList, ...userList]
        //     return {
        //         ...state
        //     };
        // }
        case GET_NEXT_USER:{
            const loading = false;
            const error = false;
            const { newList, hasNext,next  } = payload
            let newNext = next || state.next
            console.log("has next==>",hasNext,next)
            const newUserList = {}
            newList.forEach(el => {
                newUserList[`${el._id}`] = el
            });
            const newUsers = {...state.users, ...newUserList}
            return {
                ...state, loading, error, users:newUsers, hasNext, next: newNext
            };
        }
        case GET_USER: {
            const loading = false;
            const error = false;
            const tempUsers = {...state.users}
            tempUsers[payload._id] = payload;
            return {
                ...state, loading, error, users:tempUsers
            };
        }
        case DELETE_USER: {
            const {_id} = payload;
            const loading = false;
            const error = false;
            const neObj = {...state.admins};
            delete neObj[`${_id}`]
            return {
                ...state, loading, error,admins:neObj
            };
        }
        case UPDATE_USER:{
            const loading = false;
            const error = false;
            const isUpdate=true;
            const tempUsers = { ...state.users }
            tempUsers[payload._id] = payload;
            return {
                ...state, loading, error, isUpdate, users: tempUsers
            };
        }
        case GET_NEXT_MERCHANT: {
            const loading = false;
            const error = false;
            const { dataList, isNext, nextId } = payload
            let newNextId = nextId || state.nextId
            console.log("has next==>", isNext,)
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
        case GET_NEXT_ADMIN: {
            const loading = false;
            const error = false;
            const { dataList, isAdmin, adminId } = payload
            let newAdminId = adminId || state.adminId
            console.log("has next==>", isAdmin,)
            const newAdminsList = {}
            dataList.forEach(el => {
                newAdminsList[`${el._id}`] = el
            });
            const newAdmins = { ...state.admins, ...newAdminsList }
            return {
                ...state, loading, error, admins: newAdmins, isAdmin, adminId: newAdminId
            };
        }
        case UPDATE_ADMIN: {
            const loading = false;
            const error = false;
            const hasUpdate = true;
            const tempAdmins = { ...state.admins }
            tempAdmins[payload._id] = payload;
            return {
                ...state, loading, error, hasUpdate, admins: tempAdmins
            };
        }
        case GET_NEXT_STORE:{
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

export default authReducer;
