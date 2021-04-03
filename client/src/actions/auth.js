import * as api from "../api/index.js";
import {
    FETCH_ALL,
    CREATE,
    DELETE_POST,
    UPDATE,
    REMOVE_ID,
    LOGOUT,
    AUTH
} from "./constants";

export const signin = (formData, history) => async(dispatch) => {

    try {
        const {
            data
        } = await api.signin(formData);
        console.log(data);
        dispatch({
            type: AUTH,
            payload: data
        })
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async(dispatch) => {

    try {
        const {
            data
        } = await api.signup(formData);

        dispatch({
            type: AUTH,
            payload: data
        })
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}