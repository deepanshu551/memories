import {
    combineReducers
} from "redux";
import posts from "./posts";
import postId from "./postId";
import auth from "./auth";
export default combineReducers({
    posts: posts,
    postId: postId,
    auth: auth

})