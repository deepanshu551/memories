import {
    GETID
} from "./constants";
export const getIds = (id) => (dispatch) => {
    console.log(id);
    dispatch({
        type: GETID,
        payload: id
    })
}