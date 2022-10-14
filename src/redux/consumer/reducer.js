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

const initialstate = {
    error: false,
    loading: false,
    isLoggedIn: false,
    userList: [],
    newList: null,
    newUserList: [],
    token: null,
    users:{},

};

const UserReducer = (state = initialstate, { type, payload }) => {
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
        case GET_NEXT_USER: {
            const loading = false;
            const error = false;
            const { newList, hasNext, next } = payload
            let newNext = next || state.next
            const newUserList = {}
            newList && newList.forEach(el => {
                newUserList[`${el._id}`] = el
            });
            const newUsers = { ...state.users, ...newUserList }
            return {
                ...state, loading, error, users: newUsers, hasNext, next: newNext
            };
        }
        case GET_USER_LIST: {
            const loading = false;
            const error = false;
            //{1:{a:1}, 2:{b:2}}
            //{1:{c:1}, 3:{b:2}}
            //{a: 1, isDeleted:null}
            //{, a: 1, isDeleted:null, }
            const tempUsers = { ...state.users, ...payload.userList }
            return {
                ...state, loading, error, users: tempUsers
            };
        }
        case DELETE_USER: {
            const { _id } = payload;
            const loading = false;
            const error = false;
            const neObj = { ...state.admins };
            delete neObj[`${_id}`]
            return {
                ...state, loading, error, admins: neObj
            };
        }
        case UPDATE_USER: {
            const loading = false;
            const error = false;
            const isUpdate = true;
            const tempUsers = { ...state.users }
            tempUsers[payload._id] = payload;
            return {
                ...state, loading, error, isUpdate, users: tempUsers
            };
        }

        default:
            return state;
    }
};

export default UserReducer;
