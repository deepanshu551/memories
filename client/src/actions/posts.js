import * as api from "../api/index.js";
import {
    FETCH_ALL,
    CREATE,
    DELETE_POST,
    UPDATE,
    REMOVE_ID,
    LOGOUT
} from "./constants";
export const getPosts = () => async(dispatch) => {
    try {
        const {
            data
        } = await api.fetchPosts();
        console.log(data);
        dispatch({
            type: FETCH_ALL,
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async(dispatch) => {
    try {
        const {
            data
        } = await api.create(post);
        dispatch({
            type: CREATE,
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};
export const updatedPost = (id, post) => async(dispatch) => {
    console.log(id, post);
    try {
        const {
            data
        } = await api.update(id, post)

        dispatch({
            type: REMOVE_ID,
            payload: null
        })
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id) => async(dispatch) => {
    console.log("delete", id);
    try {
        await api.delete_Post(id);
        dispatch({
            type: DELETE_POST,
            payload: id
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const likePost = (id) => async(dispatch) => {

    try {
        const {
            data
        } = await api.likePost(id)
        dispatch({
            type: "LIKE_POST",
            payload: data
        })

    } catch (error) {
        console.log(error.message);
    }
}