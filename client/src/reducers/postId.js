import { GETID, REMOVE_ID } from "../actions/constants";
const initialState = null;

export default (postId = initialState, action) => {
  switch (action.type) {
    case GETID:
      return action.payload;
    case REMOVE_ID:
      return action.payload;
    default:
      return postId;
  }
};
