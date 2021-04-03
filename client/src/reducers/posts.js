import {
    FETCH_ALL,
    CREATE,
    DELETE_POST,
    UPDATE,
    LIKE_POST
} from "../actions/constants";
const initialState = [];

export default (posts = initialState, action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;

        case CREATE:
            return [...posts, action.payload];




        case DELETE_POST:
            return posts.filter((post) => post._id !== action.payload)
        case UPDATE:
        case LIKE_POST:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        default:
            return posts;
    }
};