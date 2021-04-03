import axios from "axios";
const API = axios.create({
    baseURL: 'http://localhost:5000'
});
//to make auth middleware in backend to work we need to add interceptors

API.interceptors.request.use((req) => {

    if (localStorage.getItem('profile')) {

        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})
export const fetchPosts = () => API.get("/posts")
export const create = (newPost) => API.post("/posts", newPost)
export const update = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const delete_Post = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signin = (formData) => API.post("/user/signin", formData);
export const signup = (formData) => API.post("/user/signup", formData);